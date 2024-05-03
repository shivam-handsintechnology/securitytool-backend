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
const AllowedWebDomainsModelSchema = mongoose.Schema({
    domain: { type: String, trim: true,unique:true },
    type: { type: String,enum:["nodejs","web","android","ios"] ,default:"web",trim: true},
    appid: { type: String, trim: true,ref: "users" },
}, {
    versionKey: false,
}
)
const AllowedDomainsModel = mongoose.model("AllowedDomainsModel", AllowedDomainsModelSchema)
const AllowedWebDomainsModel = mongoose.model("AllowedWebDomainsModel", AllowedWebDomainsModelSchema)
module.exports = { AllowedDomainsModel ,AllowedWebDomainsModel}