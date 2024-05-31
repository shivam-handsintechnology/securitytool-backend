
const {
  sensitivedata,
} = require("../sensitive/availableapikeys");
const staticFolders = require("../data/json/staticFolders.json");

// regular expression paterns
// OPTIONS method
async function scanDirectoryOptionMethod(response) {
  let results = [];
  return new Promise(async (resolve, reject) => {
    try {

      // Iterate through the data and process each item
      response.forEach(async (item) => {
        try {
          let modifiedContent = item.content.replace(/"/g, "'");
          // Check if OPTIONS method is available in the content
          if (modifiedContent.includes('.options(')) {
            results.push({ filename: item.name, method: "OPTIONS" });
          }

        } catch (error) {
          console.error("Error processing file content:", error);
          reject(error);
          // Handle error if necessary
        }
      });

      // Resolve results along with optionsAvailable flag
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}
async function ScanDangerousMethods(response) {

  const isDangerousMethod = (method) => {
    const dangerousMethods = ["eval", "exec", "setTimeout", "setInterval", "Function", "XMLHttpRequest", "fetch"];
    return dangerousMethods.includes(method);
  }
  return new Promise(async (resolve, reject) => {
    try {
      let results = []
      // Iterate through the data and process each item
      response.forEach(async (item) => {
        try {
          const regex = /(eval|exec|setTimeout|setInterval|Function|XMLHttpRequest|fetch)\(/ig; // Regex pattern
          let modifiedContent = item.content.replace(/"/g, "'");
          const matches = modifiedContent.match(regex);
          if (matches && matches.length > 0) {
            matches.forEach(match => {
              const dangerousMethod = match.replace(/\(|\./g, ''); // Remove "(" and "."

              if (isDangerousMethod(dangerousMethod)) {
                results.push({ method: match.replace(/\(|\./g, ''), filename: item.name });
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
  let results = [];
  let isAccessControlAllowMethods = false;
  return new Promise(async (resolve, reject) => {
    try {
      const standardMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];


      // Iterate through the data and process each item
      response.forEach(async (item) => {
        try {
          let modifiedContent = item.content.replace(/"/g, "'");

          const allowedMethodsRegex = /\.(header|setHeader)\s*\(\s*['"]Access-Control-Allow-Methods['"][\s,]*['"]([^'"]+)['"][\s,]*\)/i
          const match = modifiedContent.match(allowedMethodsRegex);
          console.log({ match })
          if (match && match[2]) {
            isAccessControlAllowMethods = true
            const allowedMethods = match[2].split(',').map(method => method.trim().toUpperCase());
            console.log({ allowedMethods })
            const extraMethods = allowedMethods.filter(method => !standardMethods.includes(method));


            if (extraMethods.length > 0) {
              results.push(extraMethods?.toString());
            }
          }
        } catch (error) {
          console.error("Error processing file content:", error);
          reject(error); // Handle error if necessary
        }
      });

      // Resolve results
      resolve({ results, isAccessControlAllowMethods });
    } catch (error) {
      reject(error);
    }
  });
};
async function scanHardCodedData(response) {
  const results = [];
  const sensitiveData = sensitivedata;
  // Iterate through the data and process each item
  for (const item of response) {
    try {
      let modifiedContent = item.content.replace(/"/g, "'");
      modifiedContent = modifiedContent.toLowerCase();
      // Check for sensitive data in the content
      for (const field of sensitiveData) {
        const regexIsEqualTo = new RegExp(`${field}\\s*=\\s*['"](.*?)['"]`, "g");
        const regexIsObject = new RegExp(`${field}\\s*:\\s*['"]([^'"]*)['"]`, "g");

        let match;
        if ((match = regexIsEqualTo.exec(modifiedContent)) !== null) {
          const hardcodedValue = match[1];
          const lineNumber = getLineNumber(modifiedContent, match.index);
          results.push(`find ${hardcodedValue}  in a ${field} at line ${lineNumber} in ${item.directoryPath + "/" + item.name + item.extension}`);
        }

        if ((match = regexIsObject.exec(modifiedContent)) !== null) {

          const hardcodedValue = match[1];
          const lineNumber = getLineNumber(modifiedContent, match.index);
          results.push(`find ${hardcodedValue}  in a ${field} at line ${lineNumber} in ${item.directoryPath + "/" + item.name + item.extension}`);
        }
      }
    } catch (error) {
      console.error("Error processing file content:", error);
      // Handle error if necessary
    }
  }

  return results;

}
async function scanRedirectvulnerability(response) {
  const results = ["Redirect Vulnerability Not Found in the Project"];
  response.forEach((item) => {
    let modifiedContent = item.content.replace(/"/g, "'");
    modifiedContent = modifiedContent.toLowerCase();
    //  redirect vunurability
    const redirectmatches = modifiedContent.match(/\.redirect\s*\(([^)]+)\)/g);
    if (redirectmatches && Array.isArray(redirectmatches)) {
      for (const match of redirectmatches) {
        const dataMatch = match.match(/\(([^)]+)\)/);
        if (dataMatch && dataMatch[1]) {
          const data = dataMatch[1];
          console.log(data)
          if (data.includes("http") || data.includes("https")) {
            results.splice(0, 1);
            let lineNumber = getLineNumber(modifiedContent, modifiedContent.indexOf(match));
            results.push(`Redirect Vulnerability Found in the file at line ${lineNumber} in ${item.directoryPath}/${item.name}${item.extension} with value of ${data}`);
          }
        }
      }
    }
  });

  return results;
}


function getLineNumber(content, index) {
  const lines = content.substr(0, index).split("\n");
  return lines.length;
}

async function getLatestNodeVersion(version) {
  try {
    version = version.replace(/v/g, "")
    version = parseInt(version)
    if (version < 20) {
      return { older_version_support: true }
    } else if (version >= 20) {
      return { older_version_support: false }
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
const get403ErrorMessage = async (response) => {
  return new Promise(async (resolve, reject) => {
    try {
      const staticDirectories = [...staticFolders.staticFiles, ...staticFolders.staticFolders] // Add other static directories as needed
      let results = [];
      // Iterate through the data and process each item
      for (const item of response) {
        try {
          // Ignore static files based on directory path
          if (item.directoryPath && staticDirectories.some(dir => item.directoryPath.includes(dir))) {
            continue;
          }

          let modifiedContent = item.content.replace(/"/g, "'");

          // Check for 404 and 403 status codes
          if (modifiedContent.includes('403')) {
            results.push(
              {
                name: item.name,
              }
            );
          }
        } catch (error) {
          console.error("Error processing file content:", error);
        }
      }

      // Resolve results
      // remove duplicates
      results = results.length > 0 ? results.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i) : []
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};
const getHttpErrorMessages = async (response) => {
  return new Promise(async (resolve, reject) => {
    try {
      const staticDirectories = [...staticFolders.staticFiles, ...staticFolders.staticFolders]; // Add other static directories as needed
      let results = [];
      // Iterate through the data and process each item
      for (const item of response) {
        try {
          // Ignore static files based on directory path
          if (item.directoryPath && staticDirectories.some(dir => item.directoryPath.includes(dir))) {
            continue;
          }

          let modifiedContent = item.content.replace(/"/g, "'");

          // Check for 400, 401, 403, 404, and 500 status codes
          if (modifiedContent.match(/400|401|403|404|500/g)) {
            const matchedCodes = modifiedContent.match(/400|401|403|404|500/g);

            let uniqureCodes = matchedCodes.filter((v, i, a) => a.indexOf(v) === i)
            uniqureCodes = uniqureCodes.length > 0 ? uniqureCodes.toString() : "No Error Codes Found"
            results.push({
              name: item.name,
              code: uniqureCodes
            });

          }
        } catch (error) {
          console.error("Error processing file content:", error);
        }
      }

      // Resolve results
      results = results.length > 0 ? results.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i) : []
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

const getLoginErrorMessages = async (response) => {
  return new Promise(async (resolve, reject) => {
    try {
      const staticDirectories = [...staticFolders.staticFiles, ...staticFolders.staticFolders] // Add other static directories as needed
      const baseLoginTerms = [
        'login', 'auth', 'authentication', 'signin', 'signup', 'user', 'account',
        'session', 'token', 'password', 'forgot', 'reset', 'verify', 'confirm', 'authorize',
        'credentials'
      ];
      let results = [];
      // Iterate through the data and process each item
      for (const item of response) {
        try {
          let filename = item.name.toLowerCase()
          let extension = item.extension.toLowerCase()
          let filenameswithloginbasedterms = baseLoginTerms.some(term => filename.includes(term))

          // Ignore static files based on directory path
          if (!filenameswithloginbasedterms) {
            continue;
          }

          let modifiedContent = item.content.replace(/"/g, "'");

          // Check for 404 and 403 status codes
          if (filenameswithloginbasedterms && extension.includes('js')) {
            // Check for 400, 401, 403, 404, and 500 status codes
            if (modifiedContent.match(/400|401|403|404|500/g)) {
              const matchedCodes = modifiedContent.match(/400|401|403|404|500/g);
              let uniqureCodes = matchedCodes.filter((v, i, a) => a.indexOf(v) === i)
              uniqureCodes = uniqureCodes.length > 0 ? uniqureCodes.toString() : "No Error Codes Found"
              results.push({
                name: item.name,
                code: uniqureCodes
              });
            }
          }
        } catch (error) {
          console.error("Error processing file content:", error);
        }
      }

      resolve(results);
    } catch (error) {
      reject(error);
    }
  }
  )
}

module.exports = {
  scanDirectoryOptionMethod,
  ScanDangerousMethods, getLatestNodeVersion, ScanArbitaryMethods, scanHardCodedData,
  scanRedirectvulnerability, get403ErrorMessage, getHttpErrorMessages, getLoginErrorMessages
};
