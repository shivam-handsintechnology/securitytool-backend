
const router = require("express").Router()
const { SecondFactorAuthBypassed } = require("../../utils/TestWithPlayWright/SecondFactorAuthBypassed");
const { BlackPasswordValidation } = require("../../utils/TestWithPlayWright/BlacnkPasswordANdUserName");
const { checkNonHTMLContentAccessibility } = require("../../utils/TestWithPlayWright/checkNonHtmlAccccesability");
const AuthSessionGurdiancontroller = require('../../controllers/Security/AuthSession.controlller')

router.get("/session-vulnurability", AuthSessionGurdiancontroller.SessionVulnurbilityCOntroller);

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