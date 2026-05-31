//access the localStorage for playerId, playerName
const playerId=localStorage.getItem("playerId");
const playerName=localStorage.getItem("playerName");
const params =new URLSearchParams(window.location.search);
const roomId = params.get("roomId");

//start-button,room-id,players-list

async function auth(){
    //block if no playerName or playerId or roomId
    if(!playerName || !playerId || !roomId){
        window.location.href="error.html";
    }

    //now we authenticate the user
    //AUTH RULES:
    //if room unactive and player not in:give them new id, update db and let them in
    //if room inactive and player in: let them in
    //if room active and player not in:block them
    //if room active and player in:let them in

    //get info on the requested room 
    const res= await fetch(`http://localhost:9000/newRoom/${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
    });
    const obj=await res.json();
    console.log(obj);
    if(!obj){
        //ROOM DOESN'T EXIST 
        window.location.href="error.html";
    }
    for (const player of obj.players) {
        if (player.playerId == playerId) {
            return; 
        }
    }
    if(obj.active==0 ){
        //LET THEM IN AND UPDATE DB 
        const res = await fetch("http://localhost:9000/players", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              playerName:playerName,
              roomId:roomId
            })
        });
          
        const data = await res.json();
        localStorage.setItem("playerId",data.playerId);


    }else{
        //block their request via a redirect 
        window.location.href="error.html";
    }
}

async function socketConnection(){
    document.getElementById("room-id").innerText=roomId;
    //TASK 1. paste already existing players (IMPORTANT-CRITICAL)
    const res= await fetch(`http://localhost:9000/newRoom/${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
    });

    const data=await res.json();

    for(const player of data.players){
        //update ui
        const el=document.createElement("div");
        el.innerText=player.playerName;
        el.id=player.playerId;
        document.getElementById("players-list").appendChild(el);
    }

    //TASK 2. socket connections are made 
    const socket = io("http://localhost:9000");
    socket.on("connect",()=>{
        console.log("connected");
        socket.emit("reconnected-player",playerId,playerName,roomId);
    })
    //TASK 3. emit event to show someone joined 
    socket.on("add-player",(playerId,playerName)=>{
        //update ui 
        console.log(playerId,playerName);
        const el=document.createElement("div");
        el.innerText=playerName;
        el.id=playerId;
        document.getElementById("players-list").appendChild(el);
    })
    //TASK 4. catch event of someone leaving 
    socket.on("player-left",(playerId)=>{
        //update ui
        const el = document.getElementById(playerId); 
        if (el) el.remove();
    })
    //TASK 5. event handler for start (IMPORTANT-CRITICAL)
    document.getElementById("start-button").addEventListener("click",async()=>{
        const res= await fetch(`http://localhost:9000/newRoom`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({
                playerId:playerId,
                roomId:roomId
            })
        });
        const data=await res.json();
        if(data.start==1){
            //fire a socket message to start game 
            socket.emit("start-game",roomId);
        }
    })
    //TASK 6. receiving event for start of game 
    socket.on("start-game",()=>{
        window.location.href=`gameRoom.html?roomId=${roomId}`;
    })
    //TASK 7. host left 
    socket.on("host-left",()=>{
        alert("host left. they must rejoin within 30 seconds or room deletes");
    })
}

//FIRST AUTHENTICATE THEN MAKE CONNECTION 

auth()
.then(async()=>{
    await socketConnection();
})