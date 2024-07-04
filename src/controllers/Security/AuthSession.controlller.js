const SensitiveDataStoredInLocalStorageModel = require("../../models/Security/SensitiveDataStoredInLocalStorage.model");
const SensitiveDataStoredInSessionStorageModel = require("../../models/Security/SensitiveDataStoredInSessionStorage.model");
const CLientSessionDataModel = require("../../models/Security/CLientSessionData.model");
const { analyzeSessionCookie } = require("../../helpers/SessionVulnurabiltyChecker");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");

module.exports = {
    SessionVulnurbilityCOntroller: async (req, res) => {
        try {
            // Call the respective controller function
            const payload = { ...req.body, ...req.query, ...req.params, }
            let [sessiondata] = await SensitiveDataStoredInSessionStorageModel.aggregate([
                {
                    $match: {
                        appid: req.user.appid,
                        subdomain: payload.domain,
                        data: { $exists: true, $ne: [] }
                    }
                },
                {
                    $limit: 1
                },
                {
                    $addFields: {
                        containsJWT: {
                            $map: {
                                input: '$data',
                                as: 'dataItem',
                                in: {
                                    $cond: {
                                        if: {
                                            $in: ["JSON Web Token", "$$dataItem.value.key"]
                                        },
                                        then: "$$dataItem",
                                        else: null
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        containsJWT: {
                            $anyElementTrue: '$containsJWT'
                        }
                    }
                },
                {
                    $project: {
                        data: '$data',
                        containsJWT: 1,
                        _id: 0
                    }
                }
            ]);
            let [localdata] = await SensitiveDataStoredInLocalStorageModel.aggregate([
                {
                    $match: {
                        appid: req.user.appid,
                        subdomain: payload.domain, data: { $exists: true, $ne: [] }
                    }
                },
                {
                    $limit: 1
                },
                {
                    $addFields: {
                        containsJWT: {
                            $map: {
                                input: '$data',
                                as: 'dataItem',
                                in: {
                                    $cond: {
                                        if: {
                                            $in: ["JSON Web Token", "$$dataItem.value.key"]
                                        },
                                        then: "$$dataItem",
                                        else: null
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        containsJWT: {
                            $anyElementTrue: '$containsJWT'
                        }
                    }
                },
                {
                    $project: {
                        data: '$data',
                        containsJWT: 1,
                        _id: 0
                    }
                }
            ]);

            let [sessionCookies] = await CLientSessionDataModel.aggregate([
                {
                    $match: {
                        appid: req.user.appid,
                        subdomain: payload.domain
                    }
                },
                {
                    $limit: 1
                },
            ]);

            const results = await analyzeSessionCookie(sessionCookies, localdata, sessiondata).then(data => data)

            return sendResponse(res, 200, "fetch", results)

        } catch (error) {
            console.log(error)
            return errorHandler(res, 500, error.message);
        }
    }
}