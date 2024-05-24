const { Project_Security_Logs } = require('../../models/Project_Security_Logs')
const { sendResponse } = require('../../utils/dataHandler')
const { errorHandler } = require('../../utils/errorHandler')
const getRandomColor = require('../../helpers/randomColorGenerator')
const { default: mongoose } = require('mongoose')
const getAllLogs = async (req, res) => {
    try {
        // Get total count of users
        const { page, limit, question, ...rest } = req.query;
        let obj = {}
        let restdata = Object.keys(rest)
        for (let i of restdata) {
            if (rest[i]) {
                obj[i] = rest[i]
            }
        }
        obj["user"] = mongoose.Types.ObjectId(req.user.id)

        const totalCount = await Project_Security_Logs.countDocuments(obj);

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
        return sendResponse(res, 200, "data fetch successfully", {
            data,
            totalCount,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalCount / limitNumber)
        })
    } catch (error) {
        return errorHandler(res, 500, error.message)
    }
}
const getLogs = async (req, res) => {
    try {
        const ip = req.params.ip
        if (ip) {
            const data = await Project_Security_Logs.findOne({ ip })
            return sendResponse(res, 200, "data fetch successfully", data)
        } else {
            return sendResponse(res, 404, "plesae enter valid id")
        }
    } catch (error) {
        return errorHandler(res, 500, error.message)
    }
}
const getLogsCount = async (req, res) => {
    try {
        let data = [];
        console.log("object", req.user);
        let finalResult = [];
        let result = {};
        const alltypesinjection = require("../../utils/Injectionstype.json").data;
        const typeTitles = alltypesinjection.map(entry => entry.slug);
        data = await Project_Security_Logs.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.id),
                    domain: req.query.domain
                }
            },
            {
                $group: {
                    _id: "$type",
                    count: { $sum: 1 }
                }
            }
        ]);

        if (data.length > 0) {
            data.forEach(entry => {
                result[entry._id] = entry.count;
            });
            typeTitles.forEach(title => {
                if (title !== "VPN" && title !== "Remote-FiLe-Inclusion") {
                    finalResult.push({
                        name: title === "cmd" ? "Command Line" :
                            title === "xss-injection" ? "XSS" :
                                title === "html" ? "HTML" :
                                    title === "XML-Injection" ? "XML" : title,
                        value: result[title] || 0,
                        color: getRandomColor(title)
                    });
                }
            });
        } else {
            typeTitles.forEach(title => {
                if (title !== "VPN" && title !== "Remote-FiLe-Inclusion") {
                    finalResult.push({
                        name: title === "XML-Injection" ? "XML" : title,
                        value: 0,
                        color: getRandomColor(title)
                    });
                }
            });
        }

        return sendResponse(res, 200, "Data fetched successfully", finalResult);
    } catch (error) {
        console.log(error);
        return errorHandler(res, 500, error.message);
    }
};

const deleteLogs = async (req, res) => {
    try {
        const ip = req.params.ip


        const data = await Project_Security_Logs.findOneAndDelete({ ip })
        if (data) {
            return sendResponse(res, 200, "data deleted successfully", data)
        } else {
            return sendResponse(res, 404, "please enter valid id", data)
        }

    } catch (error) {
        return errorHandler(res, 500, error.message)
    }
}


const Allogs = {
    getAllLogs,
    getLogs,
    deleteLogs,
    getLogsCount
}
module.exports = Allogs