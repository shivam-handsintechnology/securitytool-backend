const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CLientSessionDataSchema = new Schema({
    appid: {
        type: String,
        ref: 'User',
        unique: true
    },
    sessionData: { type: Object, default: null },
    Cookiesdata: { type: Object, default: null },
    domain: {
        type: String,
        required: true,
        unique: true
    }
    , subdomain: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('CLientSessionData', CLientSessionDataSchema);