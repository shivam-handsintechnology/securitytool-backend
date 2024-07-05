const { sendResponse } = require("../../utils/dataHandler");
const axios = require("axios");
const PasswordChangeTest = require("../../utils/TestWithPlayWright/PasswordChangeTest");
module.exports = {
   async Managementinterface(req, res) {
      try {
         let response = await axios.get(`https://${req.query.domain}`)
         console.log(response.status)
         if (response.status === 200 || response.status === 404) {
            return sendResponse(res, 200, "success", "No, access is open to all IPs.")
         } else {
            return sendResponse(res, 200, "success", "Yes, only designated IPs have access")
         }
      } catch (error) {
         return sendResponse(res, 200, "success", "Yes, only designated IPs have access")
      }
   },
   passWordChangeAttack: async (req, res) => {
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
         const results = await PasswordChangeTest(`https://${domain}/`, res, SendEvent, fullurl);
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
}