const WhitelistModels = require('../models/WhitelistModel');
const BlacklistModel = require('../models/BlacklistModel');
const { sendResponse } = require('../utils/dataHandler');
const { validateIPaddress } = require('../helpers/Validators');


module.exports = {
    addIP: async function (req, res) {
        const { ip } = req.body;
        const valid = await validateIPaddress(ip);

        if (!valid) {
            return sendResponse(res, 406, 'Please enter a valid IP address');
        }

        if (!ip) {
            return sendResponse(res, 406, 'Please enter any IP address');
        }

        const exist = await WhitelistModels.findOne({ ip });

        if (exist) {
            return sendResponse(res, 401, 'Entered IP is already exist');
        } else {
            await WhitelistModels.create({ ip });
            return sendResponse(res, 200, 'Added successfully');
        }
    },
    getAllIPs: async function (req, res) {
        try {
             let { page, limit } = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const startIndex = (page - 1) * limit;
            let totalCount = await WhitelistModels.countDocuments();
            const data = await WhitelistModels.aggregate([
                { $match: {} },
                { $skip: startIndex },
                { $limit: limit },
            ]);
             return sendResponse(res, 200, 'Fetch all IP addresses', { data, totalPages: Math.ceil(totalCount / limit) });
        
        } catch (error) {
            console.error(error);
            return sendResponse(res, 500, error.message);
        }
    },
    deleteIP: async function (req, res) {
        try {
            const { ip } = req.query;
            const deleteSelectedIP = await WhitelistModels.findOneAndDelete({ ip });

            if (deleteSelectedIP) {
                return sendResponse(res, 200, 'Deleted IP address');
            } else {
                return sendResponse(res, 404, 'IP address not found');
            }
        } catch (error) {
            console.error(error);
            return sendResponse(res, 500, error.message);
        }
    },
    AddBlackListIp: async (req, res) => {
        const { ip } = req.body
        const valid = await validateIPaddress(ip)
        if (!valid) {
            return sendResponse(res, 406, "Please enter valid ip address")
        }
        if (!ip) {
            return sendResponse(res, 406, "Please enter any ip address")
        }
        const exist = await BlacklistModel.findOne({ ip })
        if (exist) {
            return sendResponse(res, 401, "Enter Ip is Already Exist")
        }
        else if (!exist) {
          let data=  await BlacklistModel.create({ ip })
            return sendResponse(res, 200, "Added Successfully",data)
        }
        // switch(true){
        //     case exist:
        //         return sendResponse(res,401,"Enter Ip is Already Exist")
        //         break;

        // }
        //console.log()
    },
    BlackList: async (req, res) => {
        try {
            let { page, limit } = req.query
            page = parseInt(page) || 1
            limit = parseInt(limit) || 10
            let totalCount = await BlacklistModel.countDocuments()
            const startIndex = (page - 1) * limit
            let totalPages = Math.ceil(totalCount / limit)

            const data = await BlacklistModel.aggregate([
                { $match: {} },
                { $skip: startIndex },
                { $limit: limit }
            ])
            return sendResponse(res, 200, "Fetch all BlackList", { data, totalPages })
        } catch (error) {
            //console.log(error)
            return sendResponse(res, 500, error.message)
        }

    },
    DeleteBlackListip: async (req, res) => {
        try {
            //console.log(req.query)
            const { ip } = req.query
            //console.log({ delete: ip })
            const deleteselectedip = await BlacklistModel.findOneAndDelete({ ip })
            if (deleteselectedip) {
                return sendResponse(res, 200, "Deleted Ip Address", { ip: deleteselectedip.ip })
            }
        } catch (error) {
            console.error(error)
            return sendResponse(res, 500, error.message)
        }

    },
}