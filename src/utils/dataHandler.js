const sendResponse=(res,statusCode=500,message="Success",data)=>{
    const response={statusCode,message,data}
    return res.status(statusCode).json(response)
}
const handelErrors=(err, req, res, next) => {
  //console.log({name:error.name})
    if (err instanceof SyntaxError) {
      // handle syntax errors without stack trace
      res.status(400).json({ error: 'Bad request' });
    } else {
      // handle other errors without stack trace
      res.status(500).json({ error: 'Internal server error' });
    }
  }
module.exports={
    sendResponse,
    handelErrors
}