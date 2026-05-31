const express=require("express");
const mongoose=require("mongoose");
const cors = require("cors");
const http=require("http");
const {Server}=require("socket.io");

//importing routes
const roomRouter=require("./routes/newRoom");
const playersRouter=require("./routes/players");
const questionRouter=require("./routes/question");

const roomModel=require("./models/room");

//db connect
mongoose.connect("mongodb://localhost:27017/twotruthsonelie")
.then(console.log("db connected"));

//app creation
const app=express();
const server=http.createServer(app);

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//routes
app.use("/newRoom",roomRouter);
app.use("/players",playersRouter);
app.use("/question",questionRouter);

//io stuff slay
const io=new Server(server,{
    cors:{
        origin:"*"
    }
});

//room deletion and disconnection timers
const disconnectTimers = new Map();
const roomDeletion=new Map();

//shuffle algo 
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        // swap arr[i] and arr[j]
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


io.on("connection",(socket)=>{
    //the moment a socket connects, fire off a question to it 
    
    socket.on("reconnected-player",(playerId,playerName,roomId)=>{
        //delete timer if it exists 
        if (disconnectTimers.has(playerId)) {
            clearTimeout(disconnectTimers.get(playerId));
            disconnectTimers.delete(playerId);
        }
        //if host reconnects, remove the room deletion timer 
        if (roomDeletion.has(roomId)) {
            clearTimeout(roomDeletion.get(roomId));
            roomDeletion.delete(roomId);
        }
        //join room 
        socket.join(roomId);
        //save playerId, roomId
        socket.playerId = playerId;  
        socket.playerName=playerName;
        socket.roomId = roomId;
        //emit an event to update the ui 
        //IDHAR!!!!!!!
        socket.to(roomId).emit("add-player", playerId,playerName);
    })

    socket.on("disconnect",async ()=>{
        //check if the player left from an active game. if left from an active game no need to do count down or ui removal
        const obj=await roomModel.findOne({roomId:socket.roomId});
        if(!obj){
            return;
        }
        //DISCONNECTION FROM ACTIVE GAME 
        if(obj.active==1){
            //if host left, we assign 30 seconds before room deletion
            if(obj.hostId==socket.playerId){
                //GIVE 60 SECONDS BEFORE ROOM DELETION 
                io.to(socket.roomId).emit("host-left");
                const timer=setTimeout(async()=>{
                    //room deletion event 
                    io.to(socket.roomId).emit("game-over");
                     
                    setTimeout(async()=>{
                        //deletion of room 
                        await roomModel.deleteOne({roomId:socket.roomId})
                    },30000)
                    return;
                },30000);
                roomDeletion.set(socket.roomId,timer);

            }
            //if not host, we let them stay, it's not a big deal.
            return;
        }

        //DISCONNECTION FROM WAITING ROOM 
        //remove from ui immediately 
        io.to(socket.roomId).emit("player-left",socket.playerId);
        //start countdown for deletion from db
        const playerId = socket.playerId;
        const roomId = socket.roomId;

        const timer = setTimeout(async () => {
            await roomModel.updateOne(
                { roomId },
                { $pull: { players: { playerId } } }
            );
            io.to(roomId).emit("player-left", { playerId });
            disconnectTimers.delete(playerId); 
        }, 30000);

        disconnectTimers.set(playerId, timer);

        //if host left, we assign 30 seconds before room deletion
        if(obj.hostId==socket.playerId){
            //GIVE 30 SECONDS BEFORE ROOM DELETION 
            io.to(socket.roomId).emit("host-left");
            const timer=setTimeout(async()=>{
                //room deletion event 
                io.to(socket.roomId).emit("game-over");
                setTimeout(async()=>{
                    //deletion of room 
                    await roomModel.deleteOne({roomId:socket.roomId})
                },30000)
                return;
            },3000);
            roomDeletion.set(socket.roomId,timer);

        }
    })

    socket.on("start-game",(roomId)=>{
        io.to(roomId).emit("start-game");
    })

    

    socket.on("reconnected-player-game",async(playerId,playerName,roomId)=>{
        const obj=await roomModel.findOne({roomId:roomId});
        const data=await obj;
        //delete timer if it exists 
        if (disconnectTimers.has(playerId)) {
            clearTimeout(disconnectTimers.get(playerId));
            disconnectTimers.delete(playerId);
        }
        //if it is the host who rejoined, then we delete the timeout for room deletion
        if (roomDeletion.has(roomId) && playerId==obj.hostId) {
            clearTimeout(roomDeletion.get(roomId));
            roomDeletion.delete(roomId);
        }
        //join room 
        socket.join(roomId);
        //save playerId, roomId
        socket.playerId = playerId;  
        socket.playerName=playerName;
        socket.roomId = roomId;
        //emit an event to update the ui 
        //make a call to server for score of the player
        let score=0;
        for(const player of obj.players){
            if(player.playerId==playerId){
                score=player.score;
                break;
            }
        }
        /*
        io.to(roomId).emit("add-player-game", playerId,playerName,score);
        */
        //fire off the question to the socket 
        //FIRE OFF THE QUESTION TO THE SOCKET 
        const qn=data.question;
        if(qn==5){
            //end game
            //fire new event 
            return;
        }
        let question= [data.truths[qn],data.truths[qn+1],data.lies[qn]];
        //scramble the array 
        socket.emit("new-question",question,qn+1);
    })

    socket.on("option-chosen",async(option)=>{
        //SELECTION OF OPTION (update scores and attempt flag)(if attempt flag already updated, no change)
        const obj=await roomModel.findOne({roomId:socket.roomId});
        
        let score=0;
        //check the attempted flag 
        for(const player of obj.players){
            if(player.playerId==socket.playerId){
                if(player.attempted==1){
                    //dont let them attempt again 
                    return;
                }
            }
        }
        if(obj.lies[obj.question]==option){
            //correctly chose the lie 
            score=1;
        }

        await roomModel.updateOne(
            { roomId: socket.roomId, "players.playerId": socket.playerId },
            {
              $set: { "players.$.attempted": true },
              $inc: { "players.$.score": score }
            }
        );

        io.to(socket.roomId).emit("update-score",socket.playerId,score);

    })

    socket.on("new-question",async(roomId)=>{
        //get question 
        const data=await roomModel.findOne({roomId:roomId});

        const qn=data.question;
        if(qn==5){
            //end game
            //fire new event
            io.to(socket.roomId).emit("game-over");
            //delete the room in 60 seconds 
            setTimeout(async () => {
                await roomModel.deleteOne({ roomId:socket.roomId });
            }, 60000);
            return;
        }
        let question= [data.truths[qn*2],data.truths[2*qn+1],data.lies[qn]];
        //scramble the array 
        shuffle(question);
        io.to(roomId).emit("new-question",question,qn+1);

    })
})




server.listen(9000,()=>{
    console.log("server start");
})