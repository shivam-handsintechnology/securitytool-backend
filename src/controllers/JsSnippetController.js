const path = require('path')
module.exports = {
  JsSnippet: (req, res) => {
    // Resolve the path to the protected JavaScript file
    const filePath = path.join(process.cwd(), 'src', 'public', 'protect.js');
    // Send the file as the response
    res.sendFile(filePath);
  },
  getALlDataFromSnippet: (req, res) => {
    const { data } = req.body;
    console.log(data);

  }
}