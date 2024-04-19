// const { default: axios } = require("axios")
const { sensitiveinfoinbodyModel } = require("../../models/SensitiveInfoInBodyModel")
const { EmailVerifyModel, CrticalInformationInurl } = require("../../models/sensitivekeywordsModel")
const { sendResponse } = require("../../utils/dataHandler")
const { errorHandler } = require("../../utils/errorHandler")
exports.EmailHarvestingData = (req, res) => {
   EmailVerifyModel.find({}).then((r) => {
      if (r.length === 0) return sendResponse(res, 404, "NotFound", r)
      if (r.length > 0) return sendResponse(res, 200, "emasil harveting", r)
   }).catch((e) => {
      return errorHandler(res, 500, "Error", e.message)
   })
}
exports.SensitiveInfoInBody = (req, res) => {
   sensitiveinfoinbodyModel.find({}).then((r) => {

      if (r.length === 0) return sendResponse(res, 404, "NotFound", r)
      if (r.length > 0) return sendResponse(res, 200, "emasil harveting", r)
   }).catch((e) => {
      return errorHandler(res, 500, "Error", e.message)
   })
}
exports.SensitiveinfoInUrl = (req, res) => {
   CrticalInformationInurl.find({}).then((r) => {
   
      if (r.length === 0) return sendResponse(res, 404, "NotFound", r)
      if (r.length > 0) return sendResponse(res, 200, "sensitivekeywordsFoundModel", r)
   }).catch((e) => {
      return errorHandler(res, 500, "Error", e.message)
   })
}
exports.DefaultWebPage = async (req, res) => {

   try {
      const url = `${req.protocol}://${req.hostname}:${req.socket.localPort}`;
  
      await axios.get(url)
         .then((d) => {
            return sendResponse(res, 200, "Default web page present in browser", {
               DefaulWebPage: "Default web page present in browser"
            });
         })
         .catch((e) => {
            if (e.response.status === 404) {
               return sendResponse(res, 200, "Default web page not present in browser", {
                  DefaulWebPage: "Default web page not present in browser"
               });
            }
         });
   } catch (error) {
      console.error(error);
      return errorHandler(res);
   }
}
