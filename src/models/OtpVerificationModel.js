const mongoose = require('mongoose');
const { Schema } = mongoose;
const OtpVerificationSchema = new Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        // expires in 15 minutes
        expires: 900,
    }
});
const OtpVerification = mongoose.model('OtpVerification', OtpVerificationSchema);
module.exports = OtpVerification
// Compare this snippet from src/models/AllowedDomainsModel.js: