
const {
  sensitivedata,
} = require("../sensitive/availableapikeys");
const staticFolders = require("../data/json/staticFolders.json")
// regular expression paterns
// OPTIONS method
async function scanDirectoryOptionMethod(response) {
  let results = [];
  return new Promise(async (resolve, reject) => {
    try {

      // Iterate through the data and process each item
      response.data.data.forEach(async (item) => {
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
  console.log("response", response)
  const isDangerousMethod = (method) => {
    const dangerousMethods = ["eval", "exec", "setTimeout", "setInterval", "Function", "XMLHttpRequest", "fetch"];
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
};
function containsSequelizeCode(fileContent) {
  // Check if the file content contains Sequelize-related code
  // You can implement your own logic based on your project's coding patterns
  // This can include checking for import/require statements, specific function calls, etc.
  const sequelizeImportRegex =
    /require\(['"]sequelize['"]\)|import.*['"]sequelize['"]/;
  const sequelizeFunctionRegex =
    /Sequelize\.(define|query|findAll|findOne|create|update|destroy)/;

  if (
    sequelizeImportRegex.test(fileContent) ||
    sequelizeFunctionRegex.test(fileContent)
  ) {
    return true;
  }

  return false;
}
function containsMySQLCode(fileContent) {
  // Check if the file content contains MySQL-related code
  // You can implement your own logic based on your project's coding patterns
  // This can include checking for import/require statements, specific function calls, etc.
  const mysqlImportRegex = /require\(['"]mysql['"]\)|import.*['"]mysql['"]/;
  const mysqlFunctionRegex = /mysql\.(connect|query|execute|prepare|escape)/;
  if (
    mysqlImportRegex.test(fileContent) ||
    mysqlFunctionRegex.test(fileContent)
  ) {
    return true;
  }

  return false;
}
async function scanHardCodedData(content, file) {
  const results = ["Hard Coded Data Not Found in the Project"];
  content = content.replace(/"/g, "'"); // Replace double quotes with single quotes
  const sensitiveFields = sensitivedata;

  for (const field of sensitiveFields) {
    const regexIsEqualTo = new RegExp(`${field}\\s*=\\s*['"](.*?)['"]`, "g");
    const regexIsObject = new RegExp(`${field}\\s*:\\s*['"]([^'"]*)['"]`, "g");

    let match;
    if ((match = regexIsEqualTo.exec(content)) !== null) {
      const hardcodedValue = match[1];
      const lineNumber = getLineNumber(content, match.index);
      results.splice(0, 1);
      results.push(`find ${hardcodedValue}  in a ${field} at line ${lineNumber} in ${file}`);
    }

    if ((match = regexIsObject.exec(content)) !== null) {
      results.splice(0, 1);
      const hardcodedValue = match[1];
      const lineNumber = getLineNumber(content, match.index);
      results.push(`find ${hardcodedValue}  in a ${field} at line ${lineNumber} in ${file}`);
    }
  }
  return results;

}

async function scanRedirectvulnerability(content, file) {
  const results = ["Redirect Vulnerability Not Found in the file"];
  content = content.toLowerCase();
  //  redirect vunurability
  const redirectmatches = content.match(/\.redirect\s*\(([^)]+)\)/g);
  if (redirectmatches && Array.isArray(redirectmatches)) {
    for (const match of redirectmatches) {
      const dataMatch = match.match(/\(([^)]+)\)/);
      if (dataMatch && dataMatch[1]) {
        const data = dataMatch[1];
        // Check if third-party URLs are used in the redirection
        const thirdPartyURLs = data.match(/(?:https?:\/\/)?([^\s\/]+)/g);
        if (thirdPartyURLs && thirdPartyURLs.length > 0) {
          for (const url of thirdPartyURLs) {
            if (url.includes("http") || url.includes("https")) {
              results.splice(0, 1);
              results.push(`Found a third-party URL: ${url} at file ${file}`);
              // Perform further actions or checks as needed
            }
          }
        }
      }
    }
  }

  return results;
}
async function scanSessionvulnerability(content, file, middlewares) {

  const results = {
    jsonwebtoken: false,
    session: false,
    session_hijacking: false,
    session_timeout: "",
    secure_transmission: false,
    session_close_on_browser_close: false,
    file: file
  };

  const jsonwebtoken = /jsonwebtoken/g; // Change this to the desired pattern
  if (jsonwebtoken.test(content)) {
    results.jsonwebtoken = true;
  }

  if (middlewares.includes("session")) {
    content = content.toLowerCase();

    results.session = true;

    const sessionIdRegeneration = content.includes(".session.regenerate(");
    if (sessionIdRegeneration) {
      results.session_hijacking = true;
    }

    const cookieRegex = /cookie:\s*{\s*[\s\S]*?\s*}/;
    const cookieRegexmatch = content.match(cookieRegex);
    if (cookieRegexmatch) {
      const sevenDays = 86400000 * 7;
      const oneMinute = 60000;
      const sessionConfig = cookieRegexmatch[0].trim();
      const cookieString = sessionConfig.replace("cookie:", "");
      const cookieObject = eval(`(${cookieString})`);

      const isSecureTransmission = cookieObject.secure;
      results.secure_transmission = isSecureTransmission ? "session IDs are securely transmitted over encrypted channels (HTTPS)" : "session IDs are not securely transmitted over encrypted channels (HTTPS)";

      if (cookieObject["maxage"] === false || cookieObject["expires"] === false) {
        results.session_close_on_browser_close = true;
      } else if (
        cookieObject["maxage"] === null ||
        cookieObject["expires"] === null
      ) {
        results.session_timeout = "Infinite";
      } else if (
        cookieObject["maxage"] > sevenDays ||
        cookieObject["expires"] > sevenDays
      ) {
        results.session_timeout = "High";
      } else if (
        cookieObject["maxage"] < oneMinute ||
        cookieObject["expires"] < oneMinute
      ) {
        results.session_timeout = "Low";
      } else {
        results.session_timeout = "Normal";
      }
    }
  }

  return results; // Returning an array to match the structure of other vulnerability scanning functions
}

async function scanSQLvulnerability(content, file) {
  const results = [];
  content = content.toLowerCase();
  //  sql vunurability
  if (containsSequelizeCode(content)) {
    results.push(`Sequalize methods are Found it is good for block sql injections`);
  } else if (containsMySQLCode(content)) {
    results.push(`Mysql methods are Found it is not  good for prevent sql injections please use Sequalize Orm Function For Prevent Sql Injections/n but if you are use mysql queris then please use paramterize queries like this
    const userId = 1;
    const query = 'SELECT * FROM users WHERE id = ?';

    connection.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        return;
      }

      //console.log('Query results:', results);
    });
 // Do not use queries like this because this will be dangerous 
 const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }

    consoleColorText('Query results:', results);
  });
    `);
  } else if (!containsMySQLCode(content) || !containsSequelizeCode(content)) {
    results.push(`Mysql Not Found`);
  }
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
    } else {
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
      console.log("staticDirectories", staticDirectories)
      // Iterate through the data and process each item
      for (const item of response.data.data) {
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
       let codes = ['400', '401', '403', '404', '500'];
      // Iterate through the data and process each item
      for (const item of response.data.data) {
        try {
          // Ignore static files based on directory path
          if (item.directoryPath && staticDirectories.some(dir => item.directoryPath.includes(dir))) {
            continue;
          }

          let modifiedContent = item.content.replace(/"/g, "'");

          // Check for 400, 401, 403, 404, and 500 status codes
          if (modifiedContent.match(/400|401|403|404|500/g)) {
            const matchedCodes = modifiedContent.match(/400|401|403|404|500/g);
            
            let uniqureCodes=matchedCodes.filter((v, i, a) => a.indexOf(v) === i)
            uniqureCodes=uniqureCodes.length>0?uniqureCodes.toString():"No Error Codes Found"
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
      console.log("staticDirectories", staticDirectories)
      // Iterate through the data and process each item
      for (const item of response.data.data) {
        try {
          let filename = item.name.toLowerCase()
          let extension = item.extension.toLowerCase()
          let filenameswithloginbasedterms = baseLoginTerms.some(term => filename.includes(term))
          console.log("filenameswithloginbasedterms", filenameswithloginbasedterms)
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
              let uniqureCodes=matchedCodes.filter((v, i, a) => a.indexOf(v) === i)
              uniqureCodes=uniqureCodes.length>0?uniqureCodes.toString():"No Error Codes Found"
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
  scanDirectoryOptionMethod, scanSessionvulnerability,
  ScanDangerousMethods, getLatestNodeVersion, ScanArbitaryMethods, scanHardCodedData, scanRedirectvulnerability, scanSQLvulnerability, get403ErrorMessage, getHttpErrorMessages, getLoginErrorMessages
};
