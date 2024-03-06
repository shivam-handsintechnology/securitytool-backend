const mongoose = require("mongoose");

const AllowedDomainsModelSchema = mongoose.Schema({
    domain: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }
}, {
    timestamps: false,
    versionKey: false,
}
)
const AllowedDomainsModel = mongoose.model("AllowedDomainsModel", AllowedDomainsModelSchema)
module.exports = { AllowedDomainsModel }