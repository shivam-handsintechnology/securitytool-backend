const { errorHandler } = require("../utils/errorHandler");

module.exports = {
  cors: async function cors(req, res, next) {
    try {
      const Origin = process.env.NODE_ENV === "production" ? "https://securitytool-front.handsintechnology.in" : "http://localhost:3000"
      // Set specific CORS headers
      res.header("Access-Control-Allow-Origin", Origin);
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Cross-Origin-Resource-Policy', "cross-origin");
      res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Origin, X-Requested-With,Accept");
      // Check if the request has an origin header
      if (!req.headers.origin) {
        return errorHandler(res, 403, "Forbidden");
      }

      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }

      // Continue to the next middleware or route handler
      return next();
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  allowall: async function allowall(req, res, next) {
    // Set specific CORS headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    // Continue to the next middleware or route handler
    return next();

  }
}