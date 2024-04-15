
const axios = require('axios');
const url = require('url')
const {  checkDomainAvailability, hashttpParametersPollutionavailable, Nodeversion } = require("../../utilities/functions/functions");
const { Project_Security_Logs } = require("../../models/Project_Security_Logs");
const { CrticalInformationInurl, EmailVerifyModel, } = require("../../models/sensitivekeywordsModel");
const { checkForSensitiveInfoInBody, CheckPasswordKeyText, CreatStatusCodesDetails, isHashedPassword, } = require("../../utils/functions");
const { sensitivedata, passwordkeys, } = require("../../sensitive/availableapikeys");
const { SSLverifier } = require("../../utils/Downtimemonitor");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");
const { AllowedDomainsModel } = require('../../models/AllowedDomainsModel');

const verifyEmail = require('../../utils/emailverify');
const { PasswordHashingDataModel } = require('../../models/Security/SecurityMisconfiguration.model');
const { PasswordValidateModel } = require('../../models/PasswordVaildateModel');
module.exports = {
    httpparameterpollution: async (req, res) => {
        try {
            let domain = req.query.domain
            let url = `http://${domain}/sitescanner?id=1&id=2&id=3`;
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                let response = await axios.get(url)
                if (response.status === 200) {
                    console.log("data", response.data)
                    let isHttp = await hashttpParametersPollutionavailable(response.data)
                    let data = { succces: false, data: isHttp, message: isHttp }
                    return sendResponse(res, 200, "success", data)

                } else {
                    throw new Error("Data Not found")
                }
            } else {
                return errorHandler(res, 500, error.message, { succces: false, data: {}, message: error.message })
            }
        } catch (error) {
            console.error("Error processing request:", error);
            return errorHandler(res, 500, error.message || "Internal Server Error");
        }
    },

    sslverify: async (req, res) => {
        try {
            let domain = req.query.domain

            const response = await SSLverifier(domain).then(data => data)
            return sendResponse(res, 200, "SSL verified successfully", response)
        } catch (error) {
            console.log("error", error)
            return errorHandler(res, 500, error.message)
        }
    },
    createuserdetails: async (req, res) => {
        try {
            let { UserRawData,domain, appid } = req.body;
            const finduser = await Project_Security_Logs.findOne({ user: req.user._id, ip: UserRawData.ip,domain, appid });
            if (finduser) {
                // Update existing element in the array
                await Project_Security_Logs.findOneAndUpdate(
                    { user: req.user._id, 'ip': UserRawData.ip,domain, appid},
                    { $set: UserRawData, },
                );
            } else {
                // Add a new element to the array
                await Project_Security_Logs.create(
                    {
                        user: req.user._id,domain, appid,
                        ...UserRawData,
                    }

                );
            }
            return sendResponse(res, 200, "fetch", "ok")
        } catch (error) {
            return errorHandler(res, 500, error.message)

        }
    },
    errorMessages: async (req, res) => {
        try {
            let { data, hostname, url, appid } = req.body;
            const { _id } = req.user;
            if (data.resoponsecodedata.code) {
                await CreatStatusCodesDetails(
                    data.resoponsecodedata.code,
                    data.resoponsecodedata.phrase,
                    url,
                    hostname,appid
                    _id
                );
            }
            return sendResponse(res, 200, "fetch", "ok")

        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    },
    emailverify: async (req, res) => {
        try {
            let { email, domain, appid, ip } = req.body;
            let isVerifyEmail = await verifyEmail(email)
            if (!isVerifyEmail) {
                const EmailExist = await EmailVerifyModel.findOne({ email, domain, appid, ip });
                if (!EmailExist) {
                    await EmailVerifyModel.create({ email, domain, appid, ip })
                    return sendResponse(res, 200, "fetch", EmailExist)
                } else {
                    return sendResponse(res, 200, "fetch", EmailExist)
                }

            }
            return sendResponse(res, 200, "fetch", isVerifyEmail)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    sensitivekeysinurl: async (req, res) => {
        try {
            const passwordTestHashes = await PasswordHashingDataModel.aggregate([
                { $match: {} }
            ]);
            const { data, url, domain, appid, type } = req.body;
            const { _id } = req.user;
            console.log(_id)
            const sensitivekey = await checkForSensitiveInfoInBody(data, sensitivedata);
            const passworddata = await CheckPasswordKeyText(data, passwordkeys); // Check for password keys in the data
            let found = false; // Flag to track if a match is found
            let algorithm= "";
            // Check if domain exists in the database
            const existingRecord = await PasswordValidateModel.findOne({ domain });
            let passwordkeyavailable = false;
            if (passworddata) {
                passwordkeyavailable = true;
                // Domain exists, update the record
                for (const item of passwordTestHashes) {
                    const regexPattern = new RegExp(eval(item.regex));
                    if (regexPattern.test(passworddata)) {
                        algorithm = item.name;
                        found = true; // Set found to true since a match is found
                        break; // Once a match is found, exit the loop
                    }
                }
            }else if(!passworddata){
                passwordkeyavailable = false;
            }
            
            // If no match is found and domain doesn't exist, create a record with HashedPassword set to false
            if (!existingRecord) {
                await PasswordValidateModel.create({
                    domain,
                    HashedPassword: false,
                    appid,algorithm,
                    passwordkeyavailable
                });
            }
          else  if (existingRecord) {
                await PasswordValidateModel.updateOne(
                    { domain },
                    {
                        $set: {
                            HashedPassword: true,
                            appid,
                            algorithm: algorithm,
                            passwordkeyavailable
                        }
                    }
                );
            }
            
            
            let successMessage;
            if (sensitivekey) {
                const existingMessage = await CrticalInformationInurl.findOne({
                    user: _id,
                    domain,
                    sensitivekeys: sensitivekey,
                    appid, type
                });

                if (existingMessage) {
                    successMessage = "Sensitive key already exists in the URL.";
                } else {
                    let data = await CrticalInformationInurl.create({
                        user: _id,
                        domain,
                        url,
                        sensitivekeys: sensitivekey,
                        appid, type
                    });
                    console.log("data>>>>", data)
                    successMessage = "New sensitive key added to the URL.";
                }
            } else {
                successMessage = "No sensitive key found in the data.";
            }

            return res.status(200).json({ success: true, message: successMessage });
        } catch (error) {
            console.log({ sensitivekeysinurlerror: error });
            return res.status(500).json({ error: "Internal Server Error" });
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

                // // //console.log(localStorageData)

            }
            if (sessionStorageData) {
                // // //console.log(sessionStorageData)
            }
            return res.json("hello")
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
                // //console.log(existingMessage);
                if (existingMessage) {
                    // //console.log("Found existing sensitive key in URL");
                } else {
                    // //console.log("Creating new sensitive key in URL");
                    const d = await CrticalInformationInurl.create({
                        hostname,
                        url,
                        sensitivekeys: sensitivekey,
                    });
                    // //console.log(d);
                    // Return success response for creating new data
                    return res.status(201).json({ success: true });
                }
            } else {
                // Return response indicating that no sensitive key was found
                return res.status(200).json({ sensitivekey: false });
            }

            return res.json("hello")
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
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
            const valid = await checkDomainAvailability(req.query.domain)

            if (!valid) {
                return res.json("please enter valid url")
            } else if (valid) {
                const checkMyHeaders = require('../../utils/ScanHeaders')
                let url = `http://${req.query.domain}/`
                const data = await checkMyHeaders(url)
                    .then((messages) => messages)
                const rawHeaders = data.headers
                return sendResponse(res, 200, "fetch all data", { headersinfo: data.messages, rawHeaders })

            }


        } catch (error) {
            // //console.log({error})
            errorHandler(res, 500, error.message)
        }

    },

}