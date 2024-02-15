const mongoose=require('mongoose')
const { Schema } = mongoose;
const httpParameterPollutionModelSchema = new Schema(
    {
      isPolluted: { type: Boolean, default: false },
      appid: { type: String,unique:true, default: false },
    },
    { versionKey: false }
  );
  const httpParameterPollutionModel = mongoose.model(
    "httpParameterPollutionModel",
    httpParameterPollutionModelSchema
  );
  module.exports={httpParameterPollutionModel}