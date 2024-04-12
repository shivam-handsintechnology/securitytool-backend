const mongoose = require("mongoose");
const SensitiveKeywordsUrlSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", },
    sensitivekeys: { type: String, trim: true },
    url: { type: String, trim: true },
    appid:{ type: String,  trim: true,ref: "users", },
    domain: { type: String, trim: true },
    type: { type: String,enum:["url","response"],required:true, trim: true }

}, {
    timestamps: false,
    versionKey: false,
}
)
const EmailVerifySchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    ip: { type: String,  trim: true },
    email: { type: String, unique: true, trim: true },
    appid:{ type: String,  trim: true,ref: "users", },
    domain: { type: String, trim: true },
    
}, {
    timestamps: false,
    versionKey: false,
}
)
const CrticalInformationInurl = mongoose.model("SensitiveInformations", SensitiveKeywordsUrlSchema)
const EmailVerifyModel = mongoose.model("EmailHarvestModel", EmailVerifySchema)
module.exports = { CrticalInformationInurl, EmailVerifyModel }