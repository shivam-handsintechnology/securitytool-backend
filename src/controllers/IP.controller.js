
const { sendResponse } = require('../utils/dataHandler');
const { validateIPaddress } = require('../helpers/Validators');
const fs = require("fs");
const path = require("path");
let whitelispath = path.join(__dirname, "../data/json/WhiteListIp.json")
let blacklistpath = path.join(__dirname, "../data/json/BlackListIp.json")
let iswhitelistfilecreated = fs.existsSync(whitelispath)
if (!iswhitelistfilecreated) {
    fs.writeFileSync(whitelispath, JSON.stringify([]))
}
let blacklistfilecreated = fs.existsSync(blacklistpath)
if (!blacklistfilecreated) {
    fs.writeFileSync(blacklistpath, JSON.stringify([]))
}

const whitelistdata = require("../data/json/WhiteListIp.json")
const blacklistipdata = require("../data/json/BlackListIp.json")
const { errorHandler } = require('../utils/errorHandler');
module.exports = {
    addIP: async function (req, res) {
        try {
            const { ip } = req.body;

            const valid = await validateIPaddress(ip);

            if (!valid) {
                return errorHandler(res, 406, 'Please enter a valid IP address');
            }

            if (!ip) {
                return errorHandler(res, 406, 'Please enter any IP address');
            }

            if (whitelistdata.length > 0) {
                const exist = whitelistdata.find((data) => data.ip == ip);

                if (exist) {
                    return errorHandler(res, 401, 'Entered IP is already exist');
                } else {
                    whitelistdata.push({ ip });
                    fs.writeFileSync(whitelispath, JSON.stringify(whitelistdata))

                }
            } else {
                whitelistdata.push({ ip });
                fs.writeFileSync(whitelispath, JSON.stringify(whitelistdata))

            }
            return sendResponse(res, 200, 'Added successfully');
        } catch (error) {
            console.error(error);
            return errorHandler(res, 500, error.message);
        }

    },

    getAllIPs: async function (req, res) {
        try {

            let { page, limit } = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit) || 10;
            const startIndex = (page - 1) * limit;

            let totalCount = whitelistdata.length;
            const data = whitelistdata.slice(startIndex, startIndex + limit);

            return sendResponse(res, 200, 'Fetch all IP addresses', { data, totalPages: Math.ceil(totalCount / limit) });

        } catch (error) {
            console.error(error);
            return sendResponse(res, 500, error.message);
        }
    },
    deleteIP: async function (req, res) {
        try {

            const { ip } = req.query;
            if (!req.query.ip) {
                return errorHandler(res, 406, 'Please enter any IP address');
            }
            // const deleteSelectedIP = await WhitelistModels.findOneAndDelete({ ip });
            let isexist = whitelistdata.length > 0 && whitelistdata.find((data) => data.ip == ip);
            const deleteSelectedIP = whitelistdata.filter((data) => data.ip !== ip);
            fs.writeFileSync(whitelispath, JSON.stringify(deleteSelectedIP))
            if (!isexist) {
                return errorHandler(res, 404, 'IP address not found');
            }
            if (deleteSelectedIP) {
                return sendResponse(res, 200, 'Deleted IP address');
            } else {
                return errorHandler(res, 404, 'IP address not found');
            }
        } catch (error) {
            console.error(error);
            return errorHandler(res, 500, error.message);
        }
    },
    AddBlackListIp: async (req, res) => {
        try {
            const { ip } = req.body;
            const valid = await validateIPaddress(ip);

            if (!valid) {
                return errorHandler(res, 406, 'Please enter a valid IP address');
            }

            if (!ip) {
                return errorHandler(res, 406, 'Please enter any IP address');
            }
            if (blacklistipdata.length > 0) {
                const exist = blacklistipdata.find((data) => data.ip == ip);

                if (exist) {
                    return errorHandler(res, 401, 'Entered IP is already exist');
                } else {
                    blacklistipdata.push({ ip });
                    fs.writeFileSync(blacklistpath, JSON.stringify(blacklistipdata))
                    return sendResponse(res, 200, 'Added successfully');
                }
            } else if (blacklistipdata.length == 0) {
                blacklistipdata.push({ ip });
                fs.writeFileSync(blacklistpath, JSON.stringify(blacklistipdata))
                return sendResponse(res, 200, 'Added successfully');
            }
        } catch (error) {
            console.error(error)
            return errorHandler(res, 500, error.message)
        }


    },
    BlackList: async (req, res) => {
        try {

            let { page, limit } = req.query
            page = parseInt(page) || 1
            limit = parseInt(limit) || 10
            let totalCount = blacklistipdata.length
            const startIndex = (page - 1) * limit
            const data = blacklistipdata.slice(startIndex, startIndex + limit)
            const totalPages = Math.ceil(totalCount / limit)
            return sendResponse(res, 200, "Fetch all BlackList", { data, totalPages })
        } catch (error) {
            console.error(error)
            return errorHandler(res, 500, error.message)
        }

    },
    DeleteBlackListip: async (req, res) => {
        try {

            const { ip } = req.query
            let existip = blacklistipdata.length > 0 && blacklistipdata.find((data) => data.ip == ip)
            if (!existip) {
                return errorHandler(res, 404, 'IP address not found');
            }
            const deleteSelectedIP = blacklistipdata.filter((data) => data.ip !== ip);
            fs.writeFileSync(blacklistpath, JSON.stringify(deleteSelectedIP))
            return sendResponse(res, 200, "Deleted Ip Address", { ip: ip })
        } catch (error) {
            console.error(error)
            return errorHandler(res, 500, error.message)
        }

    },
}