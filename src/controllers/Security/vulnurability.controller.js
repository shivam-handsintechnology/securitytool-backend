
const { Project_Security_Logs } = require("../../models/Project_Security_Logs");
const { CrticalInformationInurl } = require("../../models/sensitivekeywordsModel");
const { checkForSensitiveInfoInBody, CheckPasswordKeyText, CheckAllDataIsEncrypted, } = require("../../utils/functions");
const { sensitivedata, passwordkeys, } = require("../../sensitive/availableapikeys");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");
const { PasswordValidateModel } = require('../../models/PasswordVaildateModel');
const { PasswordHashingDataModel, ServerDataInPlaintextModel } = require("../../models/Security/SecurityMisconfiguration.model");
module.exports = {
    createuserdetails: async (req, res) => {
        try {
            let { UserRawData, domain, appid } = req.body;
            const finduser = await Project_Security_Logs.findOne({ user: req.user._id, ip: UserRawData.ip, domain, appid });
            if (finduser) {
                // Update existing element in the array
                await Project_Security_Logs.findOneAndUpdate(
                    { user: req.user._id, 'ip': UserRawData.ip, domain, appid },
                    { $set: UserRawData, },
                );
            } else {
                // Add a new element to the array
                await Project_Security_Logs.create(
                    {
                        user: req.user._id, domain, appid,
                        ...UserRawData,
                    }

                );
            }
            return sendResponse(res, 200, "fetch", "ok")
        } catch (error) {
            return errorHandler(res, 500, error.message)

        }
    },
 
 
    sensitivekeysinurl: async (req, res) => {
        try {
            const passwordTestHashes = await PasswordHashingDataModel.aggregate([
                { $match: {} }
            ]);
            const { responseData, url, query, domain, appid, RawBody } = req.body;
            console.log("RawBody", RawBody)
            const { _id } = req.user;
            // Sensitve data transfer in plain text
            const passworddata = await CheckPasswordKeyText(responseData, passwordkeys); // Check for password keys in the data
            console.log("passworddata",passworddata)
            // Check if domain exists in the database and update the password key
            const existingRecord = await PasswordValidateModel.findOne({ domain,appid });
    
            // Check if password key is available in the data
            if (!existingRecord && passworddata.ispassword) {
                await PasswordValidateModel.create({
                    domain,
                    HashedPassword: passworddata.isHashedPassword,
                    appid,
                    password: passworddata.ispassword
                });
            } else if (existingRecord && passworddata.ispassword) {
                await PasswordValidateModel.updateOne(
                    { domain,appid },
                    {
                        $set: {
                            HashedPassword: passworddata.isHashedPassword,
                            appid,
                            password: passworddata.ispassword
                        }
                    }
                );
            }
            async function CreatData(sensitivekey, domain, appid, type) {
                
                const existingMessage = await CrticalInformationInurl.findOne({
                    user: _id,
                    domain,
                    sensitivekeys: sensitivekey,
                    appid, type
                });
                if (existingMessage) {
                    successMessage = "Sensitive key already exists in the URL.";
                } else {
                    await CrticalInformationInurl.create({
                        user: _id,
                        domain,
                        url,
                        sensitivekeys: sensitivekey,
                        appid, type
                    });
                    successMessage = "New sensitive key added to the URL.";
                }
            }
            let successMessage;
            
                if (query) {
                    const sensitivekey = await checkForSensitiveInfoInBody(query, sensitivedata);
                    let isEncyptedData = await CheckAllDataIsEncrypted(query,sensitivedata,passwordTestHashes,appid,domain);
                    console.log("isEncyptedData", isEncyptedData)
                    if(isEncyptedData.length > 0){
                        let notencrypteddata= isEncyptedData.filter((data)=>data.encrypted===false)
                        if(notencrypteddata.length > 0){
                            await ServerDataInPlaintextModel.insertMany(notencrypteddata, { ordered: false }).catch((err) => {
                                // console.log(err)
                            })
                            successMessage = "Sensitive data is not encrypted in the query.";
                        }
                    }
                    if(!sensitivekey){
                        successMessage = "No sensitive key found in the query.";
                    }
                    sensitivekey &&  await CreatData(sensitivekey, domain, appid, "url")
                  
                }
                if(RawBody){
                    let isEncyptedData = await CheckAllDataIsEncrypted(RawBody,sensitivedata,passwordTestHashes,appid,domain);
                    console.log("isEncyptedData", isEncyptedData)
                    if (isEncyptedData.length > 0) {
                        let notencrypteddata = isEncyptedData.filter((data) => !data.encrypted);
                        if (notencrypteddata.length > 0) {
                            let encryptedkeys = notencrypteddata.map((data) => data.key);
                            let existingRecord = await ServerDataInPlaintextModel.findOne({ domain, appid });
                            
                            if (!existingRecord) {
                                await ServerDataInPlaintextModel.create({
                                    domain,
                                    appid,
                                    key: encryptedkeys
                                });
                            } else {
                                let existingKeys = existingRecord.key;
                                let newKeys = Array.from(new Set([...existingKeys, ...encryptedkeys]));
                                await ServerDataInPlaintextModel.updateOne(
                                    { domain, appid },
                                    {
                                        $set: {
                                            key: newKeys
                                        }
                                    }
                                );
                            }
                        }
                    }
                    
                    
                }
                if (responseData) {
                    const sensitivekey = await checkForSensitiveInfoInBody(responseData, sensitivedata);
                    if(!sensitivekey){
                        successMessage = "No sensitive key found in the Data.";
                    }
                    sensitivekey &&    await CreatData(sensitivekey, domain, appid, "response")
                }
            
            return res.status(200).json({ success: true, message: successMessage });
        } catch (error) {
            console.log(error)
            if(error.code === 11000){
               return res.status(200).json({ success: true, message: "Sensitive key already exists in the URL." });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
  
}