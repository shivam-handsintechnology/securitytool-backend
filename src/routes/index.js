
const express = require('express');
const router = express.Router();
const Security = require('./security')
const verifytoken = require('../middlewares/VerifyUser')
const GetClientInformation = require('./getClientintformation.route')
const SecurityMisconfiguration=require("./Security/SecurityMisconfiguration.route")
const AuthSessionGuardian=require("./Security/AuthSessionGuardian.route")
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
// SecurityMisconfiguration
router.use("/api/SecurityMisconfiguration", SecurityMisconfiguration)

module.exports = router