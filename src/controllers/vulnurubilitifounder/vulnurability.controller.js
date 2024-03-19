
const axios = require('axios');
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 }); // Cache with a TTL of 60 seconds
const url = require('url')
const mongoose = require("mongoose");
const { ScanAllContentAndroutes, checkDirectoryListing } = require("../../utils/scanClientData");
const { CallEmailVerify, checkDomainAvailability, hashttpParametersPollutionavailable, Nodeversion } = require("../../utilities/functions/functions");
const { Project_Security_Logs } = require("../../models/Project_Security_Logs");
const { PasswordKeyModel } = require("../../models/PasswordKeysModel");
const { CrticalInformationInurl, EmailVerifyModel, } = require("../../models/sensitivekeywordsModel");
const { isHashedPassword, checkForSensitiveInfoInBody, CheckPasswordKeyText, CreatStatusCodesDetails, } = require("../../utils/functions");
const { sensitivedata, passwordkeys, } = require("../../sensitive/availableapikeys");
const { ClientLoagsModel } = require("../../models/ClientLoagsModel");
const { SSLverifier } = require("../../utils/Downtimemonitor");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");
const User = require("../../models/User");
const { NodeVersionModel } = require("../../models/NodeVersionModel");
const { PasswordValidateModel } = require('../../models/PasswordVaildateModel');
const SensitiveInfoInBodyModel = require('../../models/SensitiveInfoInBodyModel');
const { sessionvunurability } = require('../../utils/sessionvalidationclient');

module.exports = {
    httpparameterpollution: async (req, res) => {
        try {
            let data = {}
            console.log("yurlreq>>>>>>", req.query.url)
            await axios.get(req.query.url + "/sitescanner?id=1&id=5").then(async (response) => {
                //check iframe injection is possible or not in this app
                console.log(response.headers)
                if (response.headers) {

                    if (response.headers["content-security-policy"] && response.headers["x-frame-options"] === "DENY" || response.headers["x-frame-options"] === "SAMEORIGIN") {
                        data["xframe"] = "No"
                    }
                    else if (!response.headers["content-security-policy"] && response.headers["x-frame-options"] !== "SAMEORIGIN" || response.headers["x-frame-options"] !== "DENY") {
                        data["xframe"] = "Yes"
                    }
                }
                if (response.data) {
                    console.log("httpparameter", response.data)
                    if (response.data) {
                        let d = await hashttpParametersPollutionavailable(response.data)
                        return sendResponse(res, 200, d, data)
                    }
                }
            }).catch((error) => {
                console.log(error?.response?.headers)
                if (error.response && error.response.headers) {

                    if (error.response.headers["content-security-policy"] && error.response.headers["x-frame-options"] === "DENY" || error.response.headers["x-frame-options"] === "SAMEORIGIN") {
                        data["xframe"] = "No"
                    }
                    else if (!error.response.headers["content-security-policy"] && error.response.headers["x-frame-options"] !== "SAMEORIGIN" || error.response.headers["x-frame-options"] !== "DENY") {
                        data["xframe"] = "Yes"
                    }



                }
                return sendResponse(res, 200, "Something is Wrong", data)
            })


        }
        catch (error) {
            console.error("Error retrieving allowed domains:", error.message);
            return errorHandler(res, 500, error.message)
        }
    },
    sslverify: async (req, res) => {
        try {
            const hostname = req.query.hostname
            if (hostname) {
                // console.log("get hostname", hostname)
                const data = await SSLverifier(hostname)
                // console.log("get data", data)
                return sendResponse(res, 200, "fetch ssl ", data)
            } else {
                return sendResponse(res, 200, "Hostname is required", {})
            }
            // Example usage
        } catch (error) {
            console.error("Error retrieving allowed domains:", error.message);
            return errorHandler(res, 500, error.message)
        }
    },
    alloweddomains: async (req, res) => {
        try {

            if (req.query.hostname && req.query.appid) {
                const alloweddomains = await User.findOne({ domain: { $in: [req.query.hostname] }, appid: req.query.appid }).select("_id")
                if (alloweddomains) {
                    return sendResponse(res, 200, "fetch", { allowed: true })
                } else {
                    return errorHandler(res, 404, "please enter valid details", { allowed: false })
                }
            } else {
                const appid = req.body.appid;
                const application = req.body.application
                const hostname = req.body.hostname
                // const params = req.body.params
                const nodejsveresion = req.body.nodejsveresion
                const fileContent = req.body.fileContent
                console.log("fileContent", fileContent)
                const routes = application
                console.log("application", application)
                const middlewares = application?.filter((layer) => layer.name !== "router" &&
                    layer.name !== "bound dispatch" &&
                    layer.name !== "jsonParser" &&
                    layer.name !== "<anonymous>" &&
                    layer.name !== "urlencodedParser" &&
                    layer.name !== "expressInit" &&
                    layer.name !== "query" &&
                    layer.name !== "Middleware")?.map((layer) => layer.name) || [];
                // Person is verified, proceed to serve the file

                const alloweddomains = await User.findOne(
                    { domain: { $in: [hostname] }, appid },
                    { password: 0, createdAt: 0, updatedAt: 0 }
                ).lean();
                if (alloweddomains) {
                    const logs = async () => {
                        return new Promise((resolve, reject) => {
                            try {
                                let resultarray = []

                                fileContent.map(async (file) => {
                                    // scan  hard coded data 
                                    await ScanAllContentAndroutes(file.content, file.name, routes, middlewares, appid).then((data) => {

                                        if (data.sessionvulnerability) {
                                            resultarray.push(data.sessionvulnerability)
                                        }
                                        resolve({ ...data, sessionvulnerability: resultarray })
                                    }).catch((error) => {
                                        console.log("error", error)
                                        reject(error)
                                    })

                                })
                            } catch (error) {
                                reject(error)
                            }
                        })
                    }
                    const alllogs = await logs().then((data) => {
                        let sessionvulnerability = {
                            jsonwebtoken: false,
                            session: false,
                            session_hijacking: false,
                            session_timeout: "",
                            secure_transmission: false,
                            session_close_on_browser_close: false,

                        };
                        if (data.sessionvulnerability) {
                            let jsonwebtoken = data.sessionvulnerability.find((v) => v.jsonwebtoken == true)
                            let session = data.sessionvulnerability.find((v) => v.session == true)
                            let session_hijacking = data.sessionvulnerability.find((v) => v.session_hijacking == true)
                            let secure_transmission = data.sessionvulnerability.find((v) => v.secure_transmission == true)
                            let session_close_on_browser_close = data.sessionvulnerability.find((v) => v.session_close_on_browser_close == true)
                            let session_timeout = data.sessionvulnerability.find((v) => v.session_timeout !== "")
                            sessionvulnerability["Session does not expire on closing the browser"] = session_close_on_browser_close ? "Yes" : "No"
                            sessionvulnerability["Session time-out is high (or) not implemented."] = session_timeout ? session_timeout : "No"
                            sessionvulnerability["Session token being passed in other areas apart from cookies"] = jsonwebtoken ? "Yes" : "No"
                            sessionvulnerability["An adversary can hijack user sessions by session fixation"] = session_hijacking ? "Yes" : "No"
                            sessionvulnerability["Session is not secure (or) not implemented."] = secure_transmission ? "Yes" : "No"
                            sessionvulnerability["Application is vulnerable to session hijacking attack"] = session_hijacking ? "Yes" : "No"
                            sessionvulnerability["Can session puzzling be used to bypass authentication or authorization?"] = session_hijacking ? "Yes" : "No"
                            delete sessionvulnerability.jsonwebtoken
                            delete sessionvulnerability.session
                            delete sessionvulnerability.session_hijacking
                            delete sessionvulnerability.secure_transmission
                            delete sessionvulnerability.session_close_on_browser_close
                            delete sessionvulnerability.session_timeout
                            data.sessionvulnerability = sessionvulnerability


                        }
                        return data
                    }).catch((error) => {
                        return { error: error }
                    })

                    console.log("alllogs", alllogs)
                    let auditReport = {}
                    if (req.body.auditReport) {
                        auditReport = req.body.auditReport
                    }
                    console.log("auditReport", auditReport)

                    // Create Logs 

                    let existUser = await ClientLoagsModel.aggregate([
                        {
                            $match: {
                                user: mongoose.Types.ObjectId(alloweddomains._id),
                                hostname: hostname,


                            }
                        },
                        {
                            $project: {
                                "_id": 1
                            }
                        }
                    ])
                    if (existUser.length > 0) {
                        await ClientLoagsModel.findOneAndUpdate({ user: mongoose.Types.ObjectId(alloweddomains._id), hostname: hostname }, { $set: { LogsData: alllogs, auditReport } }, { new: true, upsert: true })

                    } else {
                        await ClientLoagsModel.create({ user: mongoose.Types.ObjectId(alloweddomains._id), hostname: hostname, LogsData: alllogs, auditReport })
                    }
                    // end of logs
                    return res.status(200).json(alloweddomains);
                } else {
                    return res.status(404).json("please enter valid details");
                }
            }

        } catch (error) {
            console.error("Error retrieving allowed domains:", error);
            return res.status(500).json("Internal server error");
        }
    },
    createuserdetails: async (req, res) => {
        try {
            let { UserRawData, appid } = req.body;
            // ip = "206.84.234.30"
            console.log("ip checker", UserRawData.ip)
            const update = UserRawData;
            const alloweddomains = await User.findOne(
                { appid },
                { password: 0, createdAt: 0, updatedAt: 0 }
            ).lean();
            if (alloweddomains) {
                const finduser = await Project_Security_Logs.findOne({ user: mongoose.Types.ObjectId(alloweddomains._id), ip: UserRawData.ip });

                if (finduser) {
                    // Update existing element in the array
                    await Project_Security_Logs.findOneAndUpdate(
                        { user: mongoose.Types.ObjectId(alloweddomains._id), 'ip': UserRawData.ip },
                        { $set: update, },
                    );
                } else {
                    // Add a new element to the array
                    let d = await Project_Security_Logs.create(
                        {
                            user: mongoose.Types.ObjectId(alloweddomains._id),
                            ...update,
                        }

                    );
                    console.log({ d })
                }


            } else {
                res.status(403).json("you are not allowed");
            }
        } catch (error) {
            console.log("createuserdetails", error)

        }
        //  return  res.status(200).json("Ok")
    },
    responsecodeavailableornot: async (req, res) => {
        try {
            let { data, hostname, url, appid } = req.body;
            const alloweddomains = await User.findOne(
                { appid },
                { password: 0, createdAt: 0, updatedAt: 0 }
            ).lean();
            if (alloweddomains) {
                if (data.resoponsecodedata.code) {
                    await CreatStatusCodesDetails(
                        data.resoponsecodedata.code,
                        data.resoponsecodedata.phrase,
                        url,
                        hostname,
                        id = alloweddomains._id
                    );
                }
                sendResponse(res, 200, "fetch", "ok")
            } else {
                errorHandler(res, 403, "you are not allowed");
            }
        } catch (error) {
            errorHandler(res, 500, error.message)
        }
    },
    emailverify: async (req, res) => {
        try {
            let { email, hostname, appid, ip } = req.body;
            const EmailExist = await EmailVerifyModel.findOne({ ip: ip, appid, email });
            if (EmailExist) {

                return sendResponse(res, 200, "fetch", EmailExist)
            }

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    passwordkeys: async (req, res) => {
        try {
            const data = await PasswordKeyModel.find(
                {},
                { passwordkey: 1, exist: true }
            );
            const values = data.map((v) => v.passwordkey);
            return res.status(200).json({ passwordkeys: values });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    sensitivekeysandPasswordValidate: async (req, res) => {
        try {
            var { hostname, currentData, appid } = req.body;
            const alloweddomains = await User.findOne(
                { appid },
                { password: 0, createdAt: 0, updatedAt: 0 }
            ).lean();
            if (alloweddomains) {
                const sensitivedatainbody = await checkForSensitiveInfoInBody(
                    currentData,
                    sensitivedata
                );
                const password = await CheckPasswordKeyText(currentData, passwordkeys);
                if (password) {
                    const HashedPassword = await isHashedPassword(password);
                    const existingMessage = await PasswordValidateModel.findOne({
                        user: mongoose.Types.ObjectId(alloweddomains._id),
                        hostname,
                    });
                    if (existingMessage) {
                        // console.log("Found existing HashedPassword in Db");
                        await PasswordValidateModel.findOneAndUpdate(
                            { user: mongoose.Types.ObjectId(alloweddomains._id), hostname },
                            { HashedPassword: HashedPassword.message }
                        );
                    } else {
                        // console.log("Create New HashedPassword in Db");
                        await PasswordValidateModel.create({
                            _id: alloweddomains._id,
                            hostname: hostname,
                            HashedPassword: HashedPassword.message,
                        });
                    }
                }
                if (sensitivedatainbody) {
                    const existingMessage = await SensitiveInfoInBodyModel.findOne(
                        { user: mongoose.Types.ObjectId(alloweddomains._id), hostname, sensitivekeys: sensitivedatainbody },
                        { exist: true }
                    );
                    if (existingMessage) {
                        // Handle matching hostname and sensitive key
                        // console.log("Found existing sensitivedata in body");
                    } else {
                        // console.log("Create New sensitivedata in body");
                        await SensitiveInfoInBodyModel.create({
                            user: mongoose.Types.ObjectId(alloweddomains._id),
                            hostname,
                            sensitivekeys: sensitivedatainbody,
                        });
                        // Return success response for creating new data
                        res.status(200).json({ succes: true });
                    }
                } else {
                    res.status(200).json({ sucess: true });
                }
            } else {
                res.status(403).json("you are not allowed");
            }
        } catch (error) {
            // console.log("sensitive error", error);
        }
    },
    sensitivekeysinurl: async (req, res) => {
        try {
            // console.log(req.body)
            let { data, url, hostname, appid } = req.body;

            const alloweddomains = await User.findOne(
                { appid },
                { password: 0, createdAt: 0, updatedAt: 0 }
            ).lean();
            if (alloweddomains) {
                const sensitivekey = await checkForSensitiveInfoInBody(
                    data,
                    sensitivedata
                );
                if (sensitivekey) {
                    const existingMessage = await CrticalInformationInurl.findOne(
                        {
                            user: mongoose.Types.ObjectId(alloweddomains._id),
                            hostname,
                            sensitivekeys: sensitivekey,
                        },
                        { _id: 0 }
                    );
                    // console.log({ existingMessage });
                    if (existingMessage) {
                        // console.log("Found existing sensitive key in URL");
                    } else {
                        // console.log("Creating new sensitive key in URL");
                        const d = await CrticalInformationInurl.create({
                            user: alloweddomains._id,
                            hostname,
                            url,
                            sensitivekeys: sensitivekey,
                        });
                        // console.log(d);
                        // Return success response for creating new data
                        return res.status(201).json({ success: true });
                    }
                } else {
                    // Return response indicating that no sensitive key was found
                    return res.status(200).json({ sensitivekey: false });
                }
            } else {
                res.status(403).json("you are not allowed");
            }
            //
        } catch (error) {
            // console.log({ sensitivekeysinurlerror: error });
            // Handle the error routerropriately
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    addlogsdata: async (req, res) => {
        try {
            const { logs, sid, appid } = req.body;
            const alloweddomains = await User.findOne(
                { appid },
                { password: 0, createdAt: 0, updatedAt: 0 }
            ).lean();
            if (alloweddomains) {
                const finduser = await ClientLoagsModel.findOne({ user: mongoose.Types.ObjectId(alloweddomains._id), hostname: sid });
                // console.log({ ClientLoagsModel: finduser })
                if (finduser) {
                    const updatedata = await ClientLoagsModel.findOneAndUpdate(
                        { user: mongoose.Types.ObjectId(alloweddomains._id), hostname: sid },
                        { LogsData: logs }
                    );
                    res.json(updatedata);
                } else if (!finduser) {
                    const newdata = await ClientLoagsModel.create({
                        user: mongoose.Types.ObjectId(alloweddomains._id),
                        LogsData: logs,
                        hostname: sid,
                    });
                    res.json(newdata);
                }
            } else {
                res.status(403).json("you are not allowed");
            }
        } catch (error) {
            // console.log
        }
    },
    logsdata: async (req, res) => {
        try {
            const { sid, appid, } = req.query;
            function deleteDuplicate(a) { a = a.toString().replace(/ /g, ","); a = a.replace(/[ ]/g, "").split(","); for (var b = [], c = 0; c < a.length; c++)-1 == b.indexOf(a[c]) && b.push(a[c]); b = b.join(", "); return b = b.replace(/,/g, " ") };
            const results = []
            const alloweddomains = await User.findOne(
                { appid },
                { password: 0, createdAt: 0, updatedAt: 0 }
            ).lean();
            if (alloweddomains) {
                const finduser = await ClientLoagsModel.findOne({ user: mongoose.Types.ObjectId(alloweddomains._id), hostname: sid });
                if (finduser) {
                    var passwordHashing = ""
                    var xss = ""
                    var sql = ""
                    var session = ""
                    var dwp = ""
                    var redirect = ""
                    var OptionMethod = ""
                    var DangerousMethods = ""
                    var npmvulnurabilties = ""
                    var LogsData = finduser.LogsData;
                    console.log("LogsData", LogsData)
                    LogsData.map((k, v) => {

                        if (Object.keys(k).includes('npmvulnurabilties')) {
                            for (value of Object.values(k)) {
                                npmvulnurabilties += value.toString()
                            }
                        }
                        if (Object.keys(k).includes('DangerousMethods')) {
                            for (value of Object.values(k)) {
                                if (value === null) {
                                    DangerousMethods = "Dangerous Methods are  not enable"
                                } else {
                                    DangerousMethods = value.toString()
                                }
                            }
                        }
                        if (Object.keys(k).includes('OptionMethod')) {
                            for (value of Object.values(k)) {
                                if (value === null) {
                                    OptionMethod = "Option Method is not enable"
                                } else {
                                    OptionMethod = value.toString()
                                }


                            }
                        }
                        if (Object.keys(k).includes('PasswordHashing')) {
                            for (value of Object.values(k)) {

                                passwordHashing += value.toString()
                            }
                        } else {
                            passwordHashing = "password text not store in hash format"
                        }
                        if (Object.keys(k).includes('xss')) {
                            for (value of Object.values(k)) {
                                xss += value.toString()
                            }
                        }
                        if (Object.keys(k).includes('sql')) {
                            let sessionvalue = Object.values(k)[0]
                            if (sessionvalue.toString() == "Mysql Not Found") {
                                sql += sessionvalue.toString() + ",";
                            } else {
                                sql += sessionvalue.toString()
                            }
                        }
                        if (Object.keys(k).includes('redirect')) {
                            for (value of Object.values(k)) {
                                if (value.length < 1) {
                                    redirect += "Redirect vunurbilities not found" + ","
                                } else {
                                    redirect += value.toString()
                                }
                            }
                        }
                        if (Object.keys(k).includes('session')) {
                            let sessionvalue = Object.values(k)[0]
                            if (Object.values(k)[0].length > 1) {
                                session += sessionvalue.toString() + ","
                            } else {
                                session += sessionvalue.toString() + ","
                            }

                        }
                        if (Object.keys(k).includes('dwp')) {
                            for (value of Object.values(k)) {
                                dwp += value.toString()
                            }
                        }
                        // // console.log(Object.keys(k))
                    })
                    sql = deleteDuplicate(sql)
                    session = deleteDuplicate(session)
                    redirect = deleteDuplicate(redirect)
                    const data = {
                        passwordHashing,
                        xss,
                        sql,
                        session,
                        dwp,
                        redirect,
                        OptionMethod,
                        DangerousMethods,
                        npmvulnurabilties
                    }
                    res.status(200).json(data);
                } else if (!finduser) {
                    res.status(404).json("not found");
                }
            } else {
                res.status(403).json("you are not allowed");
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    sessionstoragedata: async (req, res) => {
        try {
            const { filteredRequests, localStorageData, sessionStorageData } = req.body
            if (filteredRequests) {
                const d = filteredRequests.forEach(async (x) => {
                    if (x.response.startsWith("{")) {
                        if (x.url == 'http://localhost:8080/api/security/test/sensitiveinfoinurl') {
                            return
                        } else {
                            const responsedata = JSON.parse(x.response)
                            const sensitivekey = await checkForSensitiveInfoInBody(
                                responsedata,
                                sensitivedata
                            );
                            if (sensitivekey) {
                                return { sensitivekey, res: x.response }
                            }
                        }

                    }
                })
                Promise.all([d]).then((result) => { });
            }
            if (localStorageData) {

                // // console.log(localStorageData)

            }
            if (sessionStorageData) {
                // // console.log(sessionStorageData)
            }
            res.json("hello")
            return false
            const sensitivekey = await checkForSensitiveInfoInBody(
                data,
                sensitivedata
            );
            if (sensitivekey) {
                const existingMessage = await CrticalInformationInurl.findOne(
                    {
                        hostname,
                        sensitivekeys: sensitivekey,
                    },
                    { _id: 0 }
                );
                // console.log(existingMessage);
                if (existingMessage) {
                    // console.log("Found existing sensitive key in URL");
                } else {
                    // console.log("Creating new sensitive key in URL");
                    const d = await CrticalInformationInurl.create({
                        hostname,
                        url,
                        sensitivekeys: sensitivekey,
                    });
                    // console.log(d);
                    // Return success response for creating new data
                    return res.status(201).json({ success: true });
                }
            } else {
                // Return response indicating that no sensitive key was found
                return res.status(200).json({ sensitivekey: false });
            }

            res.json("hello")
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    directory_listing_is_enabled_on_the_server: async (req, res) => {
        try {

            const data = await checkDirectoryListing(req.query.url)
            return sendResponse(res, 200, 'Directory listing.', data)

        } catch (error) {
            // console.log(error)
            return errorHandler(res, 500, error.message)
        }
    },
    plaincredential: async (req, res) => {
        try {
            const response = await axios.get(`http://${req.query.domain}/`);
            const protocol = response.request.protocol.replace(':', "");
            if (protocol == "http") {
                return sendResponse(res, 200, 'Credentials are transmitted to server in plain text', { cra: "Credentials are transmitted to server in plain text" })
            }
            else if (protocol == "https") {
                return sendResponse(res, 200, 'Credentials are not transmitted to server in plain text', { cra: "Credentials are not transmitted to server in plain text" })
            }
            // // console.log(response.request.res.httpVersion);
        } catch (error) {
            const protocol = error.request.protocol.replace(':', "")
            if (protocol == "http") {
                return sendResponse(res, 200, 'Credentials are transmitted to server in plain text', { cra: "Credentials are transmitted to server in plain text" })
            }
            else if (protocol == "https") {
                return sendResponse(res, 200, 'Credentials are not transmitted to server in plain text', { cra: "Credentials are not transmitted to server in plain text" })
            }
            // // console.log(error.request.res.httpVersion);
            // console.log('Error:', error.message);
        }
    },
    accesscontrollalloworigin: async (req, res) => {
        try {
            if (req.user) {
                const response = await axios.get(`http://autotest.handsintechnology.in/`).then((res => res)).catch((err => err.response))
                const access_control_allow_origin = response.headers['access-control-allow-origin']
                if (access_control_allow_origin) {
                    if (access_control_allow_origin === '*') {
                        return sendResponse(res, 200, "access controll alow origin is set to *", { access_control_allow_origin: "access controll alow origin is set to *" })

                    } else {
                        return sendResponse(res, 200, "access controll alow origin is not set to *", { access_control_allow_origin: "access controll alow origin is not  set to *" })
                    }
                } else {
                    return sendResponse(res, 200, "access controll alow origin is not set", { access_control_allow_origin: "access controll alow origin is not set" })

                }
            } else {
                return res.status(403).json("you are not allowed");
            }

        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    },
    securityheaders: async (req, res) => {
        try {
            const url = require('url')
            if (req.query.url) {
                const { isUrlValid } = require('../../utils/ScanHeaders/helpers')
                if (!isUrlValid(req.query.url)) throw new Error('Invalid URL format!')
                const hostname = url.parse(req.query.url).hostname
                const valid = await checkDomainAvailability(hostname)

                if (!valid) {
                    return res.json("please enter valid url")
                } else if (valid) {

                    const checkMyHeaders = require('../../utils/ScanHeaders')
                    const data = await checkMyHeaders(req.query.url)
                        .then((messages) => messages)
                    const rawHeaders = data.headers
                    const session = await sessionvunurability(req.query.url)
                        .then((data) => data)
                        .catch((error) => error)
                    return res.json({ headersinfo: data.messages, sessionvunurability: session, rawHeaders })

                }

            } else {
                res.json("please provide url")
            }
        } catch (error) {
            // console.log({error})
            errorHandler(res, 500, error.message)
        }

    },
    nodeversion: async (req, res) => {
        try {
            if (req.user) {
                const data = await NodeVersionModel.findOne({ appid: req.user.appid })
                return sendResponse(res, 200, "fetch", data)
            } else {
                throw new Error("User not exist")
            }
        } catch (error) {
            // console.log({ error })
            errorHandler(res, 500, error.message)
        }
    },
    scanpackagejson: async (req, res) => {
        try {
            const { fileContent, sid, appid } = req.body
            const dependencies = JSON.parse(fileContent).dependencies
            const dependencieslist = Object.keys(dependencies)
            if (dependencieslist.includes('sequelize')) {
                // console.log("sequelize is used")
            }
            else if (dependencieslist.includes('mysql2' || 'mysql')) {
                // console.log("mysql is used")
            } else if (dependencieslist.includes('mongoose')) {
                // console.log("mongodb find")
            } else {
                // console.log("any database not found")
            }
            res.json("ok")
        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    },
}