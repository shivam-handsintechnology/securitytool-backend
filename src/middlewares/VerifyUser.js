const jwt = require("jsonwebtoken");

const { sendResponse } = require("../utils/dataHandler");
const verifyToken = (req, res, next) => {
  var Authenticate = true;
  const authHeader = req.headers.authorization;
  //console.log()
  // //console.log({authHeader})
  if (!authHeader) {
    Authenticate = false;
    return sendResponse(res, 403, "missing authorization", { Authenticate })
  }
  const [authType, token] = authHeader.split(' ');

  switch (authType) {
    case 'Bearer':
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) {
          Authenticate = false;
          return sendResponse(res, 403, err.message, { Authenticate })
        }
        req.user = { ...user, selectedhost: req.headers.SelectedHost ? req.headers.SelectedHost : null };
        next();
      });
      break;

    case 'Basic':
      const credentials = Buffer.from(token, 'base64').toString('utf-8').split(':');
      const username = credentials[0];
      const password = credentials[1];
      // Perform basic auth validation logic here
      // ...

      // If authenticated successfully, proceed to the next middleware
      req.user = { username };
      next();
      break;

    case 'AWS':
      // Handle AWS auth here
      // ...

      // If authenticated successfully, proceed to the next middleware
      req.user = { /* user info */ };
      next();
      break;

    case 'OAuth':
      // Handle OAuth here
      // ...

      // If authenticated successfully, proceed to the next middleware
      req.user = { /* user info */ };
      next();
      break;

    default:
      Authenticate = false;
      return sendResponse(res, 403, "unknown authorization type", { Authenticate });
  }
};


module.exports = verifyToken;