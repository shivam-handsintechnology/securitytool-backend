const { checkDomainAvailability } = require("../utilities/functions/functions");
const { sendResponse } = require("../utils/dataHandler");
const { default: mongoose } = require("mongoose");
const { AllowedDomainsModel } = require("../models/AllowedDomainsModel");
const User = require("../models/User");
module.exports = {
    addDomain: async (req, res) => {
        try {
      
            const { domain } = req.body;
           
            if(!domain){
                return sendResponse(res, 400, "domain is required");
            }
            else if(domain.includes("localhost")){
                return sendResponse(res, 400, "Domain should not be localhost");
            }
            const result = await checkDomainAvailability(domain);
            if (result) {
                let obj={ user: req.user.id, domain: domain }
                let existdomain = await AllowedDomainsModel.findOne(obj);
                if (existdomain) {
                    return sendResponse(res, 400, "Domain already exist");
                } else {
                    await AllowedDomainsModel.create(obj);
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
            let { page, limit } = req.query;
            page = parseInt(page) || 1;
            limit = parseInt(limit)|| 10;
            const startIndex = (page - 1) * limit;
            let totalCount = await AllowedDomainsModel.countDocuments({ user: mongoose.Types.ObjectId(req.user.id) });
            const data = await AllowedDomainsModel.aggregate([
                { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
                { $skip: startIndex },
                { $limit: limit },
            ]);

            if (data.length === 0) {

                return sendResponse(res, 404, "Records are not found", { data, totalPages:0 });
            }
            return sendResponse(res, 200, "Fetch all domains", { data, totalPages: Math.ceil(totalCount / limit) });
        } catch (error) {
            console.error(error);
            return sendResponse(res, 500, error.message);
        }
    },
    deleteDomain: async (req, res) => {
        try {
            const { domain } = req.query;
       
            const deleteSelectedDomain = await AllowedDomainsModel.findOneAndDelete({ user: mongoose.Types.ObjectId(req.user.id), domain: domain });

            if (deleteSelectedDomain) {
                return sendResponse(res, 200, "Deleted domain",{domain:deleteSelectedDomain.domain});
            }
            return sendResponse(res, 404, "Domain not found", { domain });
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
