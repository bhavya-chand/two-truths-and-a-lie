/*
<div id="questions">
        <button id="option1"></button>
        <button id="option2"></button>
        <button id="option3"></button>
</div>
<button id="next">next</button>
<div id="scoreboard"></div>
*/


const playerId=localStorage.getItem("playerId");
const playerName=localStorage.getItem("playerName");
const params =new URLSearchParams(window.location.search);
const roomId = params.get("roomId");

async function auth(){
    //block if no playerName, playerId or roomId
    if(!playerName || !playerId || !roomId){
        window.location.href="error.html";
    }

    //now we authenticate the user

    //get info on the requested room 
    const res= await fetch(`http://localhost:9000/newRoom/${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
    });
    const obj=await res.json();
    if(!obj){
        //ROOM DOESN'T EXIST 
        window.location.href="error.html";
    }
    console.log(obj);
    //AUTHENTICATION RULES
    //if room inactive and player not in:block 
    //if room inactive and player in:block
    //if room active and player not in:block
    //if room active and player in: LET THEM ENTER 
    let find=null;
    for (const player of obj.players) {
        if (player.playerId == playerId) {
            find=player.playerId;
            break; 
        }
    }
    if(obj.active==1 && find){
        //room must be active and you must be a player to enter the room
        return;
    }else{
        //redirect to error page for idiotic request  
        window.location.href="error.html";
    }
}

async function loader(){
    //TASK 1. GET BASIC SCORE BOARD 
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
        const elName=document.createElement("div");
        const elScore=document.createElement("div");
        elName.innerText=player.playerName;
        elScore.innerText=player.score;
        el.classList.add("player");
        el.id=player.playerId;
        el.appendChild(elName);
        el.appendChild(elScore);
        document.getElementById("scoreboard").appendChild(el);
    }

    //TASK 2. MAKE CONNECTION 
    const socket = io("http://localhost:9000");
    socket.on("connect",()=>{
        socket.emit("reconnected-player-game",playerId,playerName,roomId);
    })
    socket.on("add-player-game",(playerId,playerName,score)=>{
        //update ui on player adding 
        const el=document.createElement("div");
        const elName=document.createElement("div");
        const elScore=document.createElement("div");
        elName.innerText=playerName;
        elScore.innerText=score;
        el.classList.add("player");
        el.id=playerId;
        el.appendChild(elName);
        el.appendChild(elScore);
        document.getElementById("scoreboard").appendChild(el);
    })
    socket.on("player-left",(playerId)=>{
        //update ui on player leaving 
        const el = document.getElementById(playerId); 
        if (el) el.remove();
    })

    //TASK 3. GET QUESTION
    socket.on("new-question",(arr,qn)=>{
        const option1=arr[0];
        const option2=arr[1];
        const option3=arr[2];
        //display question number 
        document.getElementById("question-number").innerText=qn;
        //display these questions 
        document.getElementById("option1").innerText=option1;
        document.getElementById("option2").innerText=option2;
        document.getElementById("option3").innerText=option3;
    })
    //TASK 4. SELECTION OF OPTION (update scores and attempt flag)(if attempt flag already updated, no change)
    document.getElementById("option1").addEventListener("click",()=>{
        socket.emit("option-chosen",document.getElementById("option1").textContent);
    })
    document.getElementById("option2").addEventListener("click",()=>{
        socket.emit("option-chosen",document.getElementById("option2").textContent);
    })
    document.getElementById("option3").addEventListener("click",()=>{
        socket.emit("option-chosen",document.getElementById("option3").textContent);
    })
    socket.on("update-score",(playerId,score)=>{
        const s=document.getElementById(playerId).lastChild;
        //(String)(+"0" + 1)
        s.innerText=String(+s.innerText+score);
    })
    //TASK 5. NEXT BY HOST (new question fired, clear attempt flag and increment question,emit event for next question )
    document.getElementById("next").addEventListener("click",async ()=>{
        // attempt flag cleared and increment question  
        const res= await fetch(`http://localhost:9000/question`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({
                playerId:playerId,
                roomId:roomId
            })
        });
        const obj=await res.json();
        //fire event to send off next question 
        if(obj.success==1){
            socket.emit("new-question",roomId);
        }
    })
    //TASK 6. GAME OVER
    socket.on("game-over",()=>{
        //redirect in 30s and take away pointer events
        document.body.style.pointerEvents = "none";
        setTimeout(()=>{
            window.location.href="landingPage.html";
        },30000)
    })
    //TASK 7. HOST LEFT WARNING MESSAGE 
    socket.on("host-left",()=>{
        alert("host left. they must rejoin within 30 seconds or room deletes");
    })
}

//first run auth and then load the page 
auth()
.then(async()=>{
    await loader();
})