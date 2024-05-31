
const { SSLverifier } = require("../../utils")
const { sendResponse } = require("../../utils/dataHandler")
const { errorHandler } = require("../../utils/errorHandler")

module.exports = {
    GetSSl: async (req, res) => {
        try {
            let domain = req.query.domain
            const response = await SSLverifier(domain).then(data => data)
            return sendResponse(res, 200, "SSL verified successfully", response)
        } catch (error) {

            return errorHandler(res, 500, error.message)
        }
    }
}