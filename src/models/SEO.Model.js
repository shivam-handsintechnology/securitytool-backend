const mongoose = require('mongoose');

const metaDataSchema = new mongoose.Schema({
    title: String,
    description: String,
    keywords: Array
});

const seoSchema = new mongoose.Schema({
    meta_data: [metaDataSchema],
    url: {
        type: String,
        unique: true
    }
});

const SEO = mongoose.model('SEO', seoSchema);

module.exports = SEO;