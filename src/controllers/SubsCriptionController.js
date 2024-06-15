const Subscription = require("../models/SubscriptionModel");
const { sendResponse } = require("../utils/dataHandler");
const { errorHandler } = require("../utils/errorHandler");

module.exports = {
    getSubscriptionById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return errorHandler(res, 400, "id is required");
            }
            let data = await Subscription.findById(id);
            return sendResponse(res, 200, "Subsription", data);
        } catch (error) {
            return errorHandler(res, 500, error.message);
        }
    }
}