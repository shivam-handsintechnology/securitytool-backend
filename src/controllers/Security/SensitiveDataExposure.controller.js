const { sendResponse } = require("../../utils/dataHandler");
const axios = require("axios");
const { errorHandler } = require("../../utils/errorHandler");
const { EmailVerifyModel, CrticalInformationInurl } = require("../../models/sensitivekeywordsModel");
const {checkServerFingerprinting, Full_Path_Disclosure} = require("../../utils/AppFingerPrinting");
const { scanHardCodedData } = require("../../utils/scanClientData");
const { ServerDataInPlaintextModel } = require("../../models/Security/SecurityMisconfiguration.model");
const { PasswordValidateModel } = require("../../models/PasswordVaildateModel");

module.exports={
    sourcecodeDisclousoure:async(req,res)=>{
        try {
           return   sendResponse(res, 200, "success", req.body.fileContent)
              
           } catch (error) {
         
            return errorHandler(res,200,"No","No")
           }
    },
    DefaultWebPage:async(req,res)=>{
        let status = 500
        try {
            let domain = req.query.domain
            let url = `http://${domain}/`;
                let response = await axios.get(url).then(response=>response).catch((e)=>e.response)
                if (response.status === 200) {
                  return  sendResponse(res, 200, "success", "Yes")
                } else if(response.status===404) {
                  return  sendResponse(res, 200, "success", "No")
                }else{
                    return  sendResponse(res, 200, "success", "No")
                }
              
          
           } catch (error) {
         
            return errorHandler(res,200,"No","No")
           }
    },
  
    emailHarvesting:async(req,res)=>{
       try {
        let {complete}=req.query
         let emailHarvest=false
         let {appid}=req.user
         let domain=req.query.domain
         let data=await EmailVerifyModel.aggregate([
          {
            $match: { appid,domain }
          },
          {
            $group: {
              _id: "$email",
              count: { $sum: 1 }
            }
          }
         ])
         if(data.length>0){
            emailHarvest=true
         }
         
         return sendResponse(res,200,"fetch",complete?data:emailHarvest)
       } catch (error) {
        errorHandler(res,500,"fetch",error.message)
       }
    },
    SensitiveKeysinUrl: async (req, res) => {
        try {
            let { appid } = req.user;
            let {  type, page = 1, limit = 1,complete,domain,isQuestion="" } = req.query; // Default to page 1 and page size of 10 if not provided
            page = parseInt(page);
            limit = parseInt(limit);
            let skip = (page - 1) * limit;
            let pipeline=[]
            
            if(!complete){
                pipeline= [{ $match: { appid, type,domain } },
                    { $group: { _id: "$url", count: { $sum: 1 } } },
                    { $project: { labels: "$_id", values: "$count", _id: 0 } },
                    { $sort: { labels: 1 } }, 
                    { $skip: skip }, 
                    { $limit: limit }]
            }
            if(complete){
                pipeline= [{ $match: { appid, type,domain } },
                    { $sort: { url: 1 } }, 
                    { $skip: skip }, 
                    { $limit: limit }]
            
            }
            if(isQuestion){
                pipeline= [{ $match: { appid, type,domain } },
                    { $group: { _id: "$url", count: { $sum: 1 } } },
                    { $project: { labels: "$_id", values: "$count", _id: 0 } },
                    { $sort: { labels: 1 } }, 
                    { $skip: skip }, 
                    { $limit: limit }]
            }
            let [totalCountData, data] = await Promise.all([
                CrticalInformationInurl.aggregate([
                    { $match: { appid, type,domain } },
                    { $group: { _id: null, totalCount: { $sum: 1 } } }
                ]),
                CrticalInformationInurl.aggregate(pipeline)
            ]);
    
            let totalCount = totalCountData.length > 0 ? totalCountData[0].totalCount : 0;
            let response={
                data,
                totalPages: Math.ceil(totalCount / limit)
            }
            if(isQuestion){
                response=data
            }
            return sendResponse(res, 200, "fetch", response);
        } catch (error) {
           return errorHandler(res, 500, "fetch", error.message);
        }
    }
    ,
    FingerprintDetection: async (req, res) => {
        try {
            let {  domain } = req.query; // Default to page 1 and page size of 10 if not provided
             let data=await checkServerFingerprinting(domain)
             return sendResponse(res, 200, "fetch", data);
        } catch (error) {
           return errorHandler(res, 500, "fetch", error.message);
        }
    }
    ,
    ServerPathDisclosure: async (req, res) => {
        try {
            let {  domain } = req.query; // Default to page 1 and page size of 10 if not provided
             let data=await Full_Path_Disclosure(domain)
             return sendResponse(res, 200, "fetch", data);
        } catch (error) {
           return errorHandler(res, 500, "fetch", error.message);
        }
    }
    ,
    ServerFileAvailbleInCLearText:async(req,res)=>{
        try {
            let fileContent = req.body.fileContent
          let data=await scanHardCodedData(fileContent)
            return sendResponse(res, 200, "fetch", data);
           } catch (error) {
         
            return errorHandler(res,200,"No","No")
           }
    },
    SensitiveDataInPlainText: async (req, res) => {
        let status = 500
     try {

        let domain = req.query.domain
        let appid = req.user.appid

        let esxistpsesitiveData = await ServerDataInPlaintextModel.findOne( { domain: domain, appid: appid });
        if(esxistpsesitiveData == null){
            status = 404
            throw new Error("No data found")
        }
         return sendResponse(res, 200, "success", esxistpsesitiveData)
     } catch (error) {
        console.log(error)
        return errorHandler(res, status, error.message)
     }
    },
    ClearPasswordtext:async(req,res)=>{
        try {
            let {appid}=req.user
            let domain=req.query.domain
            let data=await PasswordValidateModel.aggregate([
             {
               $match: { appid,domain:"localhost:8000" }
             },
            ])
            return sendResponse(res,200,"fetch",data)
          } catch (error) {
           errorHandler(res,500,"fetch",error.message)
          }
    }
 
}