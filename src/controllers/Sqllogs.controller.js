const { default: mongoose } = require('mongoose')
const { Project_Security_Logs } = require('../models/Project_Security_Logs')
const { sendResponse } = require('../utils/dataHandler')
const { errorHandler } = require('../utils/errorHandler')
const getAllSqllLogs = async (req, res) => {
    try {
        // Get total count of users
        const { page, limit, type } = req.query;
        let obj = {}
        if (type) {
            obj["type"] = type
        }
        const totalCount = await Project_Security_Logs.countDocuments(obj);
        //console.log({ totalCount })
        // Convert page and limit to numbers
        const pageNumber = totalCount > 10 ? parseInt(page) || 1 : 1;
        const limitNumber = parseInt(limit) || 10;
        // Calculate the skip value
        const skip = (pageNumber - 1) * limitNumber;
        const pipeline = [
            {
                $match: obj,
            },
            // Pagination
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limitNumber },
            // Sort by username in ascending order
        ];
        const data = await Project_Security_Logs.aggregate(pipeline)
        sendResponse(res, 200, "data fetch successfully", {
            data,
            totalCount,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalCount / limitNumber)
        })
    } catch (error) {
        errorHandler(res, error)
    }
}
const getSingleSqllLogs = async (req, res) => {
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
const getSingleSqllLogsCount = async (req, res) => {
    try {
        const alltypesinjection = require("../utils/Injectionstype.json").data
        const typeTitles = alltypesinjection.map(entry => entry.slug);
        // const data = await Project_Security_Logs.find().where({ type: req.query.type }).count()
        const data = await Project_Security_Logs.aggregate([
            {
                $match: { type: { $in: typeTitles } }
            },
            {
                $facet: {
                    counts: [
                        {
                            $group: {
                                _id: "$title",
                                count: { $sum: 1 }
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    combinedCounts: {
                        $map: {
                            input: typeTitles,
                            as: "typeTitle",
                            in: {
                                title: "$$typeTitle",
                                count: {
                                    $ifNull: [
                                        { $arrayElemAt: [{ $filter: { input: "$counts", as: "c", cond: { $eq: ["$$c._id", "$$typeTitle"] } } }, 0] },
                                        { _id: "$$typeTitle", count: 0 }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            {
                $unwind: "$combinedCounts"
            },
            {
                $replaceRoot: { newRoot: "$combinedCounts" }
            }
        ])
        if (data) {
            sendResponse(res, 200, "data fetch successfully", data)
        } else {
            errorHandler(res, 404, "data not found")
        }



    } catch (error) {
        errorHandler(res, error)
    }
}
const deleteSingleSqllLogs = async (req, res) => {
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
const deleteAllSqllLogs = async (req, res) => {
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

const Sqllogs = {
    deleteAllSqllLogs,
    getAllSqllLogs,
    getSingleSqllLogs,
    deleteSingleSqllLogs,
    getSingleSqllLogsCount,
}
module.exports = Sqllogs