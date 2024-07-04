const path = require('path');
const moment = require('moment');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const SensitiveDataStoredInLocalStorageModel = require('../models/Security/SensitiveDataStoredInLocalStorage.model');
const { CheckAllSensitiveData } = require('../utils/functions');
const SensitiveDataStoredInSessionStorageModel = require('../models/Security/SensitiveDataStoredInSessionStorage.model');
const getALlDataFromSnippet = async (req, res) => {
  let status = 500;
  try {
    const { data, appid, domain, sessionStoragedata } = req.body;
    const { subdomain } = req.user;

    if (data && Object.keys(data).length > 0) {
      let alldata = await transformData(data);
      console.log("All Data", alldata);

      let sensitive = await CheckAllSensitiveData(alldata);
      sensitive = filterSensitiveData(sensitive);

      if (sensitive.length > 0) {
        await saveData(SensitiveDataStoredInLocalStorageModel, { appid, domain, subdomain, data: sensitive });
      }
    }

    if (sessionStoragedata && Object.keys(sessionStoragedata).length > 0) {
      let alldata = await transformData(sessionStoragedata);
      console.log("All Data", alldata);

      let sensitive = await CheckAllSensitiveData(alldata);
      sensitive = filterSensitiveData(sensitive);

      if (sensitive.length > 0) {
        await saveData(SensitiveDataStoredInSessionStorageModel, { appid, domain, subdomain, data: sensitive });
      }
    }

    return sendResponse(res, 200, 'Data received successfully');

  } catch (error) {
    console.log("Error in getALlDataFromSnippet", error.message);
    return errorHandler(res, status || 500, error.message);
  }
};

const transformData = async (data) => {
  return Object.keys(data).map(key => ({ key, value: data[key] }));
};

const filterSensitiveData = (sensitive) => {
  return sensitive.map(item => {
    let arr = [];
    Object.keys(item.value).forEach(v => {
      if (item.value[v].id === true) {
        console.log("item ki value???", item.value[v])
        console.log("item ki value???", v)
        arr.push({ key: v, id: item.value[v].id, value: item.value[v].data });
      }
    });
    return { key: item.key, value: arr };
  }).filter(item => item.value.length > 0);
};

const saveData = async (Model, dataToSave) => {
  const { appid, domain, subdomain, data } = dataToSave;
  console.log("Data to save", dataToSave)
  const isExist = await Model.findOne({ appid, domain, subdomain });

  if (isExist) {
    const updatedData = mergeData(isExist.data, data);
    await Model.findOneAndUpdate({ appid, domain, subdomain }, { data: updatedData }, { new: true });
  } else {
    await Model.create(dataToSave);
  }
};

const mergeData = (existingData, newData) => {
  return newData.reduce((acc, curr) => {
    const existingDataItem = existingData.find(d => d.key === curr.key);
    if (existingDataItem) {
      acc.push(curr);
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
};

module.exports = {
  JsSnippet: async (req, res) => {
    // Resolve the path to the protected JavaScript file
    const filePath = path.join(process.cwd(), 'dist', 'public', 'protect.js');
    // Send the file as the response

    res.sendFile(filePath);
  },
  getALlDataFromSnippet: getALlDataFromSnippet
}