
const express = require('express');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const url = require("url");
const http = require("http");
const axios = require("axios");
const path=require("path")
const { errorHandler, consoleColorText, InjectionChecker, CreateuserDetails } = require('./helpers/functions');
const xmlparser = require("./express-xml-bodyparser");
const { baseUrl } = require('./config');
const emailRegex = /^\S+@\S+\.\S+$/; // Regular expression to match email addresses
const findEmail = (data) => {
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            const email = findEmail(data[i]);
            if (email) {
                return email; // Return the first valid email address found
            }
        }
    } else if (typeof data === "object" && data !== null) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const email = findEmail(data[key]);
                if (email) {
                    return email; // Return the first valid email address found
                }
            }
        }
    } else if (typeof data === "string" && emailRegex.test(data)) {
        return data; // Return the valid email address
    }

    return null; // Return null if no valid email address is found
};
// Create a rate limiter with a maximum of 5 requests per hour for the same email address
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Maximum 5 requests per windowMs
    handler: (req, res, next) => {
        const body = {
            ...req.body,
            // ...req.query,
            // ...req.params,
        };
        const email = findEmail(body);
        if (email) {
            // axios.post(`${baseUrl}/emailverify`, { email, appid: req.appid, ip: req.ip }).then((res) => res.data).catch((err) => err?.response?.data)
            consoleColorText(
                `Too many requests for the email address ${email}. Please try again later.`,
                "red"
            );
            res
                .status(429)
                .send(
                    "Too many requests for this email address. Please try again later."
                );
        } else {
            next();
        }
    },
});
// Function to check if directory listing is enabled

function checkDirectoryListingMiddleware(req, res, next) {
    // Get the requested URL
    const requestedUrl = url.parse(req.url);
    const requestedPath = path.join(__dirname, requestedUrl.pathname);
  
    // Check if directory listing is enabled by attempting to read the directory
    try {
      const directoryContents = fs.readdirSync(requestedPath);
      req.isDirectoryListingEnabled = true; // Directory listing is enabled if readdirSync does not throw an error
    } catch (error) {
      req.isDirectoryListingEnabled = false; // Directory listing is disabled if readdirSync throws an error
      console.log("isDirectoryListingEnabled",req.isDirectoryListingEnabled)
    }
  
    // Call the next middleware or route handler
    next();
  }
// Responde Code Checker
function responseCodeChecker(req, res) {
    const hostname = req.domain;
    const originalJson = res.json;
    const originalSend = res.send;
    var originalRender = res.render;
    let responseData = null;
    res.json = async function (body) {
        originalJson.call(res, body);
        responseData = body;
    };
    res.send = async function (body) {
        originalSend.call(res, body);
        responseData = body;
    };
    // Override the res.render function
    try {
        require.resolve("ejs");

        // EJS is installed, override the res.render function
        res.render = function (view, locals, callback) {
            originalRender && originalRender.call(res, view, locals, callback);
            // Remove the _locals property
            delete locals._locals;
            // Assign the modified locals object to responseData
            responseData = locals;
        };
    } catch (error) { 
        console.log(error)
    }
    res.on("finish", async function () {
        const existingCode = http.STATUS_CODES[res.statusCode];
        const parsedUrl = url.parse(req.url);
        const requestUrl = parsedUrl.pathname;
        try {
            responseData
                ? await axios
                    .post(`${baseUrl}/sensitivekeysandPasswordValidate`, {
                        responseData,
                        hostname: req.domain,
                        appid: req.appid,
                    })
                    .then((res) => res.data)
                    .catch((err) => err?.message)
                : null;
            req.query ? await axios
                .post(`${baseUrl}/sensitivekeysinurl`, {
                    data: req.query,
                    hostname: req.domain,
                    url: requestUrl,
                    appid: req.appid,
                })
                .then((res) => res.data)
                .catch((err) => err?.message) : null;
            // response codes
            const resoponsecodedata = existingCode
                ? {
                    code: res.statusCode,
                    phrase: existingCode,
                }
                : null;
            // call api
            const data = {
                hostname,
                resoponsecodedata,
            };
            await axios.post(`${baseUrl}/responsecodeavailableornot`, { data, hostname, url: requestUrl, appid: req.appid }).then((res) => res.data).catch((err) => err.message);

        } catch (error) {
            console.log(JSON.stringify(error.message));
        }
    });
}
const Middleware = async (req, res, next) => {
    try {
            try {
                responseCodeChecker(req, res);
                const reqPath = req.url.toLowerCase();
                const isreqPathfile = reqPath.endsWith(".js") || reqPath.endsWith(".htaccess") || reqPath.endsWith(".json") || reqPath.endsWith(".css") || reqPath.endsWith(".txt") || reqPath.endsWith(".md") || reqPath.endsWith(".yml") || reqPath.endsWith(".toml") || reqPath === "/app.js";
                const injectionFound = await InjectionChecker(req);
                console.log("injection found", injectionFound)
                if (isreqPathfile) {
                    CreateuserDetails(req, res, "Remote-FiLe-Inclusion-Detected", "Remote-FiLe-Inclusion");
                    return errorHandler(res, 406, "Not found");
                } else if (injectionFound.containCommand) {
                    CreateuserDetails(req, res, "Command Injection Detected", "cmd");
                    return errorHandler(res, 406, "Malicious code found");
                }
                else if (injectionFound.validateXss) {
                    CreateuserDetails(req, res, "XSS Injection Detected", "xss-injection");
                    return errorHandler(res, 406, "Malicious code found");
                }
                else if (injectionFound.validatehtml) {
                    CreateuserDetails(req, res, "HTML Injection Detected", "html");
                    return errorHandler(res, 406, "Malicious code found");
                }

                else if (injectionFound.containsSql) {
                    CreateuserDetails(req, res, "SQL Injection Detected", "SQLI");
                    return res.status(406).json("malicious code found");
                }
                next();
            } catch (error) {
                console.log(error)
                return errorHandler(res);
            }
      
    } catch (error) {
        console.log(error)
        return errorHandler(res, 500, "Internal server error");
    }
};
//End  Security Middleware
// controllers
const HostValidator = (app, sid, appid) => {
    return async (req, res, next) => {
        console.log("rin here")
        const allowedDomain = await Ialloweddomain(sid, appid);
        console.log({ allowedDomain })
        req.app = app;
        req.domain = sid;
        req.appid = appid;
        req.alloweddomain = allowedDomain;
        next();
    };
};
const Ialloweddomain = async (hostname, appid) => {
    try {
        const response = await axios.post(`${baseUrl}/alloweddomains?hostname=${hostname}&appid=${appid}&type=api`)
        console.log(response.status, "response", response.data)
        if (response.status == 200) {
            return { allowed: true };
        } else {
            return { allowed: false };
        }
    } catch (error) {
        if (error?.response?.status === 404) {
            console.log("error", error?.response?.data?.message)
            return { allowed: false };
        }
    }
};
// Call Middleware For Secure Your Application
function isExpressApplication(app) {
    return (
        app &&
        typeof app === "function" &&
        app.hasOwnProperty("use") &&
        app.hasOwnProperty("get")
    );
}

// Combined middleware function
const validateAndSetMiddleware = async (req, res, next) => {
    try {
        req.app.use(checkDirectoryListingMiddleware);
        req.app.use(cors(), express.json(), express.urlencoded({ extended: true }));
        req.app.use(xmlparser);
        req.app.use(Middleware);
        req.app.use(limiter);
        next()
        // Add other middleware logic here
    } catch (error) {
        console.log(error)
    }
};

module.exports = validateAndSetMiddleware

