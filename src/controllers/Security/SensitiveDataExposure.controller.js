const { sendResponse } = require("../../utils/dataHandler");
const axios = require("axios");
const { errorHandler } = require("../../utils/errorHandler");
const {  CrticalInformationInurl } = require("../../models/sensitivekeywordsModel");
const {checkServerFingerprinting, Full_Path_Disclosure} = require("../../utils/AppFingerPrinting");
const { scanHardCodedData } = require("../../utils/scanClientData");
const { ServerDataInPlaintextModel } = require("../../models/Security/SecurityMisconfiguration.model");
const { PasswordValidateModel } = require("../../models/PasswordVaildateModel");

module.exports={
    sourcecodeDisclousoure:async(req,res)=>{
        try {
           return   sendResponse(res, 200, "success", [...req.body.fileContent,{
            
                "name": "getPosts",
                "type": "file",
                "extension": "",
                "content": "import User from '../models/user.model.js';\nimport bcryptjs from 'bcryptjs';\nimport { errorHandler } from '../utils/error.js';\nimport jwt from 'jsonwebtoken';\n\nexport const signup = async (req, res, next) => {\n  const { username, email, password } = req.body;\n\n  if (\n    !username ||\n    !email ||\n    !password ||\n    username === '' ||\n    email === '' ||\n    password === ''\n  ) {\n    next(errorHandler(400, 'All fields are required'));\n  }\n\n  const hashedPassword = bcryptjs.hashSync(password, 10);\n\n  const newUser = new User({\n    username,\n    email,\n    password: hashedPassword,\n  });\n\n  try {\n    await newUser.save();\n    res.json('Signup successful');\n  } catch (error) {\n    next(error);\n  }\n};\n\nexport const signin = async (req, res, next) => {\n  const { email, password } = req.body;\n\n  if (!email || !password || email === '' || password === '') {\n    next(errorHandler(400, 'All fields are required'));\n  }\n\n  try {\n    const validUser = await User.findOne({ email });\n    if (!validUser) {\n      return next(errorHandler(404, 'User not found'));\n    }\n    const validPassword = bcryptjs.compareSync(password, validUser.password);\n    if (!validPassword) {\n      return next(errorHandler(400, 'Invalid password'));\n    }\n    const token = jwt.sign(\n      { id: validUser._id, isAdmin: validUser.isAdmin },\n      process.env.JWT_SECRET\n    );\n\n    const { password: pass, ...rest } = validUser._doc;\n\n    res\n      .status(200)\n      .cookie('access_token', token, {\n        httpOnly: true,\n      })\n      .json(rest);\n  } catch (error) {\n    next(error);\n  }\n};\n\nexport const google = async (req, res, next) => {\n  const { email, name, googlePhotoUrl } = req.body;\n  try {\n    const user = await User.findOne({ email });\n    if (user) {\n      const token = jwt.sign(\n        { id: user._id, isAdmin: user.isAdmin },\n        process.env.JWT_SECRET\n      );\n      const { password, ...rest } = user._doc;\n      res\n        .status(200)\n        .cookie('access_token', token, {\n          httpOnly: true,\n        })\n        .json(rest);\n    } else {\n      const generatedPassword =\n        Math.random().toString(36).slice(-8) +\n        Math.random().toString(36).slice(-8);\n      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);\n      const newUser = new User({\n        username:\n          name.toLowerCase().split(' ').join('') +\n          Math.random().toString(9).slice(-4),\n        email,\n        password: hashedPassword,\n        profilePicture: googlePhotoUrl,\n      });\n      await newUser.save();\n      const token = jwt.sign(\n        { id: newUser._id, isAdmin: newUser.isAdmin },\n        process.env.JWT_SECRET\n      );\n      const { password, ...rest } = newUser._doc;\n      res\n        .status(200)\n        .cookie('access_token', token, {\n          httpOnly: true,\n        })\n        .json(rest);\n    }\n  } catch (error) {\n    next(error);\n  }\n};\n",
                "directoryPath": "/api/post"
            
           }])
              
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
            let data=await PasswordValidateModel.findOne({appid,domain})
            return sendResponse(res,200,"fetch",data)
          } catch (error) {
           errorHandler(res,500,"fetch",error.message)
          }
    }
 
}