const mongoose = require("mongoose");
const IndecTIonSTypeModelSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    // other fields in your schema
    slug: { type: String, unique: true }
});
module.exports = mongoose.model("IndectionsTypeModel", IndecTIonSTypeModelSchema)
