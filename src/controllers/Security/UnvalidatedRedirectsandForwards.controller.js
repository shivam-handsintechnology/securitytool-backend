const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");
const { scanRedirectvulnerability } = require("../../utils/scanClientData");

module.exports = {
   get:async(req,res)=>{
       try {
           let data= await scanRedirectvulnerability(req.body.fileContent)
        return sendResponse(res,200,"Unvalidated Redirects and Forwards",data);
       } catch (error) {
           return errorHandler(res,500,error.message);
       }
   }
}
