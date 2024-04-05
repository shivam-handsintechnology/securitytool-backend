const mongoose = require("mongoose");
const { Schema } = mongoose;
const InjectionSchema=new Schema({
  user: {type:mongoose.Types.ObjectId,unique:true},
  type:"api",
  "Directory listing is enabled on the server": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "Directory traversal attack": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "HTTP parameter pollution": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "The remote server contains a robots.txt file": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
},{
    timestamps:true,
    versionKey:false,
})
module.exports =mongoose.model("InsecureDirectObjectReferences", InjectionSchema);
// Create collection of Model
