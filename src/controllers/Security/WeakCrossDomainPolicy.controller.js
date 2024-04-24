const { AllowedWebDomainsModel } = require("../../models/AllowedDomainsModel");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");

// Weak Cross domain policy
module.exports={
    // Is "Origin" header in client request validated at the server?
    isOriginHeaderValidated:async  function(req, res){
         try {
            let domainData = await AllowedWebDomainsModel.aggregate([
                {
                  $match: {
                    appid: req.user.appid,
                  },
                },
                {
                  $group: {
                    _id: null,
                    domains: { $addToSet: "$domain" },
                  },
                },
              ]);
              
            let domainsArray = domainData.length > 0 ? domainData[0].domains : [];
            if (domainsArray.length === 0) {
              return errorHandler(res, 404, "Application not found");
            }
            if (domainsArray.length > 0) {
                let response = await fetch(`http://${req.query.domain}`)
                let OriginAtServer =  response.headers.get('Access-Control-Allow-Origin')
                console.log(OriginAtServer)
                if (!domainsArray.includes(OriginAtServer)) {
                    return errorHandler(res, 200, "Origin header in client request is not validated at the server") 
                } 
                if(domainsArray.includes(OriginAtServer)){
                return sendResponse(res, 200, "Origin header in client request is validated at the server", OriginAtServer)
                }
            }
            
         } catch (error) {
             return errorHandler(res, 500, "Error in validating Origin header in client request at the server")
         }
  
        }
        
    }
    
