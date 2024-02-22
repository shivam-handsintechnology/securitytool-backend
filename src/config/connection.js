const mongoose = require('mongoose');
const IndectionsTypeModel = require("../models/IndecTIonSTypeModel")
const Injectionstype = require("../utils/Injectionstype.json")
// Custom function to generate a slug
function generateSlug(title) {
  // Remove non-alphanumeric characters and replace spaces with hyphens
  const cleanedSlug = title.replace(/[^\w\s]/gi, '').trim().replace(/\s+/g, '-').toLowerCase();
  return cleanedSlug;
}
async function DBConnection(mongouri) {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(mongouri
      , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(async () => {
        await IndectionsTypeModel.insertMany(Injectionstype.data, { ordered: false })
        console.log("mongodb connected")
      }).catch((e) => console.log(e.message))
  } catch (error) {
    console.error(error.message);
  }

}
var whitelist = ['http://localhost:3000', 'http://localhost:5000']
var corsOptions = {
  origin: function (origin, callback) {
    if (typeof (origin) == "undefined") {
      callback(null, true)
    }
    else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
module.exports = { DBConnection, corsOptions }