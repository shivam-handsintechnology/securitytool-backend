
const axios = require('axios');
const url = require('url')
const {  checkDomainAvailability, hashttpParametersPollutionavailable, Nodeversion } = require("../../utilities/functions/functions");
const { Project_Security_Logs } = require("../../models/Project_Security_Logs");
const { CrticalInformationInurl, EmailVerifyModel, } = require("../../models/sensitivekeywordsModel");
const { checkForSensitiveInfoInBody, CheckPasswordKeyText, CreatStatusCodesDetails, isHashedPassword, } = require("../../utils/functions");
const { sensitivedata, passwordkeys, } = require("../../sensitive/availableapikeys");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");
const { AllowedDomainsModel } = require('../../models/AllowedDomainsModel');
const verifyEmail = require('../../utils/emailverify');
const { PasswordHashingDataModel } = require('../../models/Security/SecurityMisconfiguration.model');
const { PasswordValidateModel } = require('../../models/PasswordVaildateModel');
module.exports = {
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
            let { data, domain, url, appid } = req.body;
            const { _id } = req.user;
            if (data.resoponsecodedata.code) {
                await CreatStatusCodesDetails(
                    data.resoponsecodedata.code,
                    data.resoponsecodedata.phrase,url,domain,_id,appid
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
         
            const sensitivekey = await checkForSensitiveInfoInBody(data, sensitivedata);
            const passworddata = await CheckPasswordKeyText(data, passwordkeys); // Check for password keys in the data
             console.log("passworddata",passworddata)
            // Check if domain exists in the database
            const existingRecord = await PasswordValidateModel.findOne({ domain });
            let passwordkeyavailable = false;
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
                    successMessage = "New sensitive key added to the URL.";
                }
            } else {
                successMessage = "No sensitive key found in the data.";
            }

            return res.status(200).json({ success: true, message: successMessage });
        } catch (error) {
         
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    sensitiveDatatransmitinPlainText: async (req, res) => {
        try {
            const { data, domain, appid } = req.body;
            const { _id } = req.user;
            const sensitivekey = await checkForSensitiveInfoInBody(data, sensitivedata);
            let successMessage;
            return res.status(200).json({ success: true, message: successMessage });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}