/*

<div>
    <label>name:</label>
    <input type="text" id="name">
</div>

<div>
    <button id="new-room">
        Make a new room
     </button>

    OR
    <input type="text" id="join-room" placeholder="example: ABCDEF">
    <button id="join-room-button">Join Room</button>
</div>

*/

//name 
//new room button 
//join room button 

document.getElementById("new-room").addEventListener("click",async()=>{
    const playerName=document.getElementById("name").value 
    if(!playerName){
        //no playerName 
        alert("enter a name");
        return;
    } 
    const res= await fetch("http://localhost:9000/newRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            playerName:playerName
        })
      });
      
    const obj = await res.json();
    //save the playerId on local storage 
    //save the playerName on local storage 
    const roomId=obj.roomId;
    const playerId=obj.playerId;
    localStorage.setItem("playerId",playerId);
    localStorage.setItem("playerName",playerName);
    window.location.href=`waitingRoom.html?roomId=${roomId}`;
})

document.getElementById("join-room-button").addEventListener("click",()=>{
    const playerName=document.getElementById("name").value 
    const roomId=document.getElementById("join-room").value 
    if(!playerName || !roomId){
        //no playerName 
        alert("enter a name and room-id");
        return;
    }
    localStorage.setItem("playerName",playerName);
    window.location.href=`waitingRoom.html?roomId=${roomId}`;
})