const { Project_Security_Logs } = require("../../models/Project_Security_Logs");
const { sendResponse } = require("../../utils/dataHandler");
const {errorHandler}=require("../../utils/errorHandler")
const mongoose = require("mongoose");
module.exports = {
    // XSSCssVulnurabilty: async (req, res) => {
    //   try {
        
    //     console.log( req.user.appid)
    //     let isExist = await AllowedWebDomainsModel.aggregate([
    //       {
    //         $match: {
    //           appid: req.user.appid,
    //         },
    //       },
    //     ]);

    //     if (isExist.length === 0) {
    //       return errorHandler(res, 404, "Application not found");
    //     }
    //     if (isExist.length > 0) {
    //       let data = await Promise.all(isExist.map(async (data) => {
    //         if (data.domain.includes("localhost")) {
    //           return []; // Return an empty array for localhost entries
    //         } else {
    //           let response = await ScanCssVunurabiltyXss(data.domain);
    //           return response;
    //         }
    //       }));
        
    //       // Merge arrays and filter out undefined values
    //       data = data.flatMap(item => item).filter(Boolean);
        
    //       return sendResponse(res, 200, "Scanned Successfully", data);
    //     }
        
    //   } catch (error) {
    //     console.log("Error in Scanning XSS Vulnerability",error)
    //     return errorHandler(res, 500, "Error in Scanning XSS Vulnerability")
    //   }
    // },
    XSSvulnurability: async (req, res) => {
      try {
          const pipeline = [
              {
                  $match: {
                    user:new  mongoose.Types.ObjectId(req.user.id),
                  },
              },
              {
                  $facet: {
                      xssInjection: [
                          { $match: { type: 'xss-injection' } },
                          { $count: 'count' },
                      ],
                      css: [
                          { $match: { type: 'CSS' } },
                          { $count: 'count' },
                      ],
                      iFrame: [
                          { $match: { type: 'IFrame' } },
                          { $count: 'count' },
                      ],
                  },
              },
              { $limit: 1 },
          ];
  
          const data = await Project_Security_Logs.aggregate(pipeline);
  
          let result =
           {
              'Application is vulnerable to Cross Site Scripting attack':data.length>0 && data[0].xssInjection.length > 0 ? 'Yes' : 'No',
              'Application is vulnerable to stored Cross Site Scripting attack':data.length>0 && data[0].xssInjection.length > 0 ? 'Yes' : 'No',
              'Is XSS possible via CSS injection ?':data.length>0 &&  data[0].css.length > 0 ? 'Yes' : 'No',
              'Application is vulnerable to cross frame scripting':data.length>0 &&  data[0].iFrame.length > 0 ? 'Yes' : 'No',
          };
  
          return sendResponse(res, 200, 'Data fetched successfully',result);
      } catch (error) {
          return errorHandler(res, 500, error.message);
      }
  }
}