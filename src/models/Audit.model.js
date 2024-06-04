const mongoose = require('mongoose');
// Define a schema for storing sessions
const AuditSchema = new mongoose.Schema({
    url: String,
    method: String,
    ipAddress: String,
}, {
    timestamps: true,
    versionKey: false,
});

// Create a model for sessions
const Audit = mongoose.model('Audit', AuditSchema);
module.exports = Audit;