
const express = require('express');
const router = express.Router();
const Security = require('./security')
const GetClientInformation = require('./getClientintformation.route')
const SecurityMisconfiguration=require("./Security/SecurityMisconfiguration.route")
const SensitiveDataExposure=require("./Security/SensitiveDataExposure.route")
const SensitiveDataLocalStorage=require("../controllers/Security/SensitiveDataStoredInLocalStorage.controller")
const AuthSessionGuardian=require("./Security/AuthSessionGuardian.route")
const InsecureObjectRefGuard=require("./Security/Insecure_Direct_Object_References.route")
const InjectionsRoute=require("./Security/Injection.routes")
const WeekCrossDomainPolicy=require("./Security/WeakCrossDomainPolicy.route")
const Authrouter = require('./UserRoutes');
const { ValidationMiddleware, ValidationMiddlewareQuery} = require('../middlewares/ValidationMiddleware');
const verifytoken = require('../middlewares/VerifyUser')
const { DomainValidationSchema } = require('../helpers/Validators');
const verifyToken = require('../middlewares/VerifyUser');
const GetFileCOntentMiddleware = require('../middlewares/GetFileCOntentMiddleware');

const { SSLverifier } = require('../utils/Downtimemonitor');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const CorsMiddleware = require('../middlewares/CorsMiddleware');
router.use("/security",CorsMiddleware, verifytoken, Security)
// Get Client Information
router.use("/client", GetClientInformation)
// Auth
router.use("/auth",CorsMiddleware, Authrouter)
// Broken Authentication and Session Management
router.use("/AuthSessionGuardian",CorsMiddleware, verifyToken,
ValidationMiddleware(DomainValidationSchema),GetFileCOntentMiddleware,AuthSessionGuardian
)
// Injections
router.use("/injections",CorsMiddleware,InjectionsRoute)
// SSL Verify
router.use("/SSLVerify",CorsMiddleware, verifyToken,
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
router.use("/ErrorMessage",CorsMiddleware, require("./Security/ErrorMessage.route"))
// Insecure Direct Object References
router.use("/InsecureObjectRefGuard",CorsMiddleware, InsecureObjectRefGuard)
// SecurityMisconfiguration
router.use("/SecurityMisconfiguration",CorsMiddleware, SecurityMisconfiguration)
// SensitiveDataExposure
router.use("/SensitiveDataExposure",CorsMiddleware, SensitiveDataExposure)
// Unvalidated Redirects and Forwards
router.get("/UnvalidatedRedirects",CorsMiddleware,verifyToken,
ValidationMiddleware(DomainValidationSchema),GetFileCOntentMiddleware, require("../controllers/Security/UnvalidatedRedirectsandForwards.controller").get)
// Cross-Site Scripting (XSS)
router.use("/CrossSiteScripting",CorsMiddleware,verifyToken, require("./Security/CrossSiteScripting"))
// Sensitive data is Store in Local Storage
router.get("/SensitiveStorageLocalStorage",CorsMiddleware,verifyToken, SensitiveDataLocalStorage.get)
 // Week Cross Domain Policy
router.use("/WeakCrossDomainPolicy",CorsMiddleware,verifyToken,ValidationMiddleware(DomainValidationSchema),WeekCrossDomainPolicy )
router.use("/api",router)
module.exports = router