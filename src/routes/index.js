
const express = require('express');

const router = express.Router();
const Security = require('./security')
const GetClientInformation = require('./monitor.route')
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
const CorsMiddleware = require('../middlewares/CorsMiddleware').cors;
const allowall = require('../middlewares/CorsMiddleware').allowall
const IncomingDataHashFormat = require('../middlewares/IncomingDataHashFormat')


router.use("/security",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat, verifytoken, Security)
// Get Client Information
router.use("/client",allowall, GetClientInformation)
// Auth
router.use("/auth",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat, Authrouter)
// Broken Authentication and Session Management
router.use("/AuthSessionGuardian",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat, verifyToken,
ValidationMiddleware(DomainValidationSchema),GetFileCOntentMiddleware,AuthSessionGuardian
)
// Injections
router.use("/injections",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat,InjectionsRoute)
// SSL Verify
router.use("/SSLVerify",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat, verifyToken,
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
router.use("/ErrorMessage",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat, require("./Security/ErrorMessage.route"))
// Insecure Direct Object References
router.use("/InsecureObjectRefGuard",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat, InsecureObjectRefGuard)
// SecurityMisconfiguration
router.use("/SecurityMisconfiguration",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat, SecurityMisconfiguration)
// SensitiveDataExposure
router.use("/SensitiveDataExposure",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat, SensitiveDataExposure)
// Unvalidated Redirects and Forwards
router.use("/UnvalidatedRedirects",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat,verifyToken,
ValidationMiddleware(DomainValidationSchema),GetFileCOntentMiddleware, require("../controllers/Security/UnvalidatedRedirectsandForwards.controller").get)
// Cross-Site Scripting (XSS)
router.use("/CrossSiteScripting",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat,verifyToken, require("./Security/CrossSiteScripting"))
// Sensitive data is Store in Local Storage
router.use("/SensitiveStorageLocalStorage",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat,verifyToken, SensitiveDataLocalStorage.get)
 // Week Cross Domain Policy
router.use("/WeakCrossDomainPolicy",IncomingDataHashFormat,CorsMiddleware,IncomingDataHashFormat.convertResponseDatatoEncryptedFormat,verifyToken,ValidationMiddleware(DomainValidationSchema),WeekCrossDomainPolicy)
router.use("/api",router)
module.exports = router