const mongoose = require("mongoose");
const { Schema } = mongoose;
const WhitelistSchema=new Schema({
  ip:{type:String,trim:true}
},{ versionKey: false }
)
module.exports= mongoose.model("Whitelist",WhitelistSchema);