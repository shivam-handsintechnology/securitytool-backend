const mongoose = require('mongoose');
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
     
        console.log("mongodb connected")
      }).catch((e) => console.log(e.message))
  } catch (error) {
    console.error(error.message);
  }

}

module.exports = { DBConnection }