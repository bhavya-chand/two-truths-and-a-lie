const express=require("express");
const {handleCreateRoom,handleDeleteRoom,handleRoomInfo,handleStartRoom}=require("../controllers/newRoom");
const router=express.Router({mergeParams:true});

router.get("/:roomId",handleRoomInfo);
router.post("/",handleCreateRoom);
router.delete("/",handleDeleteRoom);
router.patch("/",handleStartRoom);

module.exports=router;