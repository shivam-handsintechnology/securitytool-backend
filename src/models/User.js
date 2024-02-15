const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema=new Schema({
  // firstName:{type:String},
  // lastName:{type:String},
  // picture:{type:String,default:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1670312163~exp=1670312763~hmac=2ad40ed3c4aff26e836d5a9228da2480d2ae6592cd1755824a13fde78c40ec20"},
  domain:{type:String,unique:true},
  password:{type:String,trim:true},
  appid: {type:String,unique:true},
  // online:{type:Boolean,default:null},
//   userType: {
//     type: String,enum : ['support','sales','supervisor'],default:'support'
// },

},{
    timestamps:true,
    versionKey:false
})
module.exports = mongoose.model("users", UserSchema);