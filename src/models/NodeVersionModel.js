const mongoose=require('mongoose')
const { Schema } = mongoose;
const NodeVersionModelSchema = new Schema(
    {
      version: { type:String },
      appid: { type: String,unique:true, default: false },
    },
    { versionKey: false }
  );
  const NodeVersionModel = mongoose.model(
    "NodeVersionModel",
    NodeVersionModelSchema
  );
  module.exports={NodeVersionModel}