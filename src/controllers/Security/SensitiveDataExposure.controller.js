const { sendResponse } = require("../../utils/dataHandler");
const axios = require("axios");
const { errorHandler } = require("../../utils/errorHandler");
const { CrticalInformationInurl } = require("../../models/sensitivekeywordsModel");
const { checkServerFingerprinting, Full_Path_Disclosure } = require("../../utils/AppFingerPrinting");
const { scanHardCodedData } = require("../../utils/scanClientData");
const { ServerDataInPlaintextModel } = require("../../models/Security/SecurityMisconfiguration.model");
const { PasswordValidateModel } = require("../../models/PasswordVaildateModel");
const { GetPaginatedSensitiveKeys, DeleteKeys } = require("../../helpers/DeleteArrayMongoField");
function isPrivateIPAddress(headers) {
    return new Promise((resolve, reject) => {
        try {
            const privateIPRegex = /^(::ffff:)?((10\.\d{1,3}\.\d{1,3}\.\d{1,3})|(172\.((1[6-9])|(2\d)|(3[01]))\.\d{1,3}\.\d{1,3})|(192\.168\.\d{1,3}\.\d{1,3})|(127\.\d{1,3}\.\d{1,3}\.\d{1,3}))$/;
            let private = false
            for (const [key, value] of Object.entries(headers)) {
                if (privateIPRegex.test(value)) {
                    private = true
                    break;
                }
            }
            resolve({ private: private })
        } catch (error) {
            reject(error)
        }
    })

}



module.exports = {
    sourcecodeDisclousoure: async (req, res) => {
        try {
            return sendResponse(res, 200, "success", [...req.body.fileContent])

        } catch (error) {

            return errorHandler(res, 200, "No", "No")
        }
    },
    DefaultWebPage: async (req, res) => {
        let status = 500
        try {
            let domain = req.query.domain
            let url = `http://${domain}/`;
            let response = await axios.get(url).then(response => response).catch((e) => e.response)
            if (response.status === 200) {
                return sendResponse(res, 200, "success", "Yes")
            } else if (response.status === 404) {
                return sendResponse(res, 200, "success", "No")
            } else {
                return sendResponse(res, 200, "success", "No")
            }


        } catch (error) {

            return errorHandler(res, 200, "No", "No")
        }
    },


    // SensitiveKeysinUrl: async (req, res) => {
    //     try {
    //         let { appid } = req.user;
    //         let { type, page = 1, limit = 1, complete, domain, isQuestion = "" } = req.query; // Default to page 1 and page size of 10 if not provided
    //         page = parseInt(page);
    //         limit = parseInt(limit);
    //         let skip = (page - 1) * limit;
    //         let pipeline = []

    //         if (!complete) {
    //             pipeline = [{ $match: { appid, type, domain } },
    //             { $group: { _id: "$url", count: { $sum: 1 } } },
    //             { $project: { labels: "$_id", values: "$count", _id: 0 } },
    //             { $sort: { labels: 1 } },
    //             { $skip: skip },
    //             { $limit: limit }]
    //         }
    //         if (complete) {
    //             pipeline = [{ $match: { appid, type, domain } },
    //                 {
    //                     $project:{
    //                         sensitivekeys:1,
    //                         _id:0
    //                     }
    //                 }
    //             { $sort: { url: 1 } },
    //             { $skip: skip },
    //             { $limit: limit }]

    //         }
    //         if (isQuestion) {
    //             pipeline = [{ $match: { appid, type, domain } },
    //             { $group: { _id: "$url", count: { $sum: 1 } } },
    //             { $project: { labels: "$_id", values: "$count", _id: 0 } },
    //             { $sort: { labels: 1 } },
    //             { $skip: skip },
    //             { $limit: limit }]
    //         }
    //         let [totalCountData, data] = await Promise.all([
    //             CrticalInformationInurl.aggregate([
    //                 { $match: { appid, type, domain } },
    //                 { $group: { _id: null, totalCount: { $sum: 1 } } }
    //             ]),
    //             CrticalInformationInurl.aggregate(pipeline)
    //         ]);

    //         let totalCount = totalCountData.length > 0 ? totalCountData[0].totalCount : 0;
    //         let response = {
    //             data,
    //             totalPages: Math.ceil(totalCount / limit)
    //         }
    //         if (isQuestion) {
    //             response = data
    //         }
    //         return sendResponse(res, 200, "fetch", response);
    //     } catch (error) {
    //         return errorHandler(res, 500, "fetch", error.message);
    //     }
    // }
    SensitiveKeysinUrl: async (req, res) => {
        try {
            let { page, limit, domain, type } = req.query;
            page = parseInt(page) || 1
            limit = parseInt(limit) || 5
            console.log(req.user)
            let { appid, id: _id } = req.user;
            let data = await GetPaginatedSensitiveKeys(domain, appid, type, page, limit, _id, CrticalInformationInurl, "sensitivekeys")
            return sendResponse(res, 200, "fetch", data);

        } catch (error) {
            return errorHandler(res, 500, "fetch", error.message);
        }
    }
    ,
    SensitiveKeysinUrlDelete: async (req, res) => {
        try {
            let { domain, type, key } = req.query;
            if (!req.query.key) {
                throw new Error("Key is required")
            }
            if (!req.query.type) {
                throw new Error("Type is required")
            }

            let { appid, id: _id } = req.user;
            let data = await DeleteKeys(domain, appid, type, _id, key, CrticalInformationInurl, "sensitivekeys")
            return sendResponse(res, 200, "fetch", data);

        } catch (error) {
            return errorHandler(res, 500, "fetch", error.message);
        }
    }
    ,
    FingerprintDetection: async (req, res) => {
        try {
            let { domain } = req.query; // Default to page 1 and page size of 10 if not provided
            let data = await checkServerFingerprinting(domain)
            return sendResponse(res, 200, "fetch", data);
        } catch (error) {
            return errorHandler(res, 500, "fetch", error.message);
        }
    }
    ,
    ServerPathDisclosure: async (req, res) => {
        try {
            let { domain } = req.query; // Default to page 1 and page size of 10 if not provided
            let data = await Full_Path_Disclosure(domain)
            return sendResponse(res, 200, "fetch", data);
        } catch (error) {
            return errorHandler(res, 500, "fetch", error.message);
        }
    }
    ,
    ServerFileAvailbleInCLearText: async (req, res) => {
        try {
            let fileContent = req.body.fileContent
            let data = await scanHardCodedData(fileContent)
            return sendResponse(res, 200, "fetch", data);
        } catch (error) {

            return errorHandler(res, 200, "No", "No")
        }
    },
    SensitiveDataInPlainText: async (req, res) => {
        let status = 500
        try {

            let domain = req.query.domain
            let appid = req.user.appid

            let esxistpsesitiveData = await ServerDataInPlaintextModel.findOne({ domain: domain, appid: appid }).select("key");
            console.log({ esxistpsesitiveData })
            if (esxistpsesitiveData == null) {
                status = 404
                throw new Error("No data found")
            }
            return sendResponse(res, 200, "success", esxistpsesitiveData)
        } catch (error) {
            console.log(error)
            return errorHandler(res, status, error.message)
        }
    },
    ClearPasswordtext: async (req, res) => {
        try {
            let { appid } = req.user
            let domain = req.query.domain
            let data = await PasswordValidateModel.findOne({ appid, domain })
            return sendResponse(res, 200, "fetch", data)
        } catch (error) {
            errorHandler(res, 500, "fetch", error.message)
        }
    },
    PrivateIPdisclosed: async (req, res) => {
        try {
            let domain = req.query.domain;
            // let domain = 'securitytool.handsintechnology.in'
            let response = await axios.get(`https://${domain}`).then(response => response.headers).catch((error) => error.response ? error.response.headers : null)

            if (!response) {
                throw new Error("Ip related Data Not Found")
            }
            let data = await isPrivateIPAddress(response)

            return sendResponse(res, 200, "fetch", data)
            // Iterate over the headers and check for private IP addresses

        } catch (error) {
            console.log(error)
            return errorHandler(res, 500, "fetch", error.message)
        }
    }

}