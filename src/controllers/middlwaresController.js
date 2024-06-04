

const { default: axios } = require('axios')
const { sendResponse } = require('../utils/dataHandler')
const { errorHandler } = require('../utils/errorHandler')
const getMiddlewareController = async (req, res) => {
  try {
    const { type } = req.query
    await axios.get(`http://${req.query.domain}/middleware?type=${type}`, {
      headers: {
        'origin': "https://securitytool.handsintechnology.in",
      }
    })
      .then((response) => {
        console.log(response.data)
        if (response.data) {
          return sendResponse(res, 200, "success", { middleware: response.data.data })
        } else {
          return sendResponse(res, 404, "No data found")
        }
      })
      .catch((error) => {
        console.log(error.message)
        return errorHandler(res, 500, error.message)
      })
  } catch (error) {
    return errorHandler(res, 500, error.message)
  }
}

const findAndUpdateMiddlewareController = async (req, res) => {
  const { domain, value, type } = req.body
  console.log(type, value)
  try {
    await axios.post(`https://${domain}/middleware`, {
      [type]: value
    }, {
      headers: {
        'origin': "https://securitytool.handsintechnology.in",
      }
    })
      .then((response) => {
        console.log(response.status, response.data)
        if (response.status === 200) {
          return sendResponse(res, 200, `${type} Protection is ${value ? "On" : "Off"}`,
            Date.now()
          )
        }
      })

  } catch (error) {
    return errorHandler(res, 500, error.message)
  }
}
const middlwareController = {
  findAndUpdateMiddlewareController,
  getMiddlewareController
}
module.exports = middlwareController