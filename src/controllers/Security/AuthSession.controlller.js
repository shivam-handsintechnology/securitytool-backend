const SensitiveDataStoredInLocalStorageModel = require("../../models/Security/SensitiveDataStoredInLocalStorage.model");
const SensitiveDataStoredInSessionStorageModel = require("../../models/Security/SensitiveDataStoredInSessionStorage.model");
const CLientSessionDataModel = require("../../models/Security/CLientSessionData.model");
const { analyzeSessionCookie } = require("../../utils");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");;
const { BlackPasswordValidation, SecondFactorAuthBypassed, checkNonHTMLContentAccessibility } = require("../../utils/TestWithPlayWright");
module.exports = {
    SessionVulnurbilityCOntroller: async (req, res) => {
        try {
            // Call the respective controller function
            const payload = { ...req.body, ...req.query, ...req.params, }
            console.log(payload)
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
                            $anyElementTrue: {
                                $map: {
                                    input: '$data',
                                    as: 'dataItem',
                                    in: { $eq: ["$$dataItem.value.key", "JSON Web Token"] }
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        data: 1,
                        containsJWT: 1,
                        _id: 0
                    }
                }
            ]);
            let [localdata] = await SensitiveDataStoredInLocalStorageModel.aggregate([
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
                            $anyElementTrue: {
                                $map: {
                                    input: '$data',
                                    as: 'dataItem',
                                    in: { $eq: ["$$dataItem.value.key", "JSON Web Token"] }
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        data: 1,
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
                    $project: {
                        Cookiesdata: 1,
                        _id: 0
                    }
                },
                {
                    $limit: 1
                },
            ]);
            console.log({ sessionCookies, localdata, sessiondata })
            const results = await analyzeSessionCookie(sessionCookies, localdata, sessiondata).then(data => data)

            return sendResponse(res, 200, "fetch", results)

        } catch (error) {
            console.log(error)
            return errorHandler(res, 500, error.message);
        }
    },
    NOnHtmlContentAccebiltyController: async (req, res) => {
        try {

            const domain = req.query.domain
            const headers = {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            };
            res.writeHead(200, headers);
            const SendEvent = (data, res = res) => {
                res.write(`data:${JSON.stringify(data)} \n\n`);
            }
            SendEvent({ message: "Scanning started", time: Date.now() }, res);
            const results = await checkNonHTMLContentAccessibility(`https://${domain}`, res, SendEvent);
            console.log('Scanning completed:', results);

            SendEvent({ message: "Scanning completed", time: Date.now(), complete: true }, res);
            res.end(); // End the response after sending all data
        } catch (error) {
            console.error('Error occurred while scanning:', error);
            res.write(`data: ${JSON.stringify({ message: error.message })} \n\n`)
            res.end(); // Ensure response is ended in case of error
        }
    },
    SecondFactorAuthBypassedController: async (req, res) => {
        try {

            const domain = req.query.domain
            const headers = {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            };
            res.writeHead(200, headers);
            const SendEvent = (data, res = res) => {
                res.write(`data:${JSON.stringify(data)} \n\n`);
            }
            SendEvent({ message: "Scanning started", complete: false, time: Date.now() }, res);
            const results = await SecondFactorAuthBypassed(`https://${domain}`, res, SendEvent);
            console.log('Scanning completed:', results);

            SendEvent({ message: "Scanning completed", time: Date.now(), complete: true }, res);
            res.end(); // End the response after sending all data
        } catch (error) {
            console.error('Error occurred while scanning:', error);
            res.write(`data: ${JSON.stringify({ message: error.message, complete: true })} \n\n`)
            res.end(); // Ensure response is ended in case of error
        }
    },
    BlackPasswordValidationController: async (req, res) => {
        try {
            const domain = req.query.domain
            const headers = {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            };
            const fullurl = `${req.protocol}://${req.get('host')}/api/videostream/`
            res.writeHead(200, headers);
            const SendEvent = (data, res = res) => {
                res.write(`data:${JSON.stringify(data)} \n\n`);
            }
            SendEvent({ message: "Scanning started", complete: false, time: Date.now() }, res);
            const results = await BlackPasswordValidation(`https://${domain}`, res, SendEvent, fullurl);
            console.log('Scanning completed:', results);

            SendEvent({ message: "Scanning completed", time: Date.now(), complete: true }, res);
            res.end(); // End the response after sending all data
        } catch (error) {
            console.error('Error occurred while scanning:', error);
            res.write(`data: ${JSON.stringify({ message: error.message, complete: true })} \n\n`)
            res.end(); // Ensure response is ended in case of error
        }
    },

}