const mongoose = require("mongoose")

const ServerDataInPlaintextSchema = mongoose.Schema({
    key: { type: Array, default: [] },
    appid: { type: String, require: true },
    domain: { type: String, require: true },
}, { validateBeforeSave: false })
const ServerDataInPlaintextModel = mongoose.model("ServerDataInPlaintext", ServerDataInPlaintextSchema)
module.exports = {
    ServerDataInPlaintextModel
}