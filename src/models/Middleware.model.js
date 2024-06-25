const mongoose = require('mongoose');


// Define the schema
const injectionSchema = new mongoose.Schema({
    appid: { type: String, trim: true, ref: "users" },
    Sql: { type: Boolean, default: true },
    Bot: { type: Boolean, default: true },
    Vpn: { type: Boolean, default: true },
    Spam: { type: Boolean, default: true },
    xss: { type: Boolean, default: true },
    html: { type: Boolean, default: true },
    Nosql: { type: Boolean, default: true },
    commandline: { type: Boolean, default: true },
    Block: { type: Boolean, default: true },
    xml: { type: Boolean, default: true },
    css: { type: Boolean, default: true },
    iframe: { type: Boolean, default: true },
    expiresAt: {
        type: Date,
        default: null,
        index: { expires: '1m' }  // TTL index that will trigger deletion
    },
});

// Create the model
const MiddlewareModel = mongoose.model('MiddlewareModel', injectionSchema);

module.exports = { MiddlewareModel };
