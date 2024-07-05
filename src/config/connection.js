const mongoose = require('mongoose');
// Custom function to generate a slug

async function DBConnection(mongouri) {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(mongouri
      , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(async () => {

        console.log("mongodb connected")
      }).catch((e) => console.log(e.message))
  } catch (error) {
    console.error(error.message);
  }

}

module.exports = { DBConnection }