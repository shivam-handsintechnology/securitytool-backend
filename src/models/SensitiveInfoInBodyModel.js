 // server response codes
 const mongoose=require('mongoose')
 const sensitiveinfoinbodySchema = mongoose.Schema(
    {
      hostname: { type: String, unique: false },
      sensitivekeys: { type: String, trim: true, unique: false },
    },
    {timestamps:false,versionKey:false}
  );
module.exports={
    sensitiveinfoinbodyModel: mongoose.model( "sensitiveinfoinbody",sensitiveinfoinbodySchema),
}