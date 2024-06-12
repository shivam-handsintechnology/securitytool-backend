const jwt = require("jsonwebtoken");

const { sendResponse } = require("../utils/dataHandler");
const { errorHandler } = require("../utils/errorHandler");
const verifyToken = (req, res, next) => {
  try {
    console.log(req.query)
    console.log("verify token", req.headers.authorization)
    var Authenticate = true;
    const authHeader = req.headers.authorization || req.query.authorization || req.body.authorization || req.headers.Authorization || req.query.Authorization || req.body.Authorization
    if (!authHeader) {
      Authenticate = false;
      return sendResponse(res, 403, "missing authorization", { Authenticate })
    }
    const [authType, token] = authHeader.split(' ');
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        Authenticate = false;
        return sendResponse(res, 403, err.message, { Authenticate })
      }
      req.user = user
      next();
    });

  } catch (error) {
    console.log(error)
    return errorHandler(res, 500, error.message)
  }
};


module.exports = verifyToken;