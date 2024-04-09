const { sendResponse } = require("../../utils/dataHandler");
const axios = require("axios");
const { errorHandler } = require("../../utils/errorHandler");
const verifyEmail = require("../../utils/emailverify");
module.exports={
    sourcecodeDisclousoure:async(req,res)=>{
        try {
            let domain = req.query.domain
            let url = `http://${domain}/fileContent`;
                let response = await axios.get(url)
                if (response.status === 200) {
                
                    let data = response.data.map(item => {
                        return {
                            ...item,
                            directoryPath: item.directoryPath.replace(/\\/g, "/")
                        };
                    });
                    
                    sendResponse(res, 200, "success", data)
                } else {
                    sendResponse(res, 200, "success", [])
                }
          
           } catch (error) {
            console.log("error",error)
           }
    },
    DefaultWebPage:async(req,res)=>{
        try {
            let domain = req.query.domain
            let url = `http://${domain}/`;
                let response = await axios.get(url).then(response=>response).catch((e)=>e.response)
                if (response.status === 200) {
                    sendResponse(res, 200, "success", "Yes")
                } else if(response.status===404) {
                    sendResponse(res, 200, "success", "No")
                }
          
           } catch (error) {
            console.log(error.message)
              errorHandler(res,200,"No","No")
           }
    },
    emailHarvesting:async(req,res)=>{
       try {
        let {email}=req.body
        let isVerifyEmail=await verifyEmail(email)
        return sendResponse(res,200,"success",isVerifyEmail)
       } catch (error) {
        errorHandler(res,500,"fetch",error.message)
       }
    }
}