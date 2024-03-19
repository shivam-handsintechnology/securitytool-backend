// Create schema for white list attack words 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WhitelistDirectryListingWordsSchema = new Schema({
    word: { type: Array, },
}, {
    timestamps: true,
    versionKey: false,
    capped: { size: 1024 * 1024 * 1024, max: 1 } // 1GB
});
const WhitelisttDirectryListingWords = mongoose.model('WhitelistWords', WhitelistDirectryListingWordsSchema);
module.exports = { WhitelisttDirectryListingWords };
