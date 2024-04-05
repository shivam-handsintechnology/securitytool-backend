const { ClientLoagsModel } = require("../../models/ClientLoagsModel")
const mongoose = require("mongoose")
const { sendResponse } = require("../../utils/dataHandler")
const { AllowedDomainsModel } = require("../../models/AllowedDomainsModel")
const { default: axios } = require("axios")
const { ScanDangerousMethods } = require("../../utils/scanClientData")
const { PasswordHashingDataModel } = require("../../models/Security/SecurityMisconfiguration.model")
const ObjectId = mongoose.Types.ObjectId
module.exports = {
    arbitraryMethods: async (req, res) => {
        let domain = req.query.domain
        let url = `http://${domain}/getEndpoints`;
        let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
        if (isExistDomain) {
            let response = await axios.get(url)
            if (response.status === 200) {
                console.log("data", response.data)
                let data = await ScanDangerousMethods(response.data.data)
                sendResponse(res, 200, "success", data)
            } else {
                sendResponse(res, 200, "success", [])
            }
            console.log("response", response.data)
        } else {
            return sendResponse(res, 500, "Domain is Not Find");
        }
    },
    passwordsInsecure: async (req, res) => {
        try {
            const passwordTestHashes = await PasswordHashingDataModel.aggregate([
                { $match: {} }
            ]);
            let domain = req.query.domain
            let url = `http://${domain}/passwords-insecure`;
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                let response = await axios.get(url)
                if (response.status === 200) {
                    console.log(response.data)
                    let obj = "Password is not hashed"
                    for (const item of passwordTestHashes) {
                        const regexPattern = new RegExp(eval(item.regex));
                        if (regexPattern.test(response.data.data.password)) {
                            obj = `password found with ${item.name} algorithm`;
                            break; // Once a match is found, exit the loop
                        }
                    }

                    if (!obj) {
                        return sendResponse(res, 200, "success", "Password is not hashed");
                    }

                    return sendResponse(res, 200, "success", obj);
                } else {
                    sendResponse(res, 200, "success", "Data Not found")
                }
            } else {
                throw new Error("Domain Is Not exist ")
            }
        } catch (error) {
            console.log(":error", error)
            return sendResponse(res, 500, "success", error.message)
        }
    }
}