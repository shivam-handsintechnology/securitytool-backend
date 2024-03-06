const http = require('http');
const mongoose = require('mongoose')
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const ResponseCodesLoginPageModels = require('../models/ResponseCodesLoginPageModels');
const ServerErrorResponseCodes = require('../models/ServerErrorResponseCodes');
const { PasswordValidateModel } = require('../models/PasswordVaildateModel');
const { hasRobotsTxt } = require('../utils/functions');
const { ClientLoagsModel } = require('../models/ClientLoagsModel');
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
      const PasswordValidatordata = await ResponseCodesLoginPageModels.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })
      return sendResponse(res, 200, "data fetch", PasswordValidatordata)
    } catch (error) {
      console.error(error);
      res.write(`Error: ${error}`);
    }
  },
  ServerErrorResponseCodesController: async (req, res) => {
    try {
      const PasswordValidatordata = await ServerErrorResponseCodes.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })
      return sendResponse(res, 200, "data fetch", PasswordValidatordata)
    } catch (error) {
      console.error(error);
      res.write(`Error: ${error}`);
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