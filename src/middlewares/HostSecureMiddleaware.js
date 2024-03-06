try {
    const express = require("express");
    const rateLimit = require("express-rate-limit");
    const url = require("url");
    const http = require("http");
    const axios = require("axios");
    const xmlparser = require("express-xml-bodyparser");
    const { HttpParameterpollutionchecker, consoleColorText } = require("./helpers/httpparameterpollution");
    const { useCustomFetch, InjectionChecker } = require("./helpers/functions");

    // const baseUrl="https://securitytool.handsintechnology.in/api/client"
    const baseUrl = "http://localhost:20000/api/client";
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
                ...req.query,
                ...req.params,
            };
            const email = findEmail(body);
            if (email) {
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
    // XSS Injection Function
    // Create Blacklistusers details function
    const CreateuserDetails = async (req, res, message, type) => {
        res.on("finish", async () => {
            try {
                message = "malacios";
                var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
                var ip = "206.84.234.39";
                const month = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ];
                const d = new Date();

                const useragent = req.headers["user-agent"];
                // // const result = detector.detect(useragent);
                // // const { client, os, device } = result

                const UserRawData = {
                    ip,
                    date: d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear(),
                    time: d.toLocaleTimeString(),
                    page: req.url,
                    query: req.query || req.query || "",
                    inputQuery: req.body || "",
                    type,
                    // country: country || "",
                    // city: city || "",
                    // region: region || "",
                    useragent,
                    latitude: "",
                    longitude: "",
                    domain: req.get("host"),
                    referurl:
                        req.protocol + "://" + req.get("host") + req.originalUrl || "",
                };
                await axios
                    .post(`${baseUrl}/createuserdetails`, {
                        type,
                        hostname: req.domain,
                        appid: req.appid,
                        ip,
                        UserRawData,
                    })
                    .then((res) => res.data)
                    .catch((err) => err?.response?.data);
            } catch (error) {
                console.log("eror in malacius data create ", error);
            }
        });
    };
    const checkForSensitiveInfoInBodyAndPasswordValidate = (currentData, req) => {
        (async () => {
            try {
                await axios
                    .post(`${baseUrl}/sensitivekeysandPasswordValidate`, {
                        currentData,
                        hostname: req.domain,
                        appid: req.appid,
                    })
                    .then((res) => res.data)
                    .catch((err) => err?.response?.data);
            } catch (error) {
                console.log(JSON.stringify(error.message));
            }
        })();
    };

    function checkForSensitiveInfoInUrl(req, requestUrl) {
        (async () => {
            try {
                const api1 = await axios
                    .post(`${baseUrl}/sensitivekeysinurl`, {
                        data: req.query,
                        hostname: req.domain,
                        url: requestUrl,
                        appid: req.appid,
                    })
                    .then((res) => res.data)
                    .catch((err) => err?.response?.data);
            } catch (error) {
                console.log(JSON.stringify(error.message));
            }
        })();
    }
    function sendResponseCodedetails(data, hostname, requestUrl, req) {
        (async () => {
            try {
                const res = await axios.post(`${baseUrl}/responsecodeavailableornot`, { data, hostname, url: requestUrl, appid: req.appid })
            } catch (error) {
                console.log(error)
            }
        })();
    }
    const SendEmail = (emailid, hostname, requestUrl, req) => {
        (async () => {
            try {
                const res = await axios.post(`${baseUrl}/emailverify`, { emailid, hostname, url: requestUrl, appid: req.appid })
            } catch (error) {
                console.log(error)
            }
        })();
    };
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
        } catch (error) { }
        res.on("finish", async function () {
            const existingCode = http.STATUS_CODES[res.statusCode];
            const parsedUrl = url.parse(req.url);
            const requestUrl = parsedUrl.pathname;
            try {
                const body = {
                    ...req.body,
                    ...req.query,
                    ...req.params,
                };
                const emailid = findEmail(body);
                emailid ? SendEmail(emailid, hostname, requestUrl, req) : null;
                responseData
                    ? checkForSensitiveInfoInBodyAndPasswordValidate(responseData, req)
                    : null;
                req.query ? checkForSensitiveInfoInUrl(req, requestUrl) : null;
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
                sendResponseCodedetails(data, hostname, requestUrl, req);
            } catch (error) { }
        });
    }
    const Middleware = async (req, res, next) => {
        try {
            if (req.alloweddomain.allowed) {
                try {
                    // Call the helmet middleware and pass the req, res, and a callback function
                    // Rest of your middleware code
                    responseCodeChecker(req, res);
                    const reqPath = req.url.toLowerCase();
                    const isreqPathfile =
                        reqPath.endsWith(".js") ||
                        reqPath.endsWith(".htaccess") ||
                        reqPath.endsWith(".json") ||
                        reqPath.endsWith(".css") ||
                        reqPath.endsWith(".txt") ||
                        reqPath.endsWith(".md") ||
                        reqPath.endsWith(".yml") ||
                        reqPath.endsWith(".toml") ||
                        reqPath === "/app.js";
                    const injectionFound = await InjectionChecker(req);
                    if (isreqPathfile) {
                        CreateuserDetails(
                            req,
                            res,
                            "Remote-FiLe-Inclusion-Detected",
                            "Remote-FiLe-Inclusion"
                        );
                        return errorHandler(res, 406, "Not found");
                    } else if (injectionFound.containCommand) {
                        CreateuserDetails(req, res, "Command Injection Detected", "cmd");
                        return errorHandler(res, 406, "Malicious code found");
                    } else if (injectionFound.validateXss) {
                        CreateuserDetails(
                            req,
                            res,
                            "XSS Injection Detected",
                            "xss-injection"
                        );
                        return errorHandler(res, 406, "Malicious code found");
                    } else if (injectionFound.validatehtml) {
                        CreateuserDetails(
                            req,
                            res,
                            "HTML Injection Detected",
                            "html"
                        );
                    } else if (injectionFound.containsSql) {
                        CreateuserDetails(req, res, "SQL Injection Detected", "SQLI");
                        return res.status(406).json("malicious code found");
                    }
                    next();
                } catch (error) {
                    return errorHandler(res);
                }
            } else {
                consoleColorText(
                    "Your domain is not allowed to fetch live status of injections",
                    "red"
                );
                next();
            }
        } catch (error) {
            console.log(error);
        }
    };
    //End  Security


    // end GetAllData
    // controllers

    const HostValidator = (app, sid, appid) => {
        return async (req, res, next) => {
            const allowedDomain = await Ialloweddomain(sid, appid);
            req.app = app;
            req.domain = sid;
            req.appid = appid;
            req.alloweddomain = allowedDomain;
            next();
        };
    };
    const Ialloweddomain = async (hostname, appid) => {
        try {
            const response = await useCustomFetch(
                `${baseUrl}/alloweddomains?sid=${hostname}&appid=${appid}`
            );
            console.log({ alloweddomains: response })
            if (response.status === 200) {
                return { allowed: true };
            } else {
                return { allowed: false };
            }
        } catch (error) {
            if (error) {
                console.log(error)
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



    const CallData = async (sid, appid) => {
        const allowedDomain = await Ialloweddomain(sid, appid);
        if (allowedDomain.allowed) {
            await axios
                .get(`http://${sid}:5000/sitescanner?sid=${sid}&id=1&id=4`)
                .then((res) => res?.data)
                .catch((err) => err?.response?.data);
            // await axios
            //   .get(`http://${sid}/sitescanner?sid=${sid}&id=1&id=4`)
            //   .then((res) => res?.data)
            //   .catch((err) => err?.response?.data);

        } else {
            consoleColorText("Please provide a valid Domain name", "red");
        }
    };

    const xmlPrevent = (err, req, res, next) => {
        const contentType = req.headers["content-type"];
        if (contentType && contentType.includes("application/xml")) {
            const errorMessage = err.message;
            CreateuserDetails(req, res, "Malicious code request", "XML-Injection");
            res.status(400).json(errorMessage);
        }
    };
    module.exports =
        async (app, sid, appid) => {
            try {
                if (!isExpressApplication(app)) {
                    consoleColorText("Please provide a valid Express application", "red");
                }
                else if (!sid) {
                    consoleColorText("Please provide a valid hostname", "red");
                }
                else if (app && sid) {
                    app.use(
                        express.json(),
                        express.urlencoded({ extended: true }),
                        xmlparser(),
                    );
                    // Error handler middleware
                    app.use(HostValidator(app, sid, appid));
                    app.use(xmlPrevent);
                    app.use(limiter);
                    app.use(Middleware);
                }
            } catch (error) {
                console.log(error);
                consoleColorText(error.message, "red");
            }
        };

} catch (error) {
    console.log(error);
}