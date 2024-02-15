const mongoose = require("mongoose");

const PasswordKeySchema=mongoose.Schema({
    passwordkey:{type:String,unique:true}
}, {timestamps:false,
    versionKey: false

}
)
const PasswordKeyModel=mongoose.model("PasswordKeyModel",PasswordKeySchema)
module.exports={PasswordKeyModel}