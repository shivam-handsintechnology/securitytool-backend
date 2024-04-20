const { errorHandler } = require("../utils/errorHandler");

module.exports = async function cors(req, res, next) {
    console.log(req.headers)
    let allowOrigin="https://securitytool.handsintechnology.in"
    //  let allowOrigin="http://localhost:3000"
    res.header("Access-Control-Allow-Origin", allowOrigin);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    if (req.originalUrl === '/api/client/protection') {
        // Skip CORS handling for the specific URL
        return next();
      }
    if (!req.headers.origin) {
        return errorHandler(res, 403, "Forbidden")
    }else if (req.headers.origin !== allowOrigin) {
        return errorHandler(res, 403, "Forbidden")
    }
    if (req.method === 'OPTIONS') {
        // Handle preflight requests
        res.sendStatus(200);
    }
   return next()
}
