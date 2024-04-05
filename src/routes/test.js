var express = require('express');
var router = express.Router();
const ServerCheckerController = require('../controllers/ServerChecker.controller.js');
const EmailHarvestingController = require('../controllers/EmailHarvestingController/EmailHarvesting.controller');
const { sendResponse } = require('../utils/dataHandler');
const verifyToken = require('../middlewares/VerifyUser.js');
const { DomainValidationSchema } = require('../helpers/Validators.js');
const { ValidationMiddlewareQuery } = require('../middlewares/ValidationMiddleware.js');
router.post("/", async (req, res) => {
  return sendResponse(res, 200, "Sucessfull", req.body)
})
router.get('/EmailHarvestingsData', EmailHarvestingController.EmailHarvestingData);
router.get('/sensitiveinfoinurl', EmailHarvestingController.SensitiveinfoInUrl);
router.get('/sensitiveinfoinbody', EmailHarvestingController.SensitiveInfoInBody);
router.get('/defaultwebpage', EmailHarvestingController.DefaultWebPage);
router.get("/", (req, res) => {
  return sendResponse(res, 200, "Sucessfull", req.query)
})
router.get("/", (req, res) => {
  //console.log(req.body)
    (res, 200, "Sucessfull", req.body)
})
router.get("/robottxt",verifyToken,ValidationMiddlewareQuery(DomainValidationSchema) , ServerCheckerController.getRobotsTxt)
router.get("/PasswordValidatorController", ServerCheckerController.PasswordValidatorController)
router.get("/responsecodes", ServerCheckerController.ServerErrorResponseCodesController)
router.get("/reponsecodeslogin", ServerCheckerController.ResponseCodesLoginController)
router.get("/session-data", verifyToken, ServerCheckerController.sessionData)



module.exports = router