const { AllowedDomainsModel } = require("../models/AllowedDomainsModel");

// Custom middleware to check if the person is verified
module.exports = async function checkVerification(req, res, next) {
  if (!req.query.host) {
    return res.json("please provide hostname")
  }
  const alloweddomains = await AllowedDomainsModel.findOne(
    { domain: req.query.host },
    { _id: 0 }
  ).lean();
  if (alloweddomains) {
    // Person is verified, proceed to serve the file
    next();
  } else {
    // Person is not verified, send an error response or redirect
    return  res.status(401).json('Unauthorized'); // Example error response
  }
}