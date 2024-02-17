const mongoose = require("mongoose");
const SensitiveKeywordsUrlSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", unique: true },
    sensitivekeys: { type: String, trim: true },
    url: { type: String, trim: true },
    hostname: { type: String, trim: true }


}, {
    timestamps: false,
    versionKey: false,
}
)
const EmailVerifySchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    email: { type: String, trim: true },
    hostname: { type: String, trim: true }
}, {
    timestamps: false,
    versionKey: false,
}
)
const CrticalInformationInurl = mongoose.model("CrticalInformationInurl", SensitiveKeywordsUrlSchema)
const EmailVerifyModel = mongoose.model("EmailHarvestModel", EmailVerifySchema)
module.exports = { CrticalInformationInurl, EmailVerifyModel }