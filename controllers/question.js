//const {handleUpdateQuestion,handleGetQuestion}
const roomModel=require("../models/room");

async function handleUpdateQuestion(req,res){
    //only host can trigger the update question 
    //question number is updated and the attempt flag for all players is cleared 
    await roomModel.updateOne(
        { roomId: req.body.roomId, hostId:req.body.playerId},
        { 
          $set: { "players.$[].attempted": false },
          $inc: { question: 1 }
        }
    );
    return res.json({success:1});
}

async function handleGetQuestion(req,res){
    const obj=await roomModel.findOne({
        roomId:req.body.roomId
    });
    //game over
    if(obj.question>=obj.lies.length){
        return res.json({gameOver:1});
    }
    //not over
    return res.json({
        truths:[obj.truths[obj.question],obj.truths[obj.question+1]],
        lie:[obj.lies[obj.question]]
    });

}

module.exports={handleUpdateQuestion,handleGetQuestion};