var express = require('express');
const isValidHostname = require('../utils/hostNamevalidator');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
var router = express.Router();
/* GET home page. */
router.get('/', async function (req, res) {
  const Authenticate = { Authenticate: true }
  return sendResponse(res, 200, "welcome to the express app", Authenticate)
});
router.get('/ssl', async (request, response) => {
  try {
    //console.log(request.hostname)
    var hostname = request.hostname
    // var hostname='sercuritytool.handsintechnology.in'
    if (hostname == 'localhost') {
      throw new Error("localhost not allowed")
    }
    let Isvalidhost = isValidHostname(request.hostname)
    if (Isvalidhost == true) {
      const https = require('https');
      // const validator = require('validator');
      const getDaysBetween = (validFrom, validTo) => {
        return Math.round(Math.abs(+validFrom - +validTo) / 8.64e7);
      };
      const getDaysRemaining = (validFrom, validTo) => {
        const daysRemaining = getDaysBetween(validFrom, validTo);
        if (new Date(validTo).getTime() < new Date().getTime()) {
          return -daysRemaining;
        }
        return daysRemaining;
      };
      const options = {
        agent: false,
        method: 'HEAD',
        rejectUnauthorized: false,
        hostname: hostname
      };

      if (hostname !== 'localhost') {
        const req = https.request(options, res => {
          var SecureCookies;
          const cookies = res.headers['set-cookie'] || [];
          const insecureCookies = cookies.filter((cookie) => !/;\s*secure/i.test(cookie));
          if (insecureCookies.length > 0) {
            SecureCookies = 'Website uses insecure cookies:', insecureCookies
            //console.log('Website uses insecure cookies:', insecureCookies);
          } else {
            SecureCookies = 'Website does not use insecure cookies'
            //console.log('Website does not use insecure cookies');
          }
          const crt = req.socket.getPeerCertificate()
          let CA = crt.issuer['CN']
          CA = CA.includes('CA') ? "Your Certificate is Certified" : CA.includes('Self-Signed') ? "Your Certificate is Self Signed" : "Certificate issuer Not Found"
          let vFrom = crt.valid_from, vTo = crt.valid_to;
          var validTo = new Date(vTo);
          var CheckCurrentDate = new Date()
          validTo = new Date(validTo);
          CheckCurrentDate = new Date(CheckCurrentDate);
          //console.log({ currentDate: CheckCurrentDate })
          //console.log({ validTo: validTo })
          if (CheckCurrentDate < validTo) {
            // console.log(
            //   "CheckCurrentDate is not expire",
            // );
          } else {
            // console.log(
            //   "CheckCurrentDate is expired"
            // );
          }
          //console.log(request.protocol)
          let obj = {
            daysRemaining: getDaysRemaining(new Date(), validTo),
            valid: res.socket.authorized ? "The website has a valid SSL certificate." : "The website has not a valid SSL certificate.",
            validFrom: new Date(vFrom).toISOString(),
            SecureCookies,
            validTo: CheckCurrentDate < validTo ? `Expired on ${validTo.toISOString()}` : `Expired already on ${validTo.toISOString()}`,
            // certfile:crt.raw.toString('base64'),
            // keyfile:crt.pubkey.toString('base64'),
            protocol: request.protocol === "https" ? "Connection is Secure" : "Connection is not secure",
            CA
          }
          //console.log(obj)
          return sendResponse(response, 200, "SSL Certificate found", obj)
        });
        req.on('error', (data) => {
          //console.log(data)
        });
        req.end();
      }


      // 
    } else {
      return sendResponse(response, 401, "hostname is not valid")
      // res.status(401).send("hostname is not valid")
    }
  } catch (error) {
    //console.log(error)
    return errorHandler(response, 500, error.message, { message: error.message })
  }
})

module.exports = router;