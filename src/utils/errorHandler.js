const errorHandler = (res, statusCode = 500, message = "internal server error", data = null, error) => {

      let response = {}
      if (error) {
            console.log(error)
            response = {
                  statusCode: error.statusCode || 500,
                  message: error.message || "Internal server error",
                  success: false,
                  data
            }
      } else {
            response = { statusCode, message, succces: false, data }
      }


      return res.status(response.statusCode).json(response)
}
module.exports = {
      errorHandler
}