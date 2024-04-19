const { sendResponse } = require("../../utils/dataHandler");
const axios=require("axios");
const { errorHandler } = require("../../utils/errorHandler");

module.exports = {
    DirectoryListingEnable:async(req,res)=>{
        try {
            let domain = req.query.domain
            let url = `http://${domain}/DirectoryListingEnable`;
                let response = await axios.get(url)
                if (response.status === 200) {
              
                  return   sendResponse(res, 200, "success",response.data)
                } else {
                  throw new Error("Access Denied")
                }
          
           } catch (error) {
           return errorHandler(res, 500, error.message)
           }
    },
    robotsTxtPath:async(req,res)=>{
             try {
              let isRobotsTxt=false
              let filecontent=req.body.fileContent
               if(filecontent.length>0 && filecontent.find((item)=>item.name==="robots")){
                isRobotsTxt=true
               }
                let data={
                  "The remote server contains a ‘robots.txt’ file":isRobotsTxt?"Yes":"No"
                }
                return sendResponse(res, 200, "success", data)
             } catch (error) {
              console.log(error)
              return errorHandler(res, 500, error.message)
             }
            }
}