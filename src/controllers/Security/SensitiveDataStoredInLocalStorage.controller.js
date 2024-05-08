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
                },
                {
                    $unwind: '$data'
                },
                {
                    $group:{
                        _id:"$domain",
                        data:{$push:"$data"}
                    }
                }
                // { $unwind: '$data' },
                // {
                //     $match: {
                //         $or: [
                //             { 'data.value.isEmail': true },
                //             { 'data.value.isJwt': true },
                //             { 'data.value.isPassportNumber': true },
                //             { 'data.value.isBase64': true },
                //             { 'data.value.isObjectId': true },
                //             { 'data.value.isCreditCard': true },
                //             { 'data.value.isHashedPassword': true },
                //             { 'data.value.isPhoneNumber': true },
                //         ],
                //     },
                // },
                // { 
                //     $addFields: { 
                //         'data.value': {
                //             $objectToArray: '$data.value'
                //         }
                //     }
                // },
                // {
                //     $addFields: {
                //         'data.value': {
                //             $filter: {
                //                 input: '$data.value',
                //                 as: 'field',
                //                 cond: { $eq: ['$$field.v', true] }
                //             }
                //         }
                //     }
                // },
                // { 
                //     $sort: { 'data.key': 1 } 
                // },
                // {
                //     $group: {
                //         _id: '$_id',
                //         data: { $push: '$data' },
                //     },
                // },
            ]);
            
            
            data=data.length>0?data[0]["data"]:[]
           return sendResponse(res, 200, "Sensitive Data Stored In Local Storage", data);
        } catch (error) {
            return errorHandler(res, 500, error.message);
        }
    },
}