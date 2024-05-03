const errorHandler = (res, statusCode = 500, message = "internal server error",data=null) => {
      const response = { statusCode, message,succces:false, data }
      return res.status(statusCode).json(response)
}
module.exports = {
      errorHandler
}