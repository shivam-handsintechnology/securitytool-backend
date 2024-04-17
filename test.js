const axios = require('axios');
const staticFolders=require("./staticFolders.json");
const { name } = require('ejs');
// Example usage:

const checkStatusCodes = async (response) => {
  return new Promise(async (resolve, reject) => {
    try {
      const staticDirectories =[...staticFolders.staticFiles,...staticFolders.staticFolders] // Add other static directories as needed
      const results = [];
console.log("staticDirectories",staticDirectories)
      // Iterate through the data and process each item
      for (const item of response.data.data) {
        try {
          // Ignore static files based on directory path
          if (item.directoryPath && staticDirectories.some(dir => item.directoryPath.includes(dir))) {
            continue;
          }

          let modifiedContent = item.content.replace(/"/g, "'");

          // Check for 404 and 403 status codes
          if (modifiedContent.includes('404') || modifiedContent.includes('403')) {
            results.push(
              {
                name: item.name,
                '404': modifiedContent.includes('404'),
                '403': modifiedContent.includes('403')
              }
            );
          }
        } catch (error) {
          console.error("Error processing file content:", error);
        }
      }

      // Resolve results
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};
const checkForLoginNasedStatusCOdes=async(response)=>{
  return new Promise(async (resolve, reject) => {
    try {
      const staticDirectories =[...staticFolders.staticFiles,...staticFolders.staticFolders] // Add other static directories as needed
      const baseLoginTerms = [
        'login', 'auth', 'authentication', 'signin', 'signup', 'user', 'account',
        'session', 'token', 'password', 'forgot', 'reset', 'verify', 'confirm', 'authorize',
        'credentials'
      ];
      const results = [];
console.log("staticDirectories",staticDirectories)
      // Iterate through the data and process each item
      for (const item of response.data.data) {
        try {
          let filename=item.name.toLowerCase()
          let extension=item.extension.toLowerCase()
          let filenameswithloginbasedterms=baseLoginTerms.some(term=>filename.includes(term))
          console.log("filenameswithloginbasedterms",filenameswithloginbasedterms)
                    // Ignore static files based on directory path
            if(!filenameswithloginbasedterms){
              continue;
            }

          let modifiedContent = item.content.replace(/"/g, "'");

          // Check for 404 and 403 status codes
          if (filenameswithloginbasedterms && extension.includes('js') ) {
            if(modifiedContent.includes('404') || modifiedContent.includes('403')){
              results.push(
                {
                  name: item.name,
                  '404': modifiedContent.includes('404'),
                  '403': modifiedContent.includes('403')
                }
              );
            }
          }
        } catch (error) {
          console.error("Error processing file content:", error);
        }
      }

      // Resolve results
      resolve(results);
    } catch (error) {
      reject(error);
    }
  }
  )
}




(async()=>{
  try {
    let response = await axios.get('http://localhost:20000/fileContent')
    let data = await checkForLoginNasedStatusCOdes(response).then((data) => {
      return data
    })
    console.log("check Status Codes",data)


  } catch (error) {
    console.log(error.message)
  }
})()

