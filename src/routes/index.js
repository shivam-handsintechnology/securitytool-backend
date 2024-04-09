
const express = require('express');
const router = express.Router();
const Security = require('./security')
const verifytoken = require('../middlewares/VerifyUser')
const GetClientInformation = require('./getClientintformation.route')
const SecurityMisconfiguration=require("./Security/SecurityMisconfiguration.route")
const SensitiveDataExposure=require("./Security/SensitiveDataExposure.route")
const AuthSessionGuardian=require("./Security/AuthSessionGuardian.route")
const InsecureObjectRefGuard=require("./Security/Insecure_Direct_Object_References.route")
const Authrouter = require('./UserRoutes');
const { ValidationMiddleware,ValidationMiddlewareQuery,AuthDomainMiddleware } = require('../middlewares/ValidationMiddleware');
const { DomainValidationSchema } = require('../helpers/Validators');

// router.get('/', (req, res) => {
//     res.send("Welcome to the application")
// })
router.use("/api/security", verifytoken, Security)
router.use("/api/client", GetClientInformation)
router.use("/api/auth", Authrouter)
// Broken Authentication and Session Management
router.get("/api/AuthSessionGuardian/SessionManagement",
verifytoken,
// ValidationMiddlewareQuery(DomainValidationSchema),
AuthDomainMiddleware,
AuthSessionGuardian.SessionManagement
)
// Insecure Direct Object References
router.use("/api/InsecureObjectRefGuard", InsecureObjectRefGuard)
// SecurityMisconfiguration
router.use("/api/SecurityMisconfiguration", SecurityMisconfiguration)
// SensitiveDataExposure
router.use("/api/SensitiveDataExposure", SensitiveDataExposure)

module.exports = router