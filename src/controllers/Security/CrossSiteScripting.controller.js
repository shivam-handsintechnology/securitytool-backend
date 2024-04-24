const { error } = require("winston");
const { AllowedWebDomainsModel } = require("../../models/AllowedDomainsModel");
const { sendResponse } = require("../../utils/dataHandler");
const {errorHandler}=require("../../utils/errorHandler")
const { ScanCssVunurabiltyXss } = require("../../utils/scanClientData");
module.exports = {
    XSSCssVulnurabilty: async (req, res) => {
      try {
        
        console.log( req.user.appid)
        let isExist = await AllowedWebDomainsModel.aggregate([
          {
            $match: {
              appid: req.user.appid,
            },
          },
        ]);

        if (isExist.length === 0) {
          return errorHandler(res, 404, "Application not found");
        }
        if (isExist.length > 0) {
          let data = await Promise.all(isExist.map(async (data) => {
            if (data.domain.includes("localhost")) {
              return []; // Return an empty array for localhost entries
            } else {
              let response = await ScanCssVunurabiltyXss(data.domain);
              return response;
            }
          }));
        
          // Merge arrays and filter out undefined values
          data = data.flatMap(item => item).filter(Boolean);
        
          return sendResponse(res, 200, "Scanned Successfully", data);
        }
        
      } catch (error) {
        console.log("Error in Scanning XSS Vulnerability",error)
        return errorHandler(res, 500, "Error in Scanning XSS Vulnerability")
      }
    },
}