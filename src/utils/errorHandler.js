const errorHandler=(res,statusCode=500,message="internal server error",data)=>{
    const response={statusCode,message,data}
      res.status(statusCode).json(response)
}
module.exports={
      errorHandler
     }