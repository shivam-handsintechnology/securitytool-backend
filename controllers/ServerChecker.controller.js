const http = require('http');
const mongoose = require('mongoose')
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const ResponseCodesLoginPageModels = require('../models/ResponseCodesLoginPageModels');
const ServerErrorResponseCodes = require('../models/ServerErrorResponseCodes');
const { PasswordValidateModel } = require('../models/PasswordVaildateModel');
const { hasRobotsTxt } = require('../utils/functions');
const { ClientLoagsModel } = require('../models/ClientLoagsModel');
const ErrorMessagesData = require("../data/ErrorMessagesData.json")
module.exports = {
  getRobotsTxt: async (req, res) => {
    try {

      await hasRobotsTxt(req.query.domain).then((d) => {
        return sendResponse(res, 200, d, d)
      }).catch((err) => {
        return sendResponse(res, 500, err, err)
      }
      )
      // return sendResponse(res, 200, d, d)


    } catch (err) {
      console.log("errorr", err)
      errorHandler(res, 500, err)
    }
  }
  ,
  PasswordValidatorController: async (req, res) => {
    try {
      const PasswordValidatordata = await PasswordValidateModel.findOne({}, { _id: 0, __v: 0 })
      const data = {
        PasswordValidatordata,
      };
      return sendResponse(res, 200, "data fetch", data);
    } catch (error) {
      console.error(error);
      return res.status(500).send(`Error: ${error.message}`);
    }
  },

  ResponseCodesLoginController: async (req, res) => {
    try {
      if (!req.query.hostname) {
        throw new Error("hostname is required")
      }
      const data = await ResponseCodesLoginPageModels.find({ user: req.user.id, hostname: req.query.hostname })
      return sendResponse(res, 200, "data fetch", data)
    } catch (error) {
      console.error(error.message);
      errorHandler(res, 500, error)
    }
  },
  ServerErrorResponseCodesController: async (req, res) => {
    try {
      let httpErrorMessage = ErrorMessagesData.http_error.map((d) => {
        return d.code
      })
      console.log("httpErrorMessage", httpErrorMessage)

      if (!req.query.hostname) {
        throw new Error("hostname is required")
      }
      let httpfivehundredErrormessage = ServerErrorResponseCodes.findOne({ user: mongoose.Types.ObjectId(req.user.id), hostname: req.query.hostname, ErrorStatuscode: 403 }) //Server returns HTTP 403 error message
      let HttpErrorMessage = ServerErrorResponseCodes.findOne({ user: mongoose.Types.ObjectId(req.user.id), hostname: req.query.hostname, ErrorStatuscode: { $in: [httpErrorMessage] } }) // Server returns HTTP error message
      const error_login_page = await ResponseCodesLoginPageModels.findOne({ user: mongoose.Types.ObjectId(req.user.id), hostname: req.query.hostname }); // Helpful error message displayed at login page
      // Extract the unique data array from the result

      let data = {
        "Helpful error message displayed at login page": error_login_page ? "Yes" : "No",
        "Server returns HTTP 403 error message": httpfivehundredErrormessage ? "Yes" : "No",
        "Server returns HTTP error message": HttpErrorMessage ? "Yes" : "No"
      }
      return sendResponse(res, 200, "data fetch", { ...data })
    } catch (error) {
      console.error(error);
      errorHandler(res, 500, error.message)
    }
  },
  sessionData: async (req, res) => {
    try {
      console.log("user_id", req.user.id)
      let data = await ClientLoagsModel.aggregate([
        { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
        { $project: { "LogsData": 1 } }
      ]);
      if (data.length === 0) {
        return sendResponse(res, 404, "Records are not found");
      }

      return sendResponse(res, 200, "Fetch all domains", data.length > 0 ? data[0]["LogsData"] : {});
    } catch (error) {
      return sendResponse(res, 500, error.message);

    }
  }

}