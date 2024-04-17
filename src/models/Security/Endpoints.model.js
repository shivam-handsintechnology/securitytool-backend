const mongoose=require('mongoose')
const EndpointsSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    domain: { type: String, trim:true },
    appid: { type: String, trim:true },
    endpoints: { type: Array, default: [] },
    hostname: { type: String, trim:true },
});
module.exports = mongoose.model( "Endpoints", EndpointsSchema )