
const express = require('express');

const router = express.Router();
const AuditMiddleware = require('../middlewares/AuditMiddleware');
// Import Middlewares  And Functions

const { ValidationMiddleware, ValidationMiddlewareQuery, AuthDomainMiddleware, AuthWebDomainMiddleware } = require('../middlewares/ValidationMiddleware');
const verifytoken = require('../middlewares/VerifyUser')
const verifyToken = require('../middlewares/VerifyUser');
const GetFileCOntentMiddleware = require('../middlewares/GetFileCOntentMiddleware');
const CorsMiddleware = require('../middlewares/CorsMiddleware').cors;
const allowall = require('../middlewares/CorsMiddleware').allowall
const IncomingDataHashFormat = require('../middlewares/IncomingDataHashFormat')
const { DomainValidationSchema } = require('../helpers/Validators');
const Security = require('./security.routes')
const GetClientInformation = require('./monitor.routes')
const SecurityMisconfiguration = require("./Security/SecurityMisconfiguration.route")
const SensitiveDataExposure = require("./Security/SensitiveDataExposure.route")
const SensitiveDataLocalStorage = require("../controllers/Security/SensitiveDataStoredInLocalStorage.controller")
const AuthSessionGuardian = require("./Security/AuthSessionGuardian.route")
const InsecureObjectRefGuard = require("./Security/Insecure_Direct_Object_References.route")
const InjectionsRoute = require("./Security/Injection.routes")
const WeekCrossDomainPolicy = require("./Security/WeakCrossDomainPolicy.route")
const Authrouter = require('./user.routes');
const MissingFunctionalLevelAccessControlrouter = require("./Security/MissingFunctionLevelAccessControl.routes")
const VideoStreamRouter = require("./VideoStream.route")
const SSlRouter = require("./Security/SSL.routes")
const MiscellaneousAttacksRoute = require("./Security/MisccellaneousAttacks.route")
const ErrorMessagesRoute = require("./Security/ErrorMessage.route")
const subsriptionrouter = require("./Security/subsription.routes")
const UnvalidatedRedirectsandForwardsRouter = require("../controllers/Security/UnvalidatedRedirectsandForwards.controller").get
const CrossSiteScriptingRouer = require("./Security/CrossSiteScripting")
// Import Routes
router.use("/security", IncomingDataHashFormat, CorsMiddleware, verifytoken, Security)
// Get Client Information
router.use("/client", allowall, GetClientInformation)
// Auth
router.use("/auth", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, Authrouter)
// subsription
router.use("/subsription", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, subsriptionrouter)
// Broken Authentication and Session Management
router.use("/AuthSessionGuardian", IncomingDataHashFormat, CorsMiddleware, verifyToken,
  ValidationMiddleware(DomainValidationSchema), AuthSessionGuardian
)
// Injections
router.use("/injections", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, verifyToken, AuthDomainMiddleware, InjectionsRoute)
// SSL Verify
router.use("/SSLVerify", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, verifyToken,
  ValidationMiddlewareQuery(DomainValidationSchema), SSlRouter)
// Error Message
router.use("/ErrorMessage", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, ErrorMessagesRoute)
// Insecure Direct Object References
router.use("/InsecureObjectRefGuard", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, InsecureObjectRefGuard)
// SecurityMisconfiguration
router.use("/SecurityMisconfiguration", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, SecurityMisconfiguration)
// Missing Function Level Access Control
router.use("/MissingFunctionLevelAccessControl", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, verifyToken, MissingFunctionalLevelAccessControlrouter)
// SensitiveDataExposure
router.use("/SensitiveDataExposure", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, SensitiveDataExposure)
// Unvalidated Redirects and Forwards
router.use("/UnvalidatedRedirects", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, verifyToken, AuthDomainMiddleware,
  ValidationMiddleware(DomainValidationSchema), GetFileCOntentMiddleware, UnvalidatedRedirectsandForwardsRouter)
// Cross-Site Scripting (XSS)
router.use("/CrossSiteScripting", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, verifyToken, AuthDomainMiddleware, CrossSiteScriptingRouer)
// Sensitive data is Store in Local Storage
router.use("/SensitiveStorageLocalStorage", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, verifyToken, AuthWebDomainMiddleware, SensitiveDataLocalStorage.get)
// Week Cross Domain Policy
router.use("/WeakCrossDomainPolicy", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, verifyToken, ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware, WeekCrossDomainPolicy)
// MiscellaneousAttacks
router.use("/MiscellaneousAttacks", AuditMiddleware, IncomingDataHashFormat, CorsMiddleware, MiscellaneousAttacksRoute)
// vide streaming route
router.use("/videostream", IncomingDataHashFormat, VideoStreamRouter)
router.use("/api", router)


module.exports = router