
const {
  sensitivedata,
} = require("../sensitive/availableapikeys");
const staticFolders = require("../data/json/staticFolders.json");
const MYSQLCSVDATA = require("../data/json/mysqldata.json");
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
  let isAccessControlAllowMethods= false;
  return new Promise(async (resolve, reject) => {
    try {
      const standardMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
     

      // Iterate through the data and process each item
      response.forEach(async (item) => {
        try {
          let modifiedContent = item.content.replace(/"/g, "'");
      
          const allowedMethodsRegex = /\.(header|setHeader)\s*\(\s*['"]Access-Control-Allow-Methods['"][\s,]*['"]([^'"]+)['"][\s,]*\)/i
          const match = modifiedContent.match(allowedMethodsRegex);
            console.log({match})
          if (match && match[2]) {
            isAccessControlAllowMethods=true
            const allowedMethods = match[2].split(',').map(method => method.trim().toUpperCase());
            console.log({allowedMethods})
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
      resolve({results,isAccessControlAllowMethods});
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
      results.push(`find ${hardcodedValue}  in a ${field} at line ${lineNumber} in ${item.directoryPath +"/"+item.name+item.extension}`);
    }

    if ((match = regexIsObject.exec(modifiedContent)) !== null) {

      const hardcodedValue = match[1];
      const lineNumber = getLineNumber(modifiedContent, match.index);
      results.push(`find ${hardcodedValue}  in a ${field} at line ${lineNumber} in ${item.directoryPath +"/"+item.name+item.extension}`);
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

async function scanSQLvulnerability(hostname,connection) {
  for (let i = 0; i < MYSQLCSVDATA.length; i++) {
    let data = MYSQLCSVDATA[i];
    let response =await fetch(hostname, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    if(response.status === 200 || response.status === 201 || response.status === 202 || response.status === 204 || response.status === 304 || response.status===404){
      console.log(`Sql Injection Detected`)
      connection.emit('sql-injection',`Sql Injection Detected`)
    }
    else if(response.status>400 && response.status<500 && response.status!==404){
      console.log("Bad Request")
      connection.emit('sql-injection',`Pass Sql Injection Test`)

    }
}
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
    } else if(version>=20) {
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
const { chromium } = require('playwright');

const checkNonHTMLContentAccessibility=async (hostname,connection) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    // List of URLs to test
    const urls = [
        'https://securitytool-front.handsintechnology.in/dashboard',
        'https://securitytool-front.handsintechnology.in/profile',
        // Add more URLs to test here
    ];

    for (const url of urls) {
        // Open a new page for each URL
        const page = await context.newPage();
        let navigationSuccessful = false;
        let attempts = 0;

        while (!navigationSuccessful && attempts < 3) {
            try {
                // Navigate to the page
                await page.goto(url, { timeout: 60000 }); // Increase the timeout to 60 seconds

                // Wait for the page to load completely
                await page.waitForLoadState('networkidle', { timeout: 60000 }); // Increase the timeout to 60 seconds

                // Get the final URL after any redirects
                const finalUrl = page.url();

                if (finalUrl === url) {
                    console.log(`Page "${url}" is not redirected.`);
                } else {
                    console.log(`Page "${url}" is redirected to: ${finalUrl}`);
                }

                navigationSuccessful = true;
            } catch (error) {
                console.error(`Error occurred while testing page "${url}":`, error);
                attempts++;
            }
        }

        if (!navigationSuccessful) {
            console.error(`Failed to navigate to page "${url}" after multiple attempts.`);
        }

        // Close the page
        await page.close();
    }

    // Close the browser
    await browser.close();
}

module.exports = {
  scanDirectoryOptionMethod, scanSessionvulnerability,
  ScanDangerousMethods, getLatestNodeVersion, ScanArbitaryMethods, scanHardCodedData, scanRedirectvulnerability, scanSQLvulnerability, get403ErrorMessage, getHttpErrorMessages, getLoginErrorMessages
};
