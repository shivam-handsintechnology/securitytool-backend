
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
const { ValidationMiddleware,ValidationMiddlewareQuery,AuthDomainMiddleware } = require('../middlewares/ValidationMiddleware');
const { DomainValidationSchema } = require('../helpers/Validators');
router.get('/', (req, res) => {
  try {
   return  res.render('index', { title: 'Express.js' });
  } catch (error) {
    console.log("error",error)
    return res.status(500).json({ message: 'Something broke!' });
  }
})
router.use("/security", verifytoken, Security)
router.use("/client", GetClientInformation)
router.use("/auth", Authrouter)
// Broken Authentication and Session Management
router.use("/AuthSessionGuardian",AuthSessionGuardian
)
// Injections
router.use("/injections",InjectionsRoute)
// Error Message
router.use("/ErrorMessage", require("./Security/ErrorMessage.route"))
// Insecure Direct Object References
router.use("/InsecureObjectRefGuard", InsecureObjectRefGuard)
// SecurityMisconfiguration
router.use("/SecurityMisconfiguration", SecurityMisconfiguration)
// SensitiveDataExposure
router.use("/SensitiveDataExposure", SensitiveDataExposure)
module.exports = router