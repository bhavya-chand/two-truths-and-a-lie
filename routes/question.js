const express=require("express");
const {handleUpdateQuestion,handleGetQuestion}=require("../controllers/question");
const router=express.Router({mergeParams:true});

router.patch("/",handleUpdateQuestion);
router.get("/",handleGetQuestion);

module.exports=router;