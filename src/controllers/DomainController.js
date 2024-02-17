const { checkDomainAvailability } = require("../utilities/functions/functions");
const { sendResponse } = require("../utils/dataHandler");
const UserModel = require('../models/User');
const { default: mongoose } = require("mongoose");
module.exports = {
    addDomain: async (req, res) => {
        try {
            console.log(req.user)
            const { domain } = req.body;
            const result = await checkDomainAvailability(domain);
            if (result) {
                let existdomain = await UserModel.findOne({ _id: req.user.id, domain: { $in: [domain] } });
                if (existdomain) {
                    return sendResponse(res, 404, "Domain already exist");
                } else {
                    await UserModel.findOneAndUpdate({ _id: req.user.id }, { $push: { domain } });
                    return sendResponse(res, 200, "Domain added successfully");
                }

            }
            return sendResponse(res, 404, "Domain not found");
        } catch (error) {
            return sendResponse(res, 500, error.message);

        }
    },
    getAllDomains: async (req, res) => {
        try {
            console.log(req.user)
            let { page, limit } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);

            const startIndex = (page - 1) * limit;
            let count = await UserModel.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(req.user.id) } },
                { $project: { "domain": { "$size": "$domain" } } }
            ]);
            const data = await UserModel.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(req.user.id) } },
                { $project: { "domain": { "$slice": ["$domain", startIndex, limit] } } },
                { $unwind: "$domain" }

            ]);

            console.log(data)
            if (data.length === 0) {

                return sendResponse(res, 404, "Records are not found");
            }
            return sendResponse(res, 200, "Fetch all domains", { data, totalPages: count[0]?.domain });
        } catch (error) {
            console.error(error);
            return sendResponse(res, 500, error.message);
        }
    },
    deleteDomain: async (req, res) => {
        try {
            const { domain } = req.query;
            const deleteSelectedDomain = await UserModel.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.user.id), domain: { $in: [domain] } }, { $pull: { domain } });

            if (deleteSelectedDomain) {
                return sendResponse(res, 200, "Deleted domain");
            }
            return sendResponse(res, 404, "Domain not found");
        } catch (error) {
            console.error(error);
            return sendResponse(res, 500, error.message);
        }
    },
    updateDomain: async (req, res) => {
        try {
            const { domain, newDomain } = req.body;
            const updateDomain = await UserModel.findOneAndUpdate({ domain }, { domain: newDomain })
            if (updateDomain) {
                return sendResponse(res, 200, "Domain updated successfully");
            }
            return sendResponse(res, 404, "Domain not found");
        } catch (error) {
            console.error(error);
            return sendResponse(res, 500, error.message);
        }
    }

};
