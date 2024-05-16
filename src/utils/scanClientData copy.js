
const {
  sensitivedata,
} = require("../sensitive/availableapikeys");
const staticFolders = require("../data/json/staticFolders.json");
const MYSQLCSVDATA = require("../data/json/mysqldata.json");
const { chromium } = require('playwright');
const playwright = require('playwright');
const authenticatedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/account',
  '/orders',
  '/cart',
  '/checkout',
  '/billing',
  '/subscriptions',
  '/messages',
  '/notifications',
  '/admin',
  '/analytics',
  '/reports',
  '/projects',
  '/tasks',
  '/team',
  '/documents',
  '/files',
  '/uploads',
  '/downloads',
  '/bookmarks',
  '/favorites',
  '/galleries',
  '/playlists',
  '/campaigns',
  '/leads',
  '/contacts',
  '/calendar',
  '/appointments',
  '/schedule',
  '/timesheet',
  '/payroll',
  '/invoices',
  '/expenses',
  '/budgets',
  '/finance',
  '/tax',
  '/compliance',
  '/support',
  '/tickets',
  '/knowledgebase',
  '/forums',
  '/blogs',
  '/articles',
  '/comments',
  '/reviews',
  '/ratings',
  '/votes',
  '/polls',
  '/surveys',
  '/feedback',
  '/suggestions',
  '/ideas',
  '/roadmap',
  '/changelog',
  '/updates',
  '/releases',
  '/versions',
  '/contributors',
  '/members',
  '/followers',
  '/connections',
  '/friends',
  '/groups',
  '/communities',
  '/channels',
  '/streams',
  '/broadcasts',
  '/livestreams',
  '/webinars',
  '/workshops',
  '/courses',
  '/lessons',
  '/modules',
  '/quizzes',
  '/exams',
  '/certifications',
  '/badges',
  '/achievements',
  '/leaderboards',
  '/scorecards',
  '/metrics',
  '/insights',
  '/reports',
  '/audits',
  '/logs',
  '/monitoring',
  '/alerts',
  '/incidents',
  '/outages',
  '/maintenance',
  '/backups',
  '/restores',
  '/migrations',
  '/upgrades',
  '/installations',
  '/deployments',
  '/integrations',
  '/apis',
  '/webhooks',
  '/plugins',
  '/extensions',
  '/addons',
  '/customizations',
  '/preferences',
  '/configurations',
  '/settings',
  '/security',
  '/permissions',
  '/roles',
  '/access',
  '/authorization',
  '/authentication',
  '/sessions',
  '/passwords',
  '/reset',
  '/verify',
  '/activate',
  '/deactivate',
  '/suspend',
  '/terminate',
  '/delete',
  '/archive',
  '/restore',
  '/import',
  '/export',
  '/backup',
  '/migrate',
  '/transfer',
  '/convert',
  '/transform',
  '/translate',
  '/localize',
  '/internationalize'
];

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

async function scanSQLvulnerability(hostname, connection) {
  return new Promise(async (resolve, reject) => {
    const numRequests = MYSQLCSVDATA.length;
    const averageResponseTime = 0.5; // Assuming 0.5 seconds average response time per request in a batch
    const estimatedTime = numRequests * averageResponseTime;
    console.log(`Estimated time to complete: ${estimatedTime} seconds`);
    connection.emit('sql-injection-count', { count: numRequests, estimatedTime, message: `Total Number of SQL Injection Tests: ${numRequests}` });

    let count = 0;
    try {


      for (let batchIndex = 0; batchIndex < numRequests; batchIndex++) {
        try {
          let data = MYSQLCSVDATA[batchIndex];
          const response = await fetch(hostname, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          });

          count++;
          let percentageCompleted = ((count / numRequests) * 100).toFixed(2);
          percentageCompleted = Math.round(percentageCompleted)
          if (response.status === 200 || response.status === 201 || response.status === 202 || response.status === 204 || response.status === 304 || response.status === 404) {
            connection.emit('sql-injection', { count, percentageCompleted, message: `Sql Injection Detected with this query: ${data.Query}` });
          } else if (response.status > 400 && response.status < 500 && response.status !== 404) {
            // Handle client-side errors

            connection.emit('sql-injection', { percentageCompleted, count, message: `` });
          } else {
            // Handle other statuses if needed

            connection.emit('sql-injection', { percentageCompleted, count, message: `` });
          }

          // Calculate percentage completed


        } catch (error) {
          count++;
          let percentageCompleted = ((count / numRequests) * 100).toFixed(2);
          percentageCompleted = Math.round(percentageCompleted)
          connection.emit('sql-injection', { percentageCompleted, count, message: `` });
          console.error("Error occurred during request:", error);
        }
      }
      count++;

      connection.emit('sql-injection', { count: numRequests, percentageCompleted: 100, message: "Sql Injection Test Completed" });
      resolve({ message: "Sql Injection Test Completed" });
    } catch (error) {
      count++;
      connection.emit('sql-injection', { count, message: `` });
      reject(error);
    }
  });
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

async function scrapWebsite(event, url, socket, visited = new Set(), isFirstPage = true) {
  if (visited.has(url)) {
    return visited;
  }


  socket.emit(event, { message: `Scanning ${url}...` });
  visited.add(url);

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultNavigationTimeout(60000);

  // Navigate to the web application
  await page.goto(url);

  const uniqueLinks = new Set();
  const baseUrl = new URL(url);

  const hrefs = await page.$$eval('a[href]', links => links.map(link => link.getAttribute('href')));

  hrefs.forEach(href => {
    if (href && href.trim().length > 0) {

      const parsedUrl = new URL(href, baseUrl);
      if (parsedUrl.hostname === baseUrl.hostname && !(isFirstPage && parsedUrl.pathname === '/')) {
        if (!parsedUrl.href.includes("#") && !parsedUrl.href.includes("mailto") && !parsedUrl.href.includes("tel") && !parsedUrl.href.includes("javascript") && !parsedUrl.href.includes("pdf") && !parsedUrl.href.includes("jpg") && !parsedUrl.href.includes("png") && !parsedUrl.href.includes("jpeg") && !parsedUrl.href.includes("doc") && !parsedUrl.href.includes("docx") && !parsedUrl.href.includes("xls") && !parsedUrl.href.includes("xlsx") && !parsedUrl.href.includes("ppt") && !parsedUrl.href.includes("pptx") && !parsedUrl.href.includes("csv") && !parsedUrl.href.includes("xml") && !parsedUrl.href.includes("json") && !parsedUrl.href.includes("zip") && !parsedUrl.href.includes("rar") && !parsedUrl.href.includes("tar") && !parsedUrl.href.includes("gz") && !parsedUrl.href.includes("7z") && !parsedUrl.href.includes("mp3") && !parsedUrl.href.includes("mp4") && !parsedUrl.href.includes("avi") && !parsedUrl.href.includes("mov") && !parsedUrl.href.includes("wmv") && !parsedUrl.href.includes("flv") && !parsedUrl.href.includes("ogg") && !parsedUrl.href.includes("webm") && !parsedUrl.href.includes("wav") && !parsedUrl.href.includes("wma") && !parsedUrl.href.includes("aac") && !parsedUrl.href.includes("flac") && !parsedUrl.href.includes("alac") && !parsedUrl.href.includes("aiff") && !parsedUrl.href.includes("ape") && !parsedUrl.href.includes("m4a") && !parsedUrl.href.includes("mid") && !parsedUrl.href.includes("midi") && !parsedUrl.href.includes("amr") && !parsedUrl.href.includes("mka") && !parsedUrl.href.includes("opus") && !parsedUrl.href.includes("ra") && !parsedUrl.href.includes("rm") && !parsedUrl.href.includes("vqf") && !parsedUrl.href.includes("wv") && !parsedUrl.href.includes("webp") && !parsedUrl.href.includes("svg") && !parsedUrl.href.includes("gif") && !parsedUrl.href.includes("bmp") && !parsedUrl.href.includes("ico") && !parsedUrl.href.includes("tiff") && !parsedUrl.href.includes("psd") && !parsedUrl.href.includes("eps") && !parsedUrl.href.includes("ai") && !parsedUrl.href.includes("indd") && !parsedUrl.href.includes("raw") && !parsedUrl.href.includes("cr2") && !parsedUrl.href.includes("nef") && !parsedUrl.href.includes("orf") && !parsedUrl.href.includes("sr2") && !parsedUrl.href.includes("pef") && !parsedUrl.href.includes("dng") && !parsedUrl.href.includes("x3f") && !parsedUrl.href.includes("arw") && !parsedUrl.href.includes("rw2") && !parsedUrl.href.includes("rwl")

        ) {
          uniqueLinks.add(parsedUrl.href);
        }
      }
    }
  });

  await browser.close();


  // Recursively scrap each unique link
  for (const link of uniqueLinks) {
    if (!link.includes("#") && !link.includes("mailto") && !link.includes("tel") && !link.includes("javascript") && !link.includes("pdf") && !link.includes("jpg") && !link.includes("png") && !link.includes("jpeg") && !link.includes("doc") && !link.includes("docx") && !link.includes("xls") && !link.includes("xlsx") && !link.includes("ppt") && !link.includes("pptx") && !link.includes("csv") && !link.includes("xml") && !link.includes("json") && !link.includes("zip") && !link.includes("rar") && !link.includes("tar") && !link.includes("gz") && !link.includes("7z") && !link.includes("mp3") && !link.includes("mp4") && !link.includes("avi") && !link.includes("mov") && !link.includes("wmv") && !link.includes("flv") && !link.includes("ogg") && !link.includes("webm") && !link.includes("wav") && !link.includes("wma") && !link.includes("aac") && !link.includes("flac") && !link.includes("alac") && !link.includes("aiff") && !link.includes("ape") && !link.includes("m4a") && !link.includes("mid") && !link.includes("midi") && !link.includes("amr") && !link.includes("mka") && !link.includes("opus") && !link.includes("ra") && !link.includes("rm") && !link.includes("vqf") && !link.includes("wv") && !link.includes("webp") && !link.includes("svg") && !link.includes("gif") && !link.includes("bmp") && !link.includes("ico") && !link.includes("tiff") && !link.includes("psd") && !link.includes("eps") && !link.includes("ai") && !link.includes("indd") && !link.includes("raw") && !link.includes("cr2") && !link.includes("nef") && !link.includes("orf") && !link.includes("sr2") && !link.includes("pef") && !link.includes("dng") && !link.includes("x3f") && !link.includes("arw") && !link.includes("rw2") && !link.includes("rwl")) {
      await scrapWebsite(event, link, socket, visited, false);
    }

  }

  return visited;
}
const scanNonHTMLContentAccessibility = async (url, connection) => {
  try {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    let isRedirected = false;
    // List of URLs to test


    // Open a new page for each URL
    const page = await context.newPage();
    let navigationSuccessful = false;
    let attempts = 0;

    while (!navigationSuccessful && attempts < 3) {
      try {
        if (authenticatedRoutes.some(route => url.includes(route))) {
          // Navigate to the page
          await page.goto(url, { timeout: 60000 }); // Increase the timeout to 60 seconds

          // Wait for the page to load completely
          await page.waitForLoadState('networkidle', { timeout: 60000 }); // Increase the timeout to 60 seconds

          // Get the final URL after any redirects
          const finalUrl = page.url();

          if (finalUrl === url) {
            console.log(`Page "${url}" is not redirected.`);

            // Check for any form
            const hasForm = await page.$('form') !== null;
            // Check for any element with a class name containing "modal"
            const hasModalClass = await page.evaluate(() => {
              return Array.from(document.querySelectorAll('*')).some(element => 
                element.className && element.className.toLowerCase().includes('modal')
              );
            });
  
            if (hasForm) {
              console.log(`Form found on page "${url}".`);
              connection.emit('non-html-content-accessibility', { message: `Page "${url}" has a form.`, time: Date.now() });
            } else {
              console.log(`No form found on page "${url}".`);
              connection.emit('non-html-content-accessibility', { message: `Page "${url}" does not have a form.`, time: Date.now() });
            }
  
            if (hasModalClass) {
              console.log(`Element with class containing "modal" found on page "${url}".`);
              connection.emit('non-html-content-accessibility', { message: `Page "${url}" has an element with a class containing "modal".`, time: Date.now() });
            } else {
              console.log(`No element with class containing "modal" found on page "${url}".`);
              connection.emit('non-html-content-accessibility', { message: `Page "${url}" does not have an element with a class containing "modal".`, time: Date.now() });
            }
          } else {
            isRedirected = true;
            connection.emit('non-html-content-accessibility', { message: `Page "${url}" is  Protected`, time: Date.now() });
          }

          navigationSuccessful = true;
        }else{
          connection.emit('non-html-content-accessibility', { message: `Page "${url}" is not found for scan`, time: Date.now() });
        }

      } catch (error) {
        console.error(`Error occurred while testing page "${url}":`, error);
        attempts++;
      }
    }

    if (!navigationSuccessful) {
      connection.emit('non-html-content-accessibility', { message: `Failed to navigate to page "${url}" after multiple attempts.`, time: Date.now() });
    }

    // Close the page
    await page.close();


    // Close the browser
    await browser.close();
  } catch (error) {
    console.log('Error:', error);
    connection.emit('non-html-content-accessibility', { message: error.message || "Error occurred while testing non-HTML content accessibility", time: Date.now() });
  }
}
const checkNonHTMLContentAccessibility = async (websiteUrl, socket) => {
  try {
    const visitedLinks = await scrapWebsite("'non-html-content-accessibility'", websiteUrl, socket);
    let links = await Array.from(visitedLinks);
    console.log('Visited links:', visitedLinks);

    links.forEach(async link => {
      await scanNonHTMLContentAccessibility(link, socket).catch(error => console.error(error))
      // if (link.includes("account") || link.includes("login") || link.includes("signin") || link.includes("signup"
      // ) || link.includes("user") || link.includes("session") || link.includes("token") || link.includes("password") || link.includes("forgot") || link.includes("reset") || link.includes("verify") || link.includes("confirm") || link.includes("authorize") || link.includes("credentials") || link.includes("auth") || link.includes("authentication")) {
      //   await scanNonHTMLContentAccessibility(link, socket).catch(error => console.error(error));
      // } else {
      //   socket.emit('non-html-content-accessibility', { message: `Protecte Page not found`, time: Date.now() });
      // }
    }
    )

  } catch (error) {
    console.log("error", error)
  }
}

// Example usage

// Example usage




module.exports = {
  scanDirectoryOptionMethod, scanSessionvulnerability, checkNonHTMLContentAccessibility,
  ScanDangerousMethods, getLatestNodeVersion, ScanArbitaryMethods, scanHardCodedData, scanRedirectvulnerability, scanSQLvulnerability, get403ErrorMessage, getHttpErrorMessages, getLoginErrorMessages
};
