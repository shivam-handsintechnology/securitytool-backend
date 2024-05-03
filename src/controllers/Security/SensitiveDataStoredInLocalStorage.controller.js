const SensitiveDataStoredInLocalStorageModel = require("../../models/Security/SensitiveDataStoredInLocalStorage.model");
const { sendResponse } = require("../../utils/dataHandler");
const { errorHandler } = require("../../utils/errorHandler");

module.exports={
    get: async (req, res) => {
        
        try {
            if(req.method!=="GET") return errorHandler(res, 405, "Method Not Allowed");
            let data = await SensitiveDataStoredInLocalStorageModel.aggregate([
                {
                    $match: {
                        appid: req.user.appid,
                    }
                }
            ]);
            data=data.length>0?data[0]["data"]:[]
           return sendResponse(res, 200, "Sensitive Data Stored In Local Storage", data);
        } catch (error) {
            return errorHandler(res, 500, error.message);
        }
    },
}