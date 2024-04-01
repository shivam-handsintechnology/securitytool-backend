
const { GetAutitReport, errorHandler, getDirectoryUrls } = require("../helpers/functions");
const { getEndpoints } = require("../helpers/getEndpoint");
const { scanDirectory } = require("../helpers/httpparameterpollution");

const mongoose = require('mongoose');

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

const HostValidator = async (app, hostname, appid) => {
    try {
      // const params = req.body.params
      const nodejsveresion = process.version;
      const directoryPath = process.cwd();
      // Call the function to scan the directory
      const jsonData = await scanDirectory(directoryPath);
      // Convert the result to JSON
      const fileContent = jsonData
      return fileContent
      // await axios.post(baseUrl + "/alloweddomains", {
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
          res.json(data)
        }catch{
          errorHandler(res,500,error.message,error)
        }
        },
    DirectoryListingEnable:async(req, res) => {
        try{
          let data=await getDirectoryUrls().then((response)=>response)
          res.json(data)
        }catch{
          errorHandler(res,500,error.message,error)
        }
        },
        HostValidator:async(req, res) => {
        try{
          let data=await HostValidator(req.app).then((response)=>response)
          res.json(data)
        }catch{
          errorHandler(res,500,error.message,error)
        }
        },
        getEndpoints:async(req, res) => {
        try{
          let data=await getEndpoints(req.app)
          res.json(data)
        }catch{
          errorHandler(res,500,error.message,error)
        }
        },
        models:async(req, res) => {
        try{
          let models=  getUserAuthModels()
          res.json(JSON.stringify(models))
        }catch{
          errorHandler(res,500,error.message,error)
        }
        },

}