const router = require("express").Router()
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddlewareQuery, AuthDomainMiddleware } = require("../../middlewares/ValidationMiddleware");
const SensitiveDataExposure = require("../../controllers/Security/SensitiveDataExposure.controller");
const { DomainValidationSchema } = require("../../helpers/Validators");
const GetFileCOntentMiddleware = require("../../middlewares/GetFileCOntentMiddleware");

router.route("/sensitive-data",
).get(verifyToken, ValidationMiddlewareQuery(DomainValidationSchema), SensitiveDataExposure.SensitiveKeysinUrl).delete(verifyToken, ValidationMiddlewareQuery(DomainValidationSchema), SensitiveDataExposure.SensitiveKeysinUrlDelete)
router.get("/sourcecode-disclosoure", verifyToken,
    ValidationMiddlewareQuery(DomainValidationSchema), AuthDomainMiddleware,
    GetFileCOntentMiddleware,
    SensitiveDataExposure.sourcecodeDisclousoure)

// Critical information in URL
router.get("/DefaultWebPage", verifyToken,
    ValidationMiddlewareQuery(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.DefaultWebPage)
router.post("/critical-info-url", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.DefaultWebPage)
router.get("/fingerprint-detection", verifyToken,
    ValidationMiddlewareQuery(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.FingerprintDetection)
router.get("/server-path-disclosure", verifyToken,
    ValidationMiddlewareQuery(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.ServerPathDisclosure),
    router.get("/ServerFileAvailbleInCLearText", verifyToken,
        ValidationMiddlewareQuery(DomainValidationSchema),
        GetFileCOntentMiddleware, AuthDomainMiddleware,
        SensitiveDataExposure.ServerFileAvailbleInCLearText)
router.get("/server-plain-text", verifyToken, ValidationMiddlewareQuery(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.SensitiveDataInPlainText)
router.get("/server-crendetial-plain-text", verifyToken, ValidationMiddlewareQuery(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.SensitiveDataInPlainText)
router.get("/clear-password-text-response", verifyToken, ValidationMiddlewareQuery(DomainValidationSchema), AuthDomainMiddleware, SensitiveDataExposure.ClearPasswordtext)
router.get("/Private-IP-address-disclosed", verifyToken, ValidationMiddlewareQuery(DomainValidationSchema), AuthDomainMiddleware, SensitiveDataExposure.PrivateIPdisclosed)

module.exports = router