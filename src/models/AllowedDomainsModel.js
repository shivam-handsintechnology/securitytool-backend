const mongoose = require("mongoose");

const AllowedDomainsModelSchema = mongoose.Schema({
    domain: { type: String, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }
}, {
    timestamps: false,
    versionKey: false,
}
)
const AllowedDomainsModel = mongoose.model("AllowedDomainsModel", AllowedDomainsModelSchema)
module.exports = { AllowedDomainsModel }