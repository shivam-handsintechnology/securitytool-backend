var express = require('express');
var router = express.Router();
const ServerCheckerController = require('../controllers/ServerChecker.controller.js');
const EmailHarvestingController = require('../controllers/EmailHarvestingController/EmailHarvesting.controller');
const { sendResponse } = require('../utils/dataHandler');
const crypto = require('crypto');
router.post("/", async (req, res) => {
    return sendResponse(res, 200, "Sucessfull", req.body)
})
router.get('/EmailHarvestingsData', EmailHarvestingController.EmailHarvestingData);
router.get('/sensitiveinfoinurl', EmailHarvestingController.SensitiveinfoInUrl);
router.get('/sensitiveinfoinbody', EmailHarvestingController.SensitiveInfoInBody);
// router.get('/defaultwebpage', EmailHarvestingController.DefaultWebPage);
router.get("/", (req, res) => {
  return sendResponse(res, 200, "Sucessfull", req.query)
})
router.get("/", (req, res) => {
  console.log(req.body)
  (res, 200, "Sucessfull", req.body)
})
router.get("/robottxt", ServerCheckerController.getRobotsTxt)
router.get("/PasswordValidatorController", ServerCheckerController.PasswordValidatorController)
router.get("/responsecodes", ServerCheckerController.ServerErrorResponseCodesController)
router.get("/reponsecodeslogin", ServerCheckerController.ResponseCodesLoginController)
router.get('/set-session-cookie', (req, res) => {
  res.cookie('session-id', 'your-session-data', {
    session: true // Set cookie to expire when the browser is closed
  });
  return res.send('Session cookie set');
});
router.get('/profile', (req, res) => {
  console.log(req.session)

  if (req.session.user) {
    const user = req.session.user;
    return res.send(`Welcome ${user.firstName} ${user.lastName}!`);
  } else {
    return res.send('Please log in to view your profile.');
  }
});
router.get('/remember', (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    return res.send(`Welcome ${user.firstName} ${user.lastName}!`);
  } else {
    return res.send('Please log in to view your profile.');
  }
});
router.get('/hash/:algorithm', (req, res) => {
  const algorithm = req.params.algorithm;
  const message = req.query.message;
  if (!message) {
    return res.status(400).send('Missing required parameter: message');
  }
  if (!crypto.getHashes().includes(algorithm)) {
    return res.status(400).send(`Unsupported algorithm: ${algorithm}`);
  }
  const hash = crypto.createHash(algorithm).update(message).digest('hex');
  res.send(hash);
});
router.get('/allhashesh', (req, res) => {
 
  let listOfSupportedHashes = crypto.getHashes();
  
  if (!listOfSupportedHashes) {
    return res.status(400).send('Missing required parameter: message');
  }
return sendResponse(res,200,"all hsh list",listOfSupportedHashes)
});
  
module.exports = router