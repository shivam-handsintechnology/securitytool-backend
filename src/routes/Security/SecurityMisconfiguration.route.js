const
    router = require("express").Router()
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddlewareQuery,AuthDomainMiddleware } = require("../../middlewares/ValidationMiddleware");
const SecurityMisconfiguration = require("../../controllers/Security/SecurityMisconfiguration.controller");
const { DomainValidationSchema } = require("../../helpers/Validators");

router.get("/arbitrary-methods", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    SecurityMisconfiguration.arbitraryMethods)

router.get("/passwords-insecure", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    SecurityMisconfiguration.passwordsInsecure)
router.get("/week-passwords-insecure", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    SecurityMisconfiguration.WealALgorithmPassword)
router.get("/support-oldnodejs-version", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    SecurityMisconfiguration.supportoldnodejsversion)
router.get("/dangerous-http-methods-enabled", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    SecurityMisconfiguration.DangerousHttpMethodsEnabled)
router.get("/option-methods-enabled", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    SecurityMisconfiguration.OptionsMethodsEnabled)
router.post("/endpoints",
    ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SecurityMisconfiguration.endpoints)
module.exports = router