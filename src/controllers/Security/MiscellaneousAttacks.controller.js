const testSqlWildcardDos = require("../../utils/TestWithPlayWright");
const { TestLockoutFeature } = require("../../utils/TestWithPlayWright");
const { MiscellaneousAttacks } = require("../../utils/TestWithPlayWright");


module.exports = {
    // Use input validation to sanitize user inputs
    handleSpecialCharacters: async (req, res) => {
        try {

            const domain = req.query.domain
            const fullurl = `${req.protocol}://${req.get('host')}/api/videostream/`
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
            const results = await MiscellaneousAttacks(`https://${domain}/`, res, SendEvent, fullurl);
            console.log('Scanning completed:', results);

            SendEvent({ message: "Scanning completed", time: Date.now(), complete: true }, res);
            res.end(); // End the response after sending all data
        } catch (error) {
            console.error('Error occurred while scanning:', error);
            res.write(`data: ${JSON.stringify({ message: error.message, complete: true })} \n\n`)
            res.end(); // Ensure response is ended in case of error
        }

        // Implement logic to handle special characters in user inputs
    },


    // Add temporary account lockout after multiple failed login attempts
    handleAccountLockout: async (req, res) => {
        // Implement logic to lock user accounts temporarily after multiple failed login attempts
        try {

            const domain = req.query.domain
            const attempt = parseInt(req.query.attempt, 10);
            const duration = parseInt(req.query.duration, 10);
            const fullurl = `${req.protocol}://${req.get('host')}/api/videostream/`
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
            const results = await TestLockoutFeature(`https://${domain}/`, res, SendEvent, fullurl, attempt, duration);
            console.log('Scanning completed:', results);

            SendEvent({ message: "Scanning completed", time: Date.now(), complete: true }, res);
            res.end(); // End the response after sending all data
        } catch (error) {
            console.error('Error occurred while scanning:', error);
            res.write(`data: ${JSON.stringify({ message: error.message, complete: true })} \n\n`)
            res.end(); // Ensure response is ended in case of error
        }
    },



    // Prevent DOS attacks using SQL wildcards by parameterizing queries
    SqlWildcards: async (req, res) => {
        try {

            const domain = req.query.domain
            const fullurl = `${req.protocol}://${req.get('host')}/api/videostream/`
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
            const results = await testSqlWildcardDos(`https://${domain}/`, res, SendEvent, fullurl);
            console.log('Scanning completed:', results);
            SendEvent({ message: "Scanning completed", time: Date.now(), complete: true }, res);
            res.end(); // End the response after sending all data
        } catch (error) {
            console.error('Error occurred while scanning:', error);
            res.write(`data: ${JSON.stringify({ message: error.message, complete: true })} \n\n`)
            res.end(); // Ensure response is ended in case of error
        }

        // Implement logic to handle special characters in user inputs
    }
}
