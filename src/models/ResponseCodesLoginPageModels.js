const mongoose = require("mongoose");
const { Schema } = mongoose;
const ErrorCodesLoginSchema=new Schema({
    ErrorStatuscode: {
        type: Number
      },
    message: {
    type: String
    },
    hostname: {
    type: String
    },
},{
    timestamps:true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id,
        delete ret.Date
        delete ret._id
      }
    }

})
module.exports = mongoose.model("ServerResponseCodesForLogin", ErrorCodesLoginSchema);