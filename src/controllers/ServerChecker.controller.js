const http = require('http');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const ResponseCodesLoginPageModels  = require('../models/ResponseCodesLoginPageModels');
const ServerErrorResponseCodes  = require('../models/ServerErrorResponseCodes');
const { ClearPasswordText } = require('../models/sensitivekeywordsModel');
const { PasswordValidateModel } = require('../models/PasswordVaildateModel');
const { hasRobotsTxt } = require('../utils/functions');
module.exports={
    getRobotsTxt:async (req, res) => {
          try {
            if(req.user){
              const d=await  hasRobotsTxt(`http://${req.user.domain}`)
              return sendResponse(res,200,d,d)
            }else{
              throw new Error("User not found")
            }
          } catch(err){
            console.log(err)
            errorHandler(res,500,err.message)
          }
    }
    ,
      PasswordValidatorController: async (req, res) => {
        try {
          const clear = await ClearPasswordText.findOne({},{_id:0})
          const PasswordValidatordata = await PasswordValidateModel.findOne({},{_id:0,__v:0})
          const data = {
            clear,
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
          const PasswordValidatordata=await ResponseCodesLoginPageModels.find({},{_id:0,__v:0,createdAt:0,updatedAt:0})
          return sendResponse(res,200,"data fetch",PasswordValidatordata)
        } catch (error) {
          console.error(error);
          res.write(`Error: ${error}`);
        }
      },
      ServerErrorResponseCodesController: async (req, res) => {
        try {
          const PasswordValidatordata=await ServerErrorResponseCodes.find({},{_id:0,__v:0,createdAt:0,updatedAt:0})
          return sendResponse(res,200,"data fetch",PasswordValidatordata)
        } catch (error) {
          console.error(error);
          res.write(`Error: ${error}`);
        }
      },
}