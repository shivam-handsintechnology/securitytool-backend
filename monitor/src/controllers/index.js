
const mongoose = require('mongoose');
const { GetAutitReport, errorHandler, getDirectoryUrls, checkDirectoryListingEnabled } = require("../helpers/functions");
const { getEndpoints } = require("../helpers/getEndpoint");
const { scanDirectory } = require("../helpers/httpparameterpollution");
const { default: axios } = require('axios');
const { EventEmitter } = require('events');
const { sendResponse } = require('../../../src/utils/dataHandler');
const checkForModules = require('../../../src/helpers/ModuleFounder');
const { findPasswordDocuments, findPasswordTable } = require('../../../src/helpers/InsecurepasswordsTester');

EventEmitter.defaultMaxListeners = 10000000000000000000000; // or an appropriate number

function getUserAuthModels() {
  const models = mongoose.connection.models;
  const userAuthModels = [];

  // Iterate over all models
  Object.keys(models).forEach(modelName => {
    const model = models[modelName];
    const schema = model.schema;

    // Check for fields related to user authentication
    const hasUsername = schema.paths.hasOwnProperty('username');
    const hasPassword = schema.paths.hasOwnProperty('password');
    const hasEmail = schema.paths.hasOwnProperty('email');

    if (hasUsername || hasPassword || hasEmail) {
      userAuthModels.push({ name: modelName, schema });
    }
  });

  return userAuthModels;
}

const HostValidator = async (hostname, appid) => {
    try {
      // Call the function to scan the directory
      const jsonData = await scanDirectory( process.cwd());
      // Convert the result to JSON
      const fileContent = jsonData
      // await axios.post(baseUrl + "/alloweddomains", {
        //  nodejsveresion:process.version,
      //   hostname,
      //   type:"api",
      //   appid,
      //   application: application, nodejsveresion,
      //   fileContent: fileContent,
      //   // auditReport: audit.success ? audit.auditReport : null
      // },).then((res) => {
      //   console.log(res.data)
      //   if (res.data.domain.includes(hostname)) {
      //     consoleColorText("Domain is allowed", "green");
  
      //   } else {
      //     consoleColorText("Domain is not allowed", "red");
      //   }
      // }).catch((error) => {
      //   console.log(error)
      //   consoleColorText("Domain is not allowed", "red");
      // })
      return 
  
    } catch (error) {
      if (error) {
        console.log({ error })
        return { allowed: false };
      }
    }
  
  };
module.exports={
    GetAutitReport:async(req, res) => {
        try{
          let data=await GetAutitReport().then((response)=>response)
          return sendResponse(res, 200, "data fetch", data)
        }catch{
          errorHandler(res,500,error.message,error)
        }
        },
        DirectoryListingEnable:async(req, res) => {
          try {
            console.log("fullUrl", req.fullUrl);
            let directoryUrls = await getDirectoryUrls(process.cwd()).then((response) => response);
            return sendResponse(res,200,"Fetch All Data",directoryUrls)
        } catch (error) {
            errorHandler(res, 500, error.message, error);
        }
        },
        HostValidator:async(req, res) => {
        try{
          let data=await HostValidator(req.app).then((response)=>response)
          return sendResponse(res, 200, "data fetch", data)
        }catch{
          errorHandler(res,500,error.message,error)
        }
        },
        getEndpoints:async(req, res) => {
        try{
          let data=await getEndpoints(req.app)
          return sendResponse(res, 200, "data fetch", data)
        }catch{
          errorHandler(res,500,error.message,error)
        }
        },
        passwordsInsecure:async(req, res) => {
          let data
        try{
          let isMongodbDatabase=await checkForModules("mongoose")
          let isMysqlDatabase=await checkForModules("mysql")
          if(isMongodbDatabase){
            data=await  findPasswordDocuments()
           res.status(200).json({
             message:"success",
             data:{password:data},
             statusCode:200
           })
          }else if(isMysqlDatabase){
            data=await  findPasswordTable()
            res.status(200).json({
              message:"success",
              data:{password:data},
              statusCode:200
            })
          }
          else{
            res.status(200).json({
              message:"success",
              data:{password:data},
              statusCode:200
            })
          }
        }catch(error){
          res.status(500).json({
            message:error.message,
            statusCode:500,
            data:{password:data}
          })
        }
        },
        supportOldNodejsVersion:async(req, res) => {
        try{
            res.status(200).json({
              message:"success",
              data:{version:process.version},
              statusCode:200
            })
          
        }catch(error){
          res.status(500).json({
            message:error.message,
            statusCode:500,
            data:{}
          })
        }
        },

}