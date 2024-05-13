const { sendResponse } = require("../../utils/dataHandler");
const axios = require("axios");
const { errorHandler } = require("../../utils/errorHandler");
module.exports={
    async Managementinterface(req,res){
       try {
       let response= await axios.get(`https://${req.query.domain}`)
          console.log(response.status)
          if(response.status===200 || response.status===404){
            return sendResponse(res, 200, "success", "No, access is open to all IPs.")
          }else{
            return sendResponse(res, 200, "success", "Yes, only designated IPs have access")
          }
       } catch (error) {
          return sendResponse(res, 200, "success", "Yes, only designated IPs have access")
       }
    }
}