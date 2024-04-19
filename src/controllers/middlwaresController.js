
const { default: mongoose } = require('mongoose')
const { middlewareModel } = require('../models/midlwaresModel')
const { sendResponse } = require('../utils/dataHandler')
const { errorHandler } = require('../utils/errorHandler')
const getMiddlewareController = async (req, res) => {
  try {
    const data = await middlewareModel.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $project: {
          appid: 0,
          _id: 0,
          user: 0,
          createdAt: 0,
          updatedAt: 0,
          BlockUserMiddlware: 0,
          ldapInjectionDetectorMiddlware: 0,
          __v: 0
        }
      }
    ])
    if (data) {
     return  sendResponse(res, 200, "data fetch successfully", data[0])
    } else {
      return sendResponse(res, 404, "data Not Found")
    }
  } catch (error) {
   return errorHandler(res,500,error.message)
  }
}
const getMiddlewareControllerForClient = async (req, res) => {
  try {
    if (req.query.appid) {

      const data = await middlewareModel.findOne({ appid: req.query.appid })
      if (data) {
        return  sendResponse(res, 200, "data fetch successfully", data)
      } else {
        return  sendResponse(res, 404, "Your App id Not matched")
      }
    } else {
      return sendResponse(res, 404, "Please enter appid")
    }

  } catch (error) {
    console.error(error)
    return errorHandler(res,500,error.message)
  }
}
const findAndUpdateMiddlewareController = async (req, res) => {

  const body = req.body
  try {
    const data = await middlewareModel.findOneAndUpdate({ user: req.user.id }, body, { new: true }).select("-__v -appid -_id -user -createdAt -updatedAt -BlockUserMiddlware -ldapInjectionDetectorMiddlware")
    if (data) {
      const message = Object.keys(req.body).toString().replace('Middlware', '') + " " + "updated successfully"
      setTimeout(() => {
        process.exit()
      }, 5000);
      return  sendResponse(res, 200, message, data)
    } else {
     return sendResponse(res, 404, "data Not Found")
    }

  } catch (error) {
    return errorHandler(res,500,error.message)
  }
}
const middlwareController = {
  findAndUpdateMiddlewareController,
  getMiddlewareController,
  getMiddlewareControllerForClient
}
module.exports = middlwareController