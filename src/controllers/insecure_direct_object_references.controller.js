const { testAllPathsDirectoryListing } = require("../utils/Insecure_Direct_Object_References")
const url = require('url')
const { isUrlValid } = require("../utils/ScanHeaders/helpers")
const { checkDomainAvailability } = require("../utilities/functions/functions")
const { errorHandler } = require("../utils/errorHandler")
const { sendResponse } = require("../utils/dataHandler")
exports.directory_listing_is_enabled_on_the_server = async (req, res) => {
    try {
        if (req.query.url) {
            if (!isUrlValid(req.query.url)) throw new Error('Invalid URL format!')
            const hostname = url.parse(req.query.url).hostname
            const valid = await checkDomainAvailability(hostname)

            if (!valid) {
                return errorHandler(res, 400, "please enter valid url")
            } else if (valid) {
                const data = await testAllPathsDirectoryListing(req.query.url).then((result) => {
                    return { success: true, result: result.filter((item) => item == null ? false : true) }
                }
                ).catch((error) => {
                    return { success: false, error }
                })
                return sendResponse(res, 200, 'Directory listing.', data)

            }

        } else {
            return errorHandler(res, 400, "please enter  url")
        }

    } catch (error) {
        // console.log(error)
        return errorHandler(res, 500, error.message)

    }
}