const { sendResponse } = require("../../utils/dataHandler");
const axios=require("axios");
const { errorHandler } = require("../../utils/errorHandler");
const { hashttpParametersPollutionavailable } = require("../../utilities/functions/functions");

module.exports = {
    DirectoryListingEnable:async(req,res)=>{
      let StatusCode=500
        try {
            let domain = req.query.domain
            let url = `http://${domain}/DirectoryListingEnable`;
                let response = await axios.get(url)
                if (response.status === 200) {
              
                  return   sendResponse(res, 200, "success",response.data)
                } else {
                  StatusCode=403
                  throw new Error("Access Denied")
                }
          
           } catch (error) {
           return errorHandler(res, StatusCode, error.message)
           }
    },
    robotsTxtPath:async(req,res)=>{
             try {
              let isRobotsTxt=false
              let filecontent=req.body.fileContent
               if(filecontent.length>0 && filecontent.find((item)=>item.name==="robots")){
                isRobotsTxt=true
               }
                
                  data=isRobotsTxt?"Yes":"No"
              
                return sendResponse(res, 200, "success", data)
             } catch (error) {
              console.log(error)
              return errorHandler(res, 500, error.message)
             }
            },
    httpparameterpollution:async(req,res)=>{
      let StatusCode=500
    try {
        let domain = req.query.domain
        let url = `http://${domain}/sitescanner?id=1&id=2&id=3`;
            let response = await axios.get(url)
            if (response.status === 200) {
              let isHttp = await hashttpParametersPollutionavailable(response.data)
              return   sendResponse(res, 200, "success",isHttp)
            } else {
              StatusCode=403
              throw new Error("Access Denied")
            }
       }
        catch (error) {
        return errorHandler(res, StatusCode, error.message)
        }
 
          
    }
}