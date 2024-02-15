const mongoose = require("mongoose");
const { Schema } = mongoose;
const BlacklistSchema=new Schema({
  ip:{type:String,trim:true}
},{ versionKey: false })

module.exports= mongoose.model("Blacklist",BlacklistSchema);