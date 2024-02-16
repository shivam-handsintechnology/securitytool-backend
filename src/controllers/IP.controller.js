const WhitelistModels = require('../models/WhitelistModel');
const BlacklistModel = require('../models/BlacklistModel');
const { sendResponse } = require('../utils/dataHandler');
async function validateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true;
    }
    return false;
}


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
            const data = await WhitelistModels.find({}, { _id: 0 });

            if (data.length === 0) {
                return sendResponse(res, 404, 'Records are not found');
            } else {
                return sendResponse(res, 200, 'Fetch all IPs', data);
            }
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
        const valid = await ValidateIPaddress(ip)
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
            await BlacklistModel.create({ ip })
            return sendResponse(res, 200, "Added Successfully")
        }
        // switch(true){
        //     case exist:
        //         return sendResponse(res,401,"Enter Ip is Already Exist")
        //         break;

        // }
        console.log()
    },
    BlackList: async (req, res) => {
        try {
            const data = await BlacklistModel.find({}, { _id: 0 })
            if (data.length === 0) {
                return sendResponse(res, 404, "Records Are not Found")
            }
            if (data.length > 0) {
                return sendResponse(res, 200, "fetch all ips", data)
            }
        } catch (error) {
            console.log(error)
            return sendResponse(res, 500, error.message)
        }

    },
    DeleteBlackListip: async (req, res) => {
        try {
            console.log(req.query)
            const { ip } = req.query
            console.log({ delete: ip })
            const deleteselectedip = await BlacklistModel.findOneAndDelete({ ip })
            if (deleteselectedip) {
                return sendResponse(res, 200, "delete ip address")
            }
            return false
            return sendResponse(res, 200, "delete ip address")
        } catch (error) {
            console.error(error)
            return sendResponse(res, 500, error.message)
        }

    },
}