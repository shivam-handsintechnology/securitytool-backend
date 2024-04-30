const path = require('path');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const SensitiveDataStoredInLocalStorageModel = require('../models/Security/SensitiveDataStoredInLocalStorage.model');
const { CheckAllSensitiveData } = require('../utils/functions');
const { sensitivedata } = require('../sensitive/availableapikeys');
const { AllowedWebDomainsModel } = require('../models/AllowedDomainsModel');
module.exports = {
  JsSnippet: (req, res) => {
    // Resolve the path to the protected JavaScript file
    const filePath = path.join(process.cwd(), 'src', 'public', 'protect.js');
    // Send the file as the response
    res.sendFile(filePath);
  },
  getALlDataFromSnippet: async(req, res) => {
    let status = 500;
    try {
      const { data, appid, hostname ,cssxssvulnurability} = req.body;
     
      let cssxss=cssxssvulnurability?cssxssvulnurability:undefined
      if (appid == null || appid == undefined || appid == "") {
        status = 400;
        throw new Error("App Id is required")
      }
      if (hostname == null || hostname == undefined || hostname == "") {
        status = 400;
        throw new Error("Hostname is required")
      }
      let createWebDomain = await AllowedWebDomainsModel.findOne({ appid: appid ,domain:hostname});
      if (!createWebDomain) {
          await AllowedWebDomainsModel.create({ appid: appid, domain:hostname });
      }
      if(data!==null && data!==undefined && Object.keys(data).length>0){
    
        let alldata=[]
          alldata=async()=>{
          let dataarray=[]
          for(let i=0;i<Object.keys(data).length;i++){
            dataarray.push({key:Object.keys(data)[i],value:data[Object.keys(data)[i]]})
          }
          return dataarray
        }
          alldata=  await alldata().then(data=>data).catch(err=>err)
          console.log("All Data",alldata)
        
          let sensitive=await CheckAllSensitiveData(alldata)
        console.log("Sensitive Data",sensitive)
        if(sensitive.length>0){
          let dataToSave = {
            appid,
            data:sensitive,
            hostname,cssxss
          }
          //  Check Records Are Exist in Database
          let isExist = await SensitiveDataStoredInLocalStorageModel.findOne({ appid: appid, hostname: hostname });
          if (isExist) {
          let dexistarray=isExist.data
          let dataarray=dataToSave.data
          let finaldataarray=[]
          for(let i=0;i<dataarray.length;i++){
            let isExist=false
            for(let j=0;j<dexistarray.length;j++){
              if(dataarray[i].key==dexistarray[j].key){
                isExist=true
              }
            }
            if(isExist==false){
              finaldataarray.push(dataarray[i])
            }
            if(isExist==true){
              for(let j=0;j<dexistarray.length;j++){
                if(dataarray[i].key==dexistarray[j].key){
                  finaldataarray.push(dataarray[i])

                }
              }
            }
          }
         
          await SensitiveDataStoredInLocalStorageModel.updateOne({ appid: appid, hostname: hostname }, { $set: { data: finaldataarray,cssxss } });
          }
          else {
            //  If Not Exist Create the Records
            await SensitiveDataStoredInLocalStorageModel.create(dataToSave);
          }
        }
        }
        return sendResponse(res, 200, 'Data received successfully')

    } catch (error) {
      console.log("Error in getALlDataFromSnippet",error)
     return errorHandler(res, status, error.message);
    }

  }
}