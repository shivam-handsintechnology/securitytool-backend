const { sendResponse } = require("../../utils/dataHandler");
const axios = require("axios");
const { errorHandler } = require("../../utils/errorHandler");
const { EmailVerifyModel, CrticalInformationInurl } = require("../../models/sensitivekeywordsModel");
module.exports={
    sourcecodeDisclousoure:async(req,res)=>{
        try {
            let domain = req.query.domain
            let url = `http://${domain}/fileContent`;
                let response = await axios.get(url)
                if (response.status === 200) {
                    return   sendResponse(res, 200, "success", response.data.data)
                } else {
                    return   sendResponse(res, 200, "success", [])
                }
          
           } catch (error) {
            console.log("error",error)
            return errorHandler(res,200,"No","No")
           }
    },
    DefaultWebPage:async(req,res)=>{
        try {
            let domain = req.query.domain
            let url = `http://${domain}/`;
                let response = await axios.get(url).then(response=>response).catch((e)=>e.response)
                if (response.status === 200) {
                  return  sendResponse(res, 200, "success", "Yes")
                } else if(response.status===404) {
                  return  sendResponse(res, 200, "success", "No")
                }
          
           } catch (error) {
            console.log(error.message)
            return errorHandler(res,200,"No","No")
           }
    },
  
    emailHarvesting:async(req,res)=>{
       try {
         let emailHarvest=false
         let {appid}=req.user
         let domain=req.query.domain
         let data=await EmailVerifyModel.findOne({appid,domain})
         if(data){
            emailHarvest=true
         }
         return sendResponse(res,200,"fetch",emailHarvest)
       } catch (error) {
        errorHandler(res,500,"fetch",error.message)
       }
    },
    SensitiveKeysinUrl: async (req, res) => {
        try {
            let { appid } = req.user;
            let {  type, page = 1, limit = 10,complete } = req.query; // Default to page 1 and page size of 10 if not provided
            page = parseInt(page);
            limit = parseInt(limit);
            
            let skip = (page - 1) * limit;
            let pipeline=[]
            if(!complete){
                pipeline= [{ $match: { appid, type } },
                    { $group: { _id: "$url", count: { $sum: 1 } } },
                    { $project: { labels: "$_id", values: "$count", _id: 0 } },
                    { $sort: { labels: 1 } }, 
                    { $skip: skip }, 
                    { $limit: limit }]
            }
            if(complete){
                pipeline= [{ $match: { appid, type } },
                    { $sort: { url: 1 } }, 
                    { $skip: skip }, 
                    { $limit: limit }]
            
            }
            let [totalCountData, data] = await Promise.all([
                CrticalInformationInurl.aggregate([
                    { $match: { appid, type } },
                    { $group: { _id: null, totalCount: { $sum: 1 } } }
                ]),
                CrticalInformationInurl.aggregate(pipeline)
            ]);
    
            let totalCount = totalCountData.length > 0 ? totalCountData[0].totalCount : 0;
             
            return sendResponse(res, 200, "fetch", { data, totalPages: Math.ceil(totalCount / limit) });
        } catch (error) {
           return errorHandler(res, 500, "fetch", error.message);
        }
    }
    ,
 
}