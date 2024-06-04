const path = require('path');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const SensitiveDataStoredInLocalStorageModel = require('../models/Security/SensitiveDataStoredInLocalStorage.model');
const { CheckAllSensitiveData } = require('../utils/functions');
const { sensitivedata } = require('../sensitive/availableapikeys');
const { AllowedWebDomainsModel } = require('../models/AllowedDomainsModel');
const User = require('../models/User');
module.exports = {
  JsSnippet: (req, res) => {
    // Resolve the path to the protected JavaScript file
    const filePath = path.join(process.cwd(), 'src', 'public', 'protect.js');
    // Send the file as the response
    res.sendFile(filePath);
  },
  getALlDataFromSnippet: async (req, res) => {
    let status = 500;
    try {
      const { data, appid, hostname } = req.body;

      if (appid == null || appid == undefined || appid == "") {
        status = 400;
        throw new Error("App Id is required")
      }
      if (hostname == null || hostname == undefined || hostname == "") {
        status = 400;
        throw new Error("Hostname is required")
      }

      let createWebDomain = await AllowedWebDomainsModel.findOne({ appid: appid, domain: hostname });
      if (!createWebDomain) {
        await AllowedWebDomainsModel.create({ appid: appid, domain: hostname });
        await User.findOneAndUpdate({ appid: appid }, { webstatus: true })
      }
      if (data !== null && data !== undefined && Object.keys(data).length > 0) {

        let alldata = []
        alldata = async () => {
          let dataarray = []
          for (let i = 0; i < Object.keys(data).length; i++) {
            dataarray.push({ key: Object.keys(data)[i], value: data[Object.keys(data)[i]] })
          }
          return dataarray
        }
        alldata = await alldata().then(data => data).catch(err => err)
        console.log("All Data", alldata)

        let sensitive = await CheckAllSensitiveData(alldata)
        sensitive = sensitive.map((item) => {
          let arr = [];
          Object.keys(item.value).forEach((v) => {
            console.log("V", item.value[v]);
            if (item.value[v] === true) {
              arr.push(v);
            }
          });
          return {
            key: item.key,
            value: arr
          };
        });

        sensitive = sensitive.filter(item => item.value.length > 0 ? true : false);

        if (sensitive.length > 0) {
          const dataToSave = {
            appid,
            data: sensitive,
            domain: hostname,
          };

          // Check if the record exists in the database
          const isExist = await SensitiveDataStoredInLocalStorageModel.findOne({
            appid,
            domain: hostname,
          });

          if (isExist) {
            // If the record exists, update the data array
            const existingData = isExist.data;
            const newData = dataToSave.data;

            // Create a new data array by updating existing keys and adding new keys
            const updatedData = newData.reduce((acc, curr) => {
              const existingDataItem = existingData.find((d) => d.key === curr.key);
              if (existingDataItem) {
                acc.push(curr);
              } else {
                acc.push(curr);
              }
              return acc;
            }, []);

            // Update the record with the new data array
            await SensitiveDataStoredInLocalStorageModel.findOneAndUpdate(
              { appid, domain: hostname },
              { data: updatedData },
              { new: true }
            );
          } else {
            // If the record doesn't exist, create a new one
            await SensitiveDataStoredInLocalStorageModel.create(dataToSave);
          }
        }
      }
      return sendResponse(res, 200, 'Data received successfully')

    } catch (error) {
      console.log("Error in getALlDataFromSnippet", error)
      return errorHandler(res, status, error.message);
    }

  }
}