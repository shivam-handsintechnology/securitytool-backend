
const { Project_Security_Logs } = require("../../models/Project_Security_Logs");
const { CrticalInformationInurl } = require("../../models/sensitivekeywordsModel");
const { checkForSensitiveInfoInBody, CheckPasswordKeyText, CheckAllDataIsEncrypted, } = require("../../utils/functions");
const { sensitivedata, passwordkeys, } = require("../../sensitive/availableapikeys");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");
const { PasswordValidateModel } = require('../../models/PasswordVaildateModel');
const { ServerDataInPlaintextModel } = require("../../models/Security/SecurityMisconfiguration.model");
const User = require("../../models/User");
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
    createuserdetailsfromclient: async (req, res) => {
        try {
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
            const date = new Date();

            let { data, hostname, appid } = req.body;
            let ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress
            const useragent = req.headers["user-agent"];
            let User = await User.findOne({ appid })
            let payload = {
                useragent, ip: ipaddress, date: date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear(),
                time: date.toLocaleTimeString(),
            }
            data = { ...data, ...payload }
            const finduser = await Project_Security_Logs.findOne({ user: User._id, ip: ipaddress, domain: hostname, appid });
            if (finduser) {
                // Update existing element in the array
                await Project_Security_Logs.findOneAndUpdate(
                    { user: User._id, 'ip': ipaddress, domain: hostname, appid },
                    { $set: data, },
                );
            } else {
                // Add a new element to the array
                await Project_Security_Logs.create(
                    {
                        'ip': ipaddress,
                        user: User._id, domain, appid,
                        ...data,

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

            const { responseData, url, query, domain, appid, RawBody } = req.body;
            console.log("RawBody", RawBody)
            const { _id } = req.user;
            // Sensitve data transfer in plain text
            const passworddata = await CheckPasswordKeyText(responseData, passwordkeys); // Check for password keys in the data
            console.log("passworddata", passworddata)
            // Check if domain exists in the database and update the password key
            const existingRecord = await PasswordValidateModel.findOne({ domain, appid });

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
                    { domain, appid },
                    {
                        $set: {
                            HashedPassword: passworddata.isHashedPassword,
                            appid,
                            password: passworddata.ispassword
                        }
                    }
                );
            }
            async function CreatData(sensitivekeys, domain, appid, type) {
                try {
                    const existingMessage = await CrticalInformationInurl.findOne({
                        user: _id,
                        domain,
                        appid,
                        type
                    });

                    if (existingMessage) {
                        // Filter out keys that already exist in the array
                        const newKeys = sensitivekeys.filter(key => !existingMessage.sensitivekeys.includes(key));

                        if (newKeys.length > 0) {
                            // Add the new keys to the array and save the document
                            existingMessage.sensitivekeys.push(...newKeys);
                            await existingMessage.save();
                            successMessage = "New sensitive keys added to the URL.";
                        } else {
                            successMessage = "All provided sensitive keys already exist in the URL.";
                        }
                    } else {
                        // Create a new document if none exists
                        await CrticalInformationInurl.create({
                            user: _id,
                            domain,
                            url,
                            sensitivekeys, // Initialize with the array of sensitive keys
                            appid,
                            type
                        });
                        successMessage = "New sensitive keys added to the URL.";
                    }
                } catch (error) {
                    // Handle the error appropriately
                    console.error("Error creating or updating data:", error);
                    successMessage = "An error occurred while processing your request.";
                }
            }

            let successMessage;

            if (query) {
                //    Sensitive data is transmitted to server in plain text
                let isEncyptedData = await CheckAllDataIsEncrypted(query, sensitivedata);
                console.log("isEncyptedData", isEncyptedData)
                if (isEncyptedData.length > 0) {
                    let notencrypteddata = isEncyptedData.filter((data) => data.encrypted === false)
                    if (notencrypteddata.length > 0) {
                        await ServerDataInPlaintextModel.insertMany(notencrypteddata, { ordered: false }).catch((err) => {
                            // console.log(err)
                        })
                        successMessage = "Sensitive data is not encrypted in the query.";
                    }
                }
                // Sensitive information revealed in HTTP response
                const sensitivekey = await checkForSensitiveInfoInBody(query, sensitivedata);
                console.log("sensitivekey", sensitivekey)
                if (sensitivekey.length === 0) {
                    successMessage = "No sensitive key found in the query.";
                }
                sensitivekey.length > 0 && await CreatData(sensitivekey, domain, appid, "url")

            }
            if (RawBody) {
                //    Sensitive data is transmitted to server in plain text
                let isEncyptedData = await CheckAllDataIsEncrypted(RawBody, sensitivedata);
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
                // Sensitive information revealed in HTTP response
                const sensitivekey = await checkForSensitiveInfoInBody(responseData, sensitivedata);
                console.log("sensitivekey", sensitivekey, "responseData", responseData)
                if (sensitivekey.length === 0) {
                    successMessage = "No sensitive key found in the Data.";
                }
                sensitivekey.length > 0 && await CreatData(sensitivekey, domain, appid, "response")
            }

            return res.status(200).json({ success: true, message: successMessage });
        } catch (error) {
            console.log(error)
            if (error.code === 11000) {
                return res.status(200).json({ success: true, message: "Sensitive key already exists in the URL." });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

}