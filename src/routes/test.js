var express = require('express');
var router = express.Router();
const ServerCheckerController = require('../controllers/ServerChecker.controller.js');
const EmailHarvestingController = require('../controllers/EmailHarvestingController/EmailHarvesting.controller');
const { sendResponse } = require('../utils/dataHandler');
router.post("/", async (req, res) => {
  return sendResponse(res, 200, "Sucessfull", req.body)
})
router.get('/defaultwebpage', EmailHarvestingController.DefaultWebPage);
router.get("/PasswordValidatorController", ServerCheckerController.PasswordValidatorController)



module.exports = router