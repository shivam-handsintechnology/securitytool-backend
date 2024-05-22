const mongoose = require("mongoose");
const SensitiveKeywordsUrlSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", },
    sensitivekeys: [{ type: String, trim: true, unique: true }],
    url: { type: String, trim: true },
    appid: { type: String, trim: true, ref: "users", },
    domain: { type: String, trim: true },
    type: { type: String, enum: ["url", "response"], required: true, trim: true }

}, {
    timestamps: false,
    versionKey: false,
}
)

const CrticalInformationInurl = mongoose.model("SensitiveInformations", SensitiveKeywordsUrlSchema)

module.exports = { CrticalInformationInurl }