const mongoose = require("mongoose");
const IndecTIonSTypeModelSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    // other fields in your schema
    slug: { type: String, unique: true }
}, {
    capped: { size: 1024 * 1024 * 1024, max: 1 } // 1GB
});
module.exports = mongoose.model("IndectionsTypeModel", IndecTIonSTypeModelSchema)
