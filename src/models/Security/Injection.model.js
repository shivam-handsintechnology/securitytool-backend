const mongoose = require("mongoose");
const { Schema } = mongoose;
const InjectionSchema=new Schema({
  user: {type:mongoose.Types.ObjectId,unique:true},
 "Application is vulnerable to Command injection attack": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "Application is vulnerable to HTML injection attack": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "Application is vulnerable to iframe injection attack": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "Application is vulnerable to SQL Injection": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "Application is vulnerable to XML injection": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "Application is vulnerable to NoSql injection": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
},{
    timestamps:true,
    versionKey:false,
})
module.exports =mongoose.model("Injections", InjectionSchema);
// Create collection of Model
