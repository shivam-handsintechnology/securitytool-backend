const { AllowedWebDomainsModel } = require("../../models/AllowedDomainsModel");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");

// Weak Cross domain policy
module.exports = {
    // Is "Origin" header in client request validated at the server?
    isOriginHeaderValidated: async function (req, res) {
        try {
            let domainData = await AllowedWebDomainsModel.aggregate([
                {
                    $match: {
                        appid: req.user.appid,
                    },
                },
                {
                    $group: {
                        _id: null,
                        domains: { $addToSet: "$domain" },
                    },
                },
            ]);

            let domainsArray = domainData.length > 0 ? domainData[0].domains : [];
            if (domainsArray.length === 0) {
                return errorHandler(res, 404, "Application not found");
            }
            if (domainsArray.length > 0) {
                let response = await fetch(`http://${req.query.domain}`)
                let OriginAtClient = response.headers.get('Access-Control-Allow-Origin')
                console.log("OriginAtClient", OriginAtClient)
                if(!OriginAtClient){
                    return sendResponse(res, 200, "Origin header in client request is not validated at the server", "No")
                }
                let existSome = domainsArray.some((domain) => OriginAtClient.includes(domain))
                if (existSome) {
                    return sendResponse(res, 200, "Origin header in client request is validated at the server", "Yes")
                }
                if (!existSome) {
                    return sendResponse(res, 200, "Origin header in client request is not validated at the server", "No"
                    )
                }
            }

        } catch (error) {
            console.log("Error in validating Origin header in client request at the server", error)
            return errorHandler(res, 500, "Error in validating Origin header in client request at the server")
        }

    },
    // Is "Access-Control-Allow-Origin" header in server response is set securely?
    isAccessControlAllowOriginHeaderSecure: async function (req, res) {
        try {
            let response = await fetch(`http://${req.query.domain}`)
            let OriginAtClient = response.headers.get('Access-Control-Allow-Origin')
            if(!OriginAtClient){
                return sendResponse(res, 200, "Origin header in client request is not validated at the server", "No")
            }
            if (OriginAtClient.includes("*")) {
                return sendResponse(res, 200, "Access-Control-Allow-Origin header in server response is set securely", "No")
            } else if (!OriginAtClient.includes("*")) {
                return sendResponse(res, 200, "Access-Control-Allow-Origin header in server response is set securely", "Yes")
            }


        } catch (error) {
            console.log("Error in validating Access-Control-Allow-Origin header in server response", error)
            return errorHandler(res, 500, "Error in validating Access-Control-Allow-Origin header in server response")
        }
    }

}

