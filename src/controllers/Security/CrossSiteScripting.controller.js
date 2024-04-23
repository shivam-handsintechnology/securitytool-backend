const { error } = require("winston");
const { AllowedWebDomainsModel } = require("../../models/AllowedDomainsModel");
const { sendResponse } = require("../../utils/dataHandler");
const {errorHandler}=require("../../utils/errorHandler")
const { ScanCssVunurabiltyXss } = require("../../utils/scanClientData");
module.exports = {
    XSSCssVulnurabilty: async (req, res) => {
      try {
        console.log( req.user.appid)
        let isExist = await AllowedWebDomainsModel.findOne({ appid: req.user.appid, domain: req.query.domain });
        if (isExist) {
           let css=await ScanCssVunurabiltyXss(req.query.domain)
           return sendResponse(res, 200, "XSS Vulnerability Scanned Successfully", css)
        }
        else{
          
          return errorHandler(res, 401, "Domain Not Allowed")
        }
      } catch (error) {
        console.log("Error in Scanning XSS Vulnerability",error)
        return errorHandler(res, 500, "Error in Scanning XSS Vulnerability")
      }
    },
}