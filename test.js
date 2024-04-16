const axios = require('axios');
// Example usage:


async function ScanDangerousMethods(response) {
  const isDangerousMethod = (method) => {
    const dangerousMethods = ["eval", "exec", "setTimeout", "setInterval", "Function","XMLHttpRequest", "fetch"];
    return dangerousMethods.includes(method);
  }
 return new Promise(async (resolve, reject) => {
    try {
      let results = []
      // Iterate through the data and process each item
      response.data.data.forEach(async (item) => {
        try {
          const regex = /\.(eval|exec|setTimeout|setInterval|Function|XMLHttpRequest|fetch)\(/ig; // Regex pattern
          let modifiedContent = item.content.replace(/"/g, "'");
          const matches = modifiedContent.match(regex);
          if (matches && matches.length > 0) {
            matches.forEach(match => {
              const dangerousMethod = match.replace(/\(|\./g, ''); // Remove "(" and "."

              if (isDangerousMethod(dangerousMethod)) {
                          results.push(`Dangerous method ${match} found in ${item.name}`);
              }
            });
          }
        } catch (error) {
          console.error("Error processing file content:", error);
          reject(error)
          // Handle error if necessary
        }
      });
      // Resolve results
      resolve(results);
    } catch (error) {
      reject(error)
    }
  })
}
const ScanArbitaryMethods = async (response) => {
  return new Promise(async (resolve, reject) => {
    try {
      function isStandardMethod(method) {
        const standardMethods = ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS", "TRACE"];
        return standardMethods.includes(method.toUpperCase());
      }
      let results = []
      // Iterate through the data and process each item
      response.data.data.forEach(async (item) => {
        try {
          const regex = /\.(get|post|put|delete|patch|head|options|trace)\(/ig; // Regex pattern
          let modifiedContent = item.content.replace(/"/g, "'");
          const matches = modifiedContent.match(regex);
          if (matches && matches.length > 0) {
            matches.forEach(match => {
              const arbitraryMethod = match.replace(/\(|\./g, ''); // Remove "(" and "."
              if (!isStandardMethod(arbitraryMethod)) {
                results.push(`Arbitry mrthod found in ${item.name}`);
              }
            });
          }


        } catch (error) {
          console.error("Error processing file content:", error);
          reject(error)
          // Handle error if necessary
        }
      });
      // Resolve results
      resolve(results);
    } catch (error) {
      reject(error)
    }
  })
};


(async()=>{
  try {
    let response = await axios.get('http://localhost:20000/fileContent')
    let data = await ScanArbitaryMethods(response).then((data) => {
      return data
    })
    console.log("Arbirty Methods",data)
    let dangerousMethods = await ScanDangerousMethods(response).then((data) => {
      return data
    })
    console.log("Dangerous Methods",dangerousMethods)
  } catch (error) {
    console.log(error.message)
  }
})()
