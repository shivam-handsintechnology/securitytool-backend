const mongoose = require("mongoose");

const AllowedDomainsModelSchema = mongoose.Schema({
    domain: { type: String, trim: true,unique:true },
    type: { type: String,enum:["nodejs","web","android","ios"] ,trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    appid: { type: String, trim: true,ref: "users" },
}, {
    timestamps: false,
    versionKey: false,
}
)
const AllowedDomainsModel = mongoose.model("AllowedDomainsModel", AllowedDomainsModelSchema)
module.exports = { AllowedDomainsModel }