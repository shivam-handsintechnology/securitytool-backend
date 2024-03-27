// Create schema for white list attack words 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const WhitelistDirectryListingWordsSchema = new Schema({
    word: {
        type: String,
        required: true,
        unique: {
            message: 'Word must be unique.'
        }
    }
}, {
    timestamps: true,
    versionKey: false,

});
const WhitelisttDirectryListingWords = mongoose.model('WhitelistWords', WhitelistDirectryListingWordsSchema);
module.exports = { WhitelisttDirectryListingWords };
