const mongoose=require("mongoose");

const roomSchema =new mongoose.Schema({
    roomId:{
        type: String,
        required:true,
        unique:true,
    },
    hostId:{
        type: String,
        required:true,
    },
    players:[{playerId:{type:String},playerName:{type:String},attempted:{type:Boolean},score:{type:Number}}],
    truths:[{type:String}],
    lies:[{type:String}],
    question:{
        type:Number
    },
    active:{
        type:Boolean
    }
},{timestamps:true});

const roomModel=mongoose.model("room",roomSchema);

module.exports=roomModel;