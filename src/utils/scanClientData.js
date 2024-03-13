const crypto = require("crypto");
const axios = require('axios');
const API_KEY = 'd55435107bbfb1235bdeb3457aa0cc7ca48ce7cba06aeb2fd8b3e8cc82096187';
const https = require('https')
const {
  passwordkeys,
  sensitivedata,
} = require("../sensitive/availableapikeys");
// regular expression paterns
// OPTIONS method
async function checkDirectoryListing(url) {
  try {
    const response = await axios.get(url);
    console.log(response.status);
    if (response.status === 200 && response.data.includes('Index of')) {
      console.log('Directory listing is enabled.');
      return 'Directory listing is enabled.';
    } else {
      console.log('Directory listing is disabled.');
      return 'Directory listing is disabled.';
    }
  } catch (error) {

    if (error?.response?.status >= 400) {
      if (error?.response?.status === 404) {
        console.log('Page not found.');
        return 'Page not found.';
      } else if (error?.response?.status === 403) {
        console.log('Access forbidden.');
        return 'Access forbidden.';
      } else {
        console.log('Directory listing is disabled.');
        return 'Directory listing is disabled.';
      }
    }
  }
}
async function scanDirectoryOptionMethod(routes, hostname) {
  const results = [];
  return new Promise((resolve, reject) => {
    try {
      routes.forEach((item) => {
        if (item.methods.includes("OPTIONS")) {
          results.push(`this location '${item.path}' uses the OPTIONS method`);
        }
      });
      if (results.length > 0) {
        resolve(results); // OPTIONS method enabled
      } else {
        resolve(null); // OPTIONS method disabled
      }
    } catch (error) {
      reject(error);
    }
  });
}
// application_accepts_arbitrary_methods
async function ScanDangerousMethods(routes, hostname) {
  const results = [];
  const dangerousMethods = ["DELETE", "PUT", "PATCH"];
  return new Promise((resolve, reject) => {
    try {
      routes.forEach((item) => {

        const hasDangerousMethod = dangerousMethods.some((method) =>
          item.methods.includes(method)
        );
        if (hasDangerousMethod) {
          const dangerousMethod = item.methods.find((method) =>
            dangerousMethods.includes(method)
          );
          results.push(
            `this location '${item.path}' uses the '${dangerousMethod}' method`
          );
        }
      });
      if (results.length > 0) {
        resolve(results); //application_accepts_arbitrary_methods
      } else {
        resolve(null); //application_ not_accepts_arbitrary_methods
      }
    } catch (error) {
      reject(error);
    }
  });
}

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

function missingSecurityHeaders(content) {
  // Example: Check for missing security headers
  const securityHeaders = ["Content-Security-Policy", "X-XSS-Protection"];
  return !securityHeaders.every((header) => content.includes(header));
}
function AccessControlAllowOriginisSetToStar(content) {
  // Example: Check for missing security headers
  const securityHeaders = ["Access-Control-Allow-Origin", "*"];
  return securityHeaders.every((header) => content.includes(header));
}

function isUnsafeRegexEvaluation(content) {
  // Example: Check for unsafe regex patterns
  const unsafePatterns = ["\\b(eval|Function)\\b"];
  return unsafePatterns.some((pattern) => content.match(pattern));
}
function InformationExposure(content) {
  // Example: Check for unsafe regex patterns
  const expressPatterns = ["\\b(express)\\b"];
  return expressPatterns.some((pattern) => content.match(pattern));
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

async function scanHardPasswordHashing(content, file) {
  const listOfSupportedHashes = crypto.getHashes();
  const results = ["Password Hashing Not Found in the Project"];
  content = content.toLowerCase();
  const crypto_createHashRegex = /createhash\('([^']*)'/g;
  const CryptoJsRegx = /(md5|sha256)\(/g;
  // cryptojs module
  let CryptoJsRegxmatch;
  if ((CryptoJsRegxmatch = CryptoJsRegx.exec(content)) !== null) {
    const keyword = CryptoJsRegxmatch[1];
    results.splice(0, 1);
    results.push(`found a file where ${keyword} password hashing is used in ${file}`);
  }
  // crypto module
  let crypto_createHashRegexmatch;
  if (
    (crypto_createHashRegexmatch = crypto_createHashRegex.exec(content)) !==
    null
  ) {
    const keyword = crypto_createHashRegexmatch[1];
    if (listOfSupportedHashes.includes(keyword)) {
      console.log({ keyword });
      results.splice(0, 1);
      results.push(`found a file where ${keyword} password hashing is used in ${file}`);
    }
  }
  return results;
}
async function scanXSSvulnerability(content, file) {
  const results = ["XSS Vulnerability Not Found in the Project"];
  // Check for potential XSS vulnerabilities
  // 4. Security Headers
  if (missingSecurityHeaders(content)) {
    results.splice(0, 1);
    results.push(`Potential XSS vulnerability: Missing security headers at ${file}`
    );
  }
  if (InformationExposure(content)) {
    results.splice(0, 1);
    results.push(`Disable X-Powered-By header for your Express app (consider using Helmet middleware),because it exposes information about the used framework to potential attackers.`);
  }
  // 5. Regular Expression Evaluation

  // 5. Server Side Evaluation
  const serversideinjex = /(eval|setTimeout|setInterval)\s*\(/gi;
  let serversideinjexmatch;
  if ((serversideinjexmatch = serversideinjex.exec(content)) !== null) {
    const matchedKeyword = serversideinjexmatch[0];
    results.splice(0, 1);
    results.push(`Potential Server Side Injection Code: ${matchedKeyword.replace("(", "")}\n`);
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
    session_timeout: "Normal",
    secure_transmission: false,
    session_close_on_browser_close: false,

  }
  // 
  const jsonwebtoken = /jsonwebtoken/g; // Change this to the desired pattern
  if (jsonwebtoken.test(content)) {
    results.jsonwebtoken = true;
  }
  // 
  if (middlewares.includes("session")) {
    content = content.toLowerCase();
    //  session configuration
    results["session"] = true;
    const sessionIdRegeneration = content.includes(".session.regenerate(");
    if (sessionIdRegeneration) {
      results["session_hijacking"] = true;

    }
    const cookieRegex = /cookie:\s*{\s*[\s\S]*?\s*}/;
    const cookieRegexmatch = content.match(cookieRegex);
    if (cookieRegexmatch) {
      const sevenDays = 86400000 * 7;
      const oneMinute = 60000;
      const sessionConfig = cookieRegexmatch[0].trim();
      const cookieString = sessionConfig.replace("cookie:", "");
      const cookieObject = eval(`(${cookieString})`);
      console.log(cookieObject);
      const isSecureTransmission = cookieObject.secure;
      results["secure_transmission"] = isSecureTransmission ? "session IDs are securely transmitted over encrypted channels (HTTPS)" : "session IDs are not  securely transmitted over encrypted channels (HTTPS)"
      if (cookieObject["maxage"] === false || cookieObject["expires"] === false) {
        // consoleColorText( "Session does not expire on closing the browser because is it means it will never expire",'red')
        results["session_close_on_browser_close"] = true;
      } else if (
        cookieObject["maxage"] === null ||
        cookieObject["expires"] === null
      ) {
        // consoleColorText("session is infinite","red")
        results["session_timeout"] = "Infinite";
      } else if (
        cookieObject["maxage"] > sevenDays ||
        cookieObject["expires"] > sevenDays
      ) {
        // consoleColorText("session timeout is high",'red')
        results["session_timeout"] = "High";
      } else if (
        cookieObject["maxage"] < oneMinute ||
        cookieObject["expires"] < oneMinute
      ) {
        // consoleColorText("session timeout is Low",'red')
        results["session_timeout"] = "Low";
      } else {
        // consoleColorText("session timeout is Normal","blue")
        results["session_timeout"] = "Normal";
      }
    }

  }
  return results;
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

      console.log('Query results:', results);
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
function scanDomain(domain) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://www.virustotal.com/vtapi/v2/domain/report?apikey=${API_KEY}&domain=${domain}&date=${timestamp}`;
    const options = {
      method: 'GET'
    };
    // Make the request
    const request = https.request(url, options, (response) => {
      const chunks = [];

      // Collect the response data in chunks
      response.on('data', (chunk) => {
        chunks.push(chunk);
      });

      // When the response is complete, concatenate the chunks into a single buffer
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
        // Parse the JSON response
        const result = JSON.parse(buffer.toString());
        if (result.response_code !== 1) {
          console.log(`The domain ${domain} could not be scanned.`);
          return;
        }

        if (result.detected_urls.length > 0) {
          console.log(`The domain ${domain} contains a virus!`);
          console.log(`The following URLs were detected as malicious:`);
          for (const url of result.detected_urls) {
            console.log(url.url);
          }
        } else {
          console.log(`The domain ${domain} is clean.`);
        }
      });
    });

    // Handle errors
    request.on('error', (error) => {
      console.error(error);
    });

    request.end();
  } catch (error) {
    console.log(error)
  }
}

async function scanWebsite(url) {
  // Launch a headless browser
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch();
  try {
    // Open a new page
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto(url);

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png' });

    // Extract the page title
    const title = await page.title();
    console.log('Page title:', title);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}
// const lighthouse = require('lighthouse');
const { launch } = require('chrome-launcher');

async function generateWebsiteReport(url) {
  const chrome = await launch();
  const options = { port: chrome.port };
  // const runnerResult = await lighthouse(url, options);

  // Access the generated report
  const report = runnerResult.report;
  await chrome.kill();
  return report
}
async function DefaultWebPage(routes, hostname) {
  return new Promise((resolve, reject) => {
    try {
      let results = "Not Available";

      let defaultWebpage = routes.filter((val) => {
        return val.path === "/" && val.methods.includes("GET");
      });
      if (defaultWebpage.length > 0) {
        // consoleColorText("Default web page present in the server", "blue");
        results = "Available"
      } else {
        // consoleColorText("Default web page not present in the server", "red");
        results = "Not Avaialble"
      }
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}
// Usage example
const ScanAllContentAndroutes = async (content, file, routes, hostname, middlewares) => {
  const results = {};
  results["optionmethodvulnerability"] = await scanDirectoryOptionMethod(routes, hostname);
  results["dangerousemethodvulnerability"] = await ScanDangerousMethods(routes, hostname);
  results["hardcodedata"] = await scanHardCodedData(content, file);
  results["passwordhashing"] = await scanHardPasswordHashing(content, file);
  results["xssvulnerability"] = await scanXSSvulnerability(content, file);
  results["redirectvulnerability"] = await scanRedirectvulnerability(content, file);
  results["sessionvulnerability"] = await scanSessionvulnerability(content, file, middlewares);
  results["sqlvulnerability"] = await scanSQLvulnerability(content, file);
  results["defaultwebpagevulnerability"] = await DefaultWebPage(routes, hostname);
  return results;
}
module.exports = {
  ScanAllContentAndroutes,
  checkDirectoryListing
};
