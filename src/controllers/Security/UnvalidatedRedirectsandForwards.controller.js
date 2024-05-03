const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");
const { scanRedirectvulnerability } = require("../../utils/scanClientData");

module.exports = {
   get:async(req,res)=>{
       try {
        if(req.method!=="GET") return errorHandler(res, 405, "Method Not Allowed");
           let data= await scanRedirectvulnerability(req.body.fileContent)
        return sendResponse(res,200,"Unvalidated Redirects and Forwards",data);
       } catch (error) {
        console.log(error)
           return errorHandler(res,500,error.message);
       }
   }
}
