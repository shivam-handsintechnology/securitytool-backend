const mongoose=require("mongoose")

const PasswordHashingDataSchema=mongoose.Schema({
    name:{type:String,require:true,unique:true},
    regex:{type:String,require:true,},
    example:{type:String,require:true,},
})
const PasswordHashingDataModel=mongoose.model("PasswordHashingData",PasswordHashingDataSchema)
module.exports={
    PasswordHashingDataModel
}