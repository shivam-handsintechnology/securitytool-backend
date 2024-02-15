const mongoose = require("mongoose");
const SensitiveKeywordsUrlSchema=mongoose.Schema({
    sensitivekeys:{type:String ,trim:true},
    url:{type:String,trim:true},
    hostname:{type:String,trim:true}


}, {timestamps:false,
    versionKey: false,
}
)
const EmailVerifySchema=mongoose.Schema({
    email:{type:String,trim:true},
    hostname:{type:String,trim:true}
}, {timestamps:false,
    versionKey: false,
}
)
const CrticalInformationInurl=mongoose.model("CrticalInformationInurl",SensitiveKeywordsUrlSchema)
const EmailVerifyModel=mongoose.model("EmailHarvestModel",EmailVerifySchema)
module.exports={CrticalInformationInurl,EmailVerifyModel}