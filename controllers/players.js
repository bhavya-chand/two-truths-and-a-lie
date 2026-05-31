//const {handleAddPlayer,handleUpdatePlayer,handleDeletePlayer}

const roomModel=require("../models/room");
const shortID=require("shortid");

async function handleAddPlayer(req,res){
    console.log(req.body);
    const playerId=shortID();
    await roomModel.updateOne(
        { roomId: req.body.roomId },
        { 
          $push: { 
            players: {
              playerId: playerId,
              playerName: req.body.playerName,
              attempted: false,
              score: 0
            } 
          } 
        }
    );
    return res.json({playerId:playerId,roomId:req.body.roomId});
}

async function handleUpdatePlayer(req,res){
    //update attempt and score 
    const score=req.body.score;
    await roomModel.updateOne(
        { roomId: req.body.roomId, "players.playerId": req.body.playerId },
        {
          $set: { "players.$.attempted": true },
          $inc: { "players.$.score": score }
        }
    );
    return res.json({update:1});
}

async function handleDeletePlayer(req,res){
    await roomModel.updateOne(
        { roomId: req.body.roomId },
        { 
          $pull: { 
            players: { playerId: req.body.playerId } 
          } 
        }
    );
    return res.json({deleted:1});
}

module.exports={handleAddPlayer,handleUpdatePlayer,handleDeletePlayer};