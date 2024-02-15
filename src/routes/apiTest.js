var express = require('express');
const { sendResponse } = require('../utils/dataHandler');
var router = express.Router();
const ServerCheckerController = require('../controllers/ServerChecker.controller.js');
router.post("/", async (req, res) => {
  return sendResponse(res, 200, "Sucessfull", req.body)
})
router.get("/", (req, res) => {
  return sendResponse(res, 200, "Sucessfull", req.query)
})
router.get("/", (req, res) => {
  (res, 200, "Sucessfull", req.query)
})
router.get("/robottxt", ServerCheckerController.getRobotsTxt)




module.exports = router