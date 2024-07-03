
const router = require("express").Router()
const { errorHandler } = require("../../utils/errorHandler");

const { analyzeSessionCookie, sessionExpireOnClose, sessionTimeoutWithObject, sessionFixationWithobject, sessionHijackingWithObject, sessionTokenWithObject, SessionVulnurability } = require("../../helpers/SessionVulnurabiltyChecker");
const GetFileCOntentMiddleware = require("../../middlewares/GetFileCOntentMiddleware");
const { sendResponse } = require("../../utils/dataHandler");
const { SecondFactorAuthBypassed } = require("../../utils/TestWithPlayWright/SecondFactorAuthBypassed");
const { BlackPasswordValidation } = require("../../utils/TestWithPlayWright/BlacnkPasswordANdUserName");
const { checkNonHTMLContentAccessibility } = require("../../utils/TestWithPlayWright/checkNonHtmlAccccesability");
const SensitiveDataStoredInLocalStorageModel = require("../../models/Security/SensitiveDataStoredInLocalStorage.model");
const SensitiveDataStoredInSessionStorageModel = require("../../models/Security/SensitiveDataStoredInSessionStorage.model");
const CLientSessionDataModel = require("../../models/Security/CLientSessionData.model");

router.get("/session-vulnurability", GetFileCOntentMiddleware, async (req, res) => {
    try {
        // Call the respective controller function
        const payload = { ...req.body, ...req.query, ...req.params, }
        let [sessiondata] = await SensitiveDataStoredInSessionStorageModel.aggregate([
            {
                $match: {
                    appid: req.user.appid,
                    subdomain: payload.domain
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
                                        $in: ["JSON Web Token", "$$dataItem.value"]
                                    },
                                    then: true,
                                    else: false
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
            }
        ]);
        let [localdata] = await SensitiveDataStoredInLocalStorageModel.aggregate([
            {
                $match: {
                    appid: req.user.appid,
                    subdomain: payload.domain
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
                                        $in: ["JSON Web Token", "$$dataItem.value"]
                                    },
                                    then: true,
                                    else: false
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
            }
        ]);
        let [sessionData] = await CLientSessionDataModel.aggregate([
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

        console.log({ sessiondata, localdata })
        const response = req.body.fileContent
        const data = await SessionVulnurability(response);
        // Initialize an object to store all possibilities
        const possibilities = {};
        if (localdata && localdata.containsJWT || sessiondata && sessiondata.containsJWT) {
            possibilities["Session Token Being Passed In Other Areas Apart From Cookies"] = "Yes"
        } else {
            possibilities["Session Token Being Passed In Other Areas Apart From Cookies"] = "No"
        }
        // Check if session expires on closing the browser
        possibilities["Session Does Not Expire On Closing The Browser"] = data.sessionExpireOnClose_data.length > 0 ? "Yes" : "Not Implemented";

        // Check if session timeout is high or not implemented
        const sessionTimeoutImplemented = data.sessionTimeout_data.length > 0;
        possibilities["Session Time-Out Is High (Or) Not Implemented"] = !sessionTimeoutImplemented ? "Not IMplemented" : data.sessionTimeout_data.toString();

        // Check if session token is passed in areas other than cookies


        // Check if an adversary can hijack user sessions by session fixation
        const sessionFixationPossible = data.sessionFixation_data.length > 0
        possibilities["An Adversary Can Hijack User Sessions By Session Fixation"] = sessionFixationPossible ? data.sessionFixation_data.toString() : "Not Implemented";

        // Check if the application is vulnerable to session hijacking attack
        const sessionHijackingPossible = data.sessionHijacking_data.length > 0
        possibilities["Application Is Vulnerable To Session Hijacking Attack"] = sessionHijackingPossible ? data.sessionHijacking_data.toString() : "Not Implemented";

        let results = []
        if (Object.keys(possibilities).length > 0) {
            results = Object.keys(possibilities).map((key) => {
                return {
                    [key]: possibilities[key]
                }
            })
        }
        return sendResponse(res, 200, "fetch", results)

    } catch (error) {
        console.log(error)
        return errorHandler(res, 500, error.message);
    }
});

router.get("/session-expire-on-close", GetFileCOntentMiddleware, async (req, res) => {
    try {
        // Call the respective controller function
        const response = req.body.fileContent
        const data = await sessionExpireOnClose(response);
        let results = data && data.length > 0 ? { "Session does not expire on closing the browser": "Yes" } : { "Session does not expire on closing the browser": "Not Implemented" }
        return sendResponse(res, 200, "dsad", [results])
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

// Route for checking session timeout
router.get("/session-timeout", GetFileCOntentMiddleware, async (req, res) => {
    try {
        // Call the respective controller function
        const response = req.body.fileContent
        const results = await sessionTimeoutWithObject(response);
        return sendResponse(res, 200, "dsad", results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

// Route for checking session token being passed in other areas apart from cookie
router.get("/session-token", GetFileCOntentMiddleware, async (req, res) => {
    try {
        // Call the respective controller function
        const response = req.body.fileContent
        const results = await sessionTokenWithObject(response);
        return sendResponse(res, 200, "dsad", results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

// Route for checking session fixation vulnerability
router.get("/session-fixation", GetFileCOntentMiddleware, async (req, res) => {
    try {
        // Call the respective controller function
        const response = req.body.fileContent
        const results = await sessionFixationWithobject(response);
        return sendResponse(res, 200, "dsad", results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

// Route for checking session hijacking vulnerability
router.get("/session-hijacking", GetFileCOntentMiddleware, async (req, res) => {
    try {
        // Call the respective controller function
        const response = req.body.fileContent
        const results = await sessionHijackingWithObject(response);
        return sendResponse(res, 200, "dsad", results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});
// Route for checking session hijacking vulnerability
router.get("/non-html-content-accessability", async (req, res) => {
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
});

router.get("/SecondFactorAuth", async (req, res) => {
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
}
);
router.get("/blankpasswordandusername", async (req, res) => {
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
}
);

// 

module.exports = router