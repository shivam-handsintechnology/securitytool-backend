const { checkDomainAvailability } = require("../utilities/functions/functions");
const { sendResponse } = require("../utils/dataHandler");
const AllowedDomainsModel = require('../models/User');
const { default: mongoose } = require("mongoose");
const { AllowedDomainsModel } = require("../models/AllowedDomainsModel");
module.exports = {
    addDomain: async (req, res) => {
        try {
            console.log(req.user)
            const { domain } = req.body;
            const result = await checkDomainAvailability(domain);
            if (result) {
                let obj={ user: req.user.id, domain: domain }
                let existdomain = await AllowedDomainsModel.findOne(obj);
                if (existdomain) {
                    return sendResponse(res, 404, "Domain already exist");
                } else {
                    await AllowedDomainsModel.create(...obj,{ type:req.body.type });
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
            let count = await AllowedDomainsModel.aggregate([
                { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
            ]);
            const data = await AllowedDomainsModel.aggregate([
                { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
                { $skip: startIndex },
                { $limit: limit },
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
            const deleteSelectedDomain = await AllowedDomainsModel.findOneAndDelete({ user: mongoose.Types.ObjectId(req.user.id), domain: { domain } });

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
            const updateDomain = await AllowedDomainsModel.findOneAndUpdate({ user:req.user.id }, { domain: newDomain })
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
