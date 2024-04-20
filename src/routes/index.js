
const express = require('express');
const router = express.Router();
const Security = require('./security')
const verifytoken = require('../middlewares/VerifyUser')
const GetClientInformation = require('./getClientintformation.route')
const SecurityMisconfiguration=require("./Security/SecurityMisconfiguration.route")
const SensitiveDataExposure=require("./Security/SensitiveDataExposure.route")
const AuthSessionGuardian=require("./Security/AuthSessionGuardian.route")
const InsecureObjectRefGuard=require("./Security/Insecure_Direct_Object_References.route")
const InjectionsRoute=require("./Security/Injection.routes")
const Authrouter = require('./UserRoutes');
const { ValidationMiddleware, ValidationMiddlewareQuery} = require('../middlewares/ValidationMiddleware');
const { DomainValidationSchema } = require('../helpers/Validators');
const verifyToken = require('../middlewares/VerifyUser');
const GetFileCOntentMiddleware = require('../middlewares/GetFileCOntentMiddleware');

const { SSLverifier } = require('../utils/Downtimemonitor');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
router.use("/security", verifytoken, Security)
// Get Client Information
router.use("/client", GetClientInformation)
// Auth
router.use("/auth", Authrouter)
// Broken Authentication and Session Management
router.use("/AuthSessionGuardian", verifyToken,
ValidationMiddleware(DomainValidationSchema),GetFileCOntentMiddleware,AuthSessionGuardian
)
// Injections
router.use("/injections",InjectionsRoute)
// SSL Verify
router.use("/SSLVerify", verifyToken,
ValidationMiddlewareQuery(DomainValidationSchema),async (req, res) => {
  try {
      let domain = req.query.domain
      const response = await SSLverifier(domain).then(data => data)
      return sendResponse(res, 200, "SSL verified successfully", response)
  } catch (error) {
  
      return errorHandler(res, 500, error.message)
  }
})
// Error Message
router.use("/ErrorMessage", require("./Security/ErrorMessage.route"))
// Insecure Direct Object References
router.use("/InsecureObjectRefGuard", InsecureObjectRefGuard)
// SecurityMisconfiguration
router.use("/SecurityMisconfiguration", SecurityMisconfiguration)
// SensitiveDataExposure
router.use("/SensitiveDataExposure", SensitiveDataExposure)
router.use("/api",router)
module.exports = router