
const router = require("express").Router()
const { errorHandler } = require("../../utils/errorHandler");
const { sessionExpireOnClose, sessionTimeoutWithObject, sessionFixationWithobject, sessionHijackingWithObject, sessionTokenWithObject, SessionVulnurability } = require("../../helpers/SessionVulnurabiltyChecker");
const { checkNonHTMLContentAccessibility } = require("./Scan/checkNonHtmlAccccesability");
const GetFileCOntentMiddleware = require("../../middlewares/GetFileCOntentMiddleware");

router.get("/session-vulnurability", GetFileCOntentMiddleware, async (req, res) => {
    try {
        // Call the respective controller function
        const response = req.body.fileContent
        const data = await SessionVulnurability(response);
        // Initialize an object to store all possibilities
        const possibilities = {};

        // Check if session expires on closing the browser
        possibilities["Session Does Not Expire On Closing The Browser"] = data.sessionExpireOnClose_data.length > 0 ? "Yes" : "Not Implemented";

        // Check if session timeout is high or not implemented
        const sessionTimeoutImplemented = data.sessionTimeout_data.length > 0;
        possibilities["Session Time-Out Is High (Or) Not Implemented"] = !sessionTimeoutImplemented ? "Not IMplemented" : data.sessionTimeout_data.toString();

        // Check if session token is passed in areas other than cookies
        possibilities["Session Token Being Passed In Other Areas Apart From Cookies"] = data.sessionToken_data.length > 0 ? data.sessionToken_data.toString() : "Not Implemented";

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
        const SerEnventData = (data, res = res) => {
            res.write(`data:${JSON.stringify(data)} \n\n`);
        }
        SerEnventData({ message: "Scanning started", time: Date.now() }, res);
        const results = await checkNonHTMLContentAccessibility(`https://${domain}`, res, SerEnventData);
        console.log('Scanning completed:', results);

        SerEnventData({ message: "Scanning completed", time: Date.now(), complete: true }, res);
        res.end(); // End the response after sending all data
    } catch (error) {
        console.error('Error occurred while scanning:', error);
        res.write(`data: ${JSON.stringify({ message: error.message })} \n\n`)
        res.end(); // Ensure response is ended in case of error
    }
});

router.get("Second-factor-authentication-could-be-bypassed", async (req, res) => {
    try {
        // Call the respective controller function
        const response = req.body.fileContent
        const results = await sessionHijackingWithObject(response);
        return sendResponse(res, 200, "dsad", results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
}
);

// 

module.exports = router