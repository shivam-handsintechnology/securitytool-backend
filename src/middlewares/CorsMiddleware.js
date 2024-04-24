const { errorHandler } = require("../utils/errorHandler");
const allowOrigin = ["https://securitytool-front.handsintechnology.in","http://localhost:3000"];
const SkipApi = [
"/api/client/protection",
"/api/client/sensitivekeysinurl",
"/api/client/createuserdetails",
// "/api/client/emailverify",
];
module.exports = async function cors(req, res, next) {
 
  // Set specific CORS headers
  res.header("Access-Control-Allow-Origin", "https://securitytool-front.handsintechnology.in");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
 console.log("Original Url",req.path)

  if (SkipApi.includes(req.path)) {
    // Skip CORS handling for the specific URL
    return next();
  }

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
}
