const router = require("express").Router()
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddlewareQuery,AuthDomainMiddleware } = require("../../middlewares/ValidationMiddleware");
const SensitiveDataExposure = require("../../controllers/Security/SensitiveDataExposure.controller");
const { DomainValidationSchema } = require("../../helpers/Validators");

router.get("/email-harvesting", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.emailHarvesting)
router.get("/sensitive-data", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    // AuthDomainMiddleware,
    SensitiveDataExposure.SensitiveKeysinUrl)
router.get("/sourcecode-disclosoure", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.sourcecodeDisclousoure)
   
// Critical information in URL
router.get("/DefaultWebPage", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.DefaultWebPage)
router.post("/critical-info-url", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.DefaultWebPage)
router.get("/fingerprint-detection", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.FingerprintDetection)

module.exports = router