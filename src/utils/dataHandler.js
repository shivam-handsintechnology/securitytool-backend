
const sendResponse = (res, statusCode = 200, message = "Success", data = null) => {
  // let encryptdata=encryptData(data)
  const response = { statusCode, succces: true, message, data }
  return res.status(statusCode).json(response)
}
const handelErrors = (err, req, res) => {
  if (err instanceof SyntaxError) {
    // handle syntax errors without stack trace
    return res.status(400).json({ error: 'Bad request' });
  } else {
    // handle other errors without stack trace
    return res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {
  sendResponse,
  handelErrors
}