const mongoose=require("mongoose")

const PasswordHashingDataSchema=mongoose.Schema({
    name:{type:String,require:true,unique:true},
    regex:{type:String,require:true,},
    example:{type:String,require:true,},
})
const PasswordHashingDataModel=mongoose.model("PasswordHashingData",PasswordHashingDataSchema)
const ServerDataInPlaintextSchema=mongoose.Schema({
   key:{type:Array,default:[]},
   appid:{type:String,require:true},
   domain:{type:String,require:true},
}, { validateBeforeSave: false })
const ServerDataInPlaintextModel=mongoose.model("ServerDataInPlaintext",ServerDataInPlaintextSchema)
module.exports={
    PasswordHashingDataModel,ServerDataInPlaintextModel
}