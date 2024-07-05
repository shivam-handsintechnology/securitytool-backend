const { sendResponse } = require('../../utils/dataHandler');
const { errorHandler } = require('../../utils/errorHandler');
const { get403ErrorMessage, getHttpErrorMessages, getLoginErrorMessages } = require('../../utils/scanClientData');
module.exports = {
    get403ErrorMessage: async (req, res) => {
        try {
            let data = []
            let response = req.body.fileContent

            data = await get403ErrorMessage(response)
            return sendResponse(res, 200, "success", data)
        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    },
    getHttpErrorMessages: async (req, res) => {
        try {
            let data = []
            let response = req.body.fileContent
            data = await getHttpErrorMessages(response)
            return sendResponse(res, 200, "success", data)
        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    },
    getLoginErrorMessages: async (req, res) => {
        try {
            let data = []
            let response = req.body.fileContent
            data = await getLoginErrorMessages(response)
            return sendResponse(res, 200, "success", data)
        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    },
    getAllErrorMessages: async (req, res) => {
        try {
            let obj = []
            let response = req.body.fileContent
            let data = await get403ErrorMessage(response)
            let data1 = await getHttpErrorMessages(response)
            let data2 = await getLoginErrorMessages(response)
            obj = [
                { text: "Server returns HTTP 403 error message", value: data.length > 0 ? "Yes" : "No", link: "/Serverreturnserror" },
                { text: "Server returns HTTP error message", value: data1.length > 0 ? "Yes" : "No", link: "/Serverhttperror" },
                { text: "Server returns login error message", value: data2.length > 0 ? "Yes" : "No", link: "/Helpfulerrormessage" }
            ]
            return sendResponse(res, 200, "success", obj)
        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    }
}