const { default: mongoose } = require('mongoose')
const { Project_Security_Logs } = require('../models/Project_Security_Logs')
const { sendResponse } = require('../utils/dataHandler')
const { errorHandler } = require('../utils/errorHandler')
const getAllBotLogs = async (req, res) => {
    try {
        const data = await Project_Security_Logs.find({})
        sendResponse(res, 200, "data fetch successfully", data)
    } catch (error) {
        errorHandler(res, error)
    }
}
const getAllspamLogs = async (req, res) => {
    try {
        const data = await Project_Security_Logs.find({})
        sendResponse(res, 200, "data fetch successfully", data)
    } catch (error) {
        errorHandler(res, error)
    }
}
const getSingleBotLogs = async (req, res) => {
    try {
        const ip = req.body.ip
        if (ip) {
            const data = await Project_Security_Logs.findOne({ ip })
            sendResponse(res, 200, "data fetch successfully", data)
        } else {
            sendResponse(res, 404, "plesae enter valid id")
        }
    } catch (error) {
        errorHandler(res, error)
    }
}
const getSingleSpamLogs = async (req, res) => {
    try {
        const ip = req.body.ip
        if (ip) {
            const data = await Project_Security_Logs.findOne({ ip })
            sendResponse(res, 200, "data fetch successfully", data)
        } else {
            sendResponse(res, 404, "plesae enter valid id")
        }
    } catch (error) {
        errorHandler(res, error)
    }
}
const getSingleBotLogsCount = async (req, res) => {
    try {

        const data = await Project_Security_Logs.find({}).count()
        if (data) {

            sendResponse(res, 200, "data fetch successfully", data)
        } else {
            errorHandler(res, 404, "data not found")
        }

    } catch (error) {
        errorHandler(res, error)
    }
}
const getSingleSpamLogsCount = async (req, res) => {
    try {

        const data = await Project_Security_Logs.find({}).count()
        if (data) {

            sendResponse(res, 200, "data fetch successfully", data)
        } else {
            errorHandler(res, 404, "data not found")
        }

    } catch (error) {
        errorHandler(res, error)
    }
}
const deleteSingleBotLogs = async (req, res) => {
    try {
        const ip = req.body.ip
        console.log(ip)

        const data = await Project_Security_Logs.findOneAndDelete({ ip })
        if (data) {
            sendResponse(res, 200, "data deleted successfully", data)
        } else {
            sendResponse(res, 404, "please enter valid id", data)
        }

    } catch (error) {
        errorHandler(res, error)
    }
}
const deleteSingleSpamBotLogs = async (req, res) => {
    try {
        const ip = req.body.ip
        console.log(ip)

        const data = await Project_Security_Logs.findOneAndDelete({ ip })
        if (data) {
            sendResponse(res, 200, "data deleted successfully", data)
        } else {
            sendResponse(res, 404, "please enter valid id", data)
        }

    } catch (error) {
        errorHandler(res, error)
    }
}
const deleteAllBotLogs = async (req, res) => {
    const ip = req.body.ip
    if (req.body.ip == "") {
        console.log("empty")
    }
    console.log(ip)
    try {
        if (ip) {
            const data = await Project_Security_Logs.deleteMany({ ip: ip })
            sendResponse(res, 200, "data deleted  successfully", data)
        } else {
            errorHandler(res, 404, "data not found")
        }
    } catch (error) {
        errorHandler(res, error)
    }
}
const deleteAllSpamLogs = async (req, res) => {
    const ip = req.body.ip
    if (req.body.ip == "") {
        console.log("empty")
    }
    console.log(ip)
    try {
        if (ip) {
            const data = await Project_Security_Logs.deleteMany({ ip: ip })
            sendResponse(res, 200, "data deleted  successfully", data)
        } else {
            errorHandler(res, 404, "data not found")
        }
    } catch (error) {
        errorHandler(res, error)
    }
}

const Botogs = {
    deleteAllBotLogs,
    getAllBotLogs,
    getSingleBotLogs,
    deleteSingleBotLogs,
    getSingleBotLogsCount,
    getAllspamLogs,
    deleteAllSpamLogs,
    deleteSingleSpamBotLogs,
    getSingleSpamLogsCount,
    getSingleSpamLogs


}
module.exports = Botogs