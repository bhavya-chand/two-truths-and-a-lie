const express=require("express");
const {handleAddPlayer,handleUpdatePlayer,handleDeletePlayer}=require("../controllers/players");
const router=express.Router({mergeParams:true});

router.post("/",handleAddPlayer);
router.patch("/",handleUpdatePlayer);
router.delete("/",handleDeletePlayer);

module.exports=router;