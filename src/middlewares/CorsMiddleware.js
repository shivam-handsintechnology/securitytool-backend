const { errorHandler } = require("../utils/errorHandler");
console.log(process.env.PROD_ORIGIN)
console.log(process.env.DEV_ORIGIN)
module.exports = {
  cors: async function cors(req, res, next) {
    try {
      const Origin = process.env.NODE_ENV === "production" ? process.env.PROD_ORIGIN : process.env.DEV_ORIGIN
      // Set specific CORS headers
      console.log({ Origin })
      res.header("Access-Control-Allow-Origin", Origin);
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Cross-Origin-Resource-Policy', "cross-origin");
      res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Origin, X-Requested-With,Accept");

      if (!req.headers.origin || !req.headers["x-origin"]) {
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