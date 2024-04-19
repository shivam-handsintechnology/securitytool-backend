
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const { PasswordValidateModel } = require('../models/PasswordVaildateModel');

module.exports = {

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

  
  
 

}