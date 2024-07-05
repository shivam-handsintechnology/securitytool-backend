const router = require("express").Router()
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddleware, AuthDomainMiddleware } = require("../../middlewares/ValidationMiddleware");
const SensitiveDataExposure = require("../../controllers/Security/SensitiveDataExposure.controller");
const { DomainValidationSchema } = require("../../helpers/Validators");
const GetFileCOntentMiddleware = require("../../middlewares/GetFileCOntentMiddleware");

router.route("/sensitive-data",
).get(verifyToken, ValidationMiddleware(DomainValidationSchema), SensitiveDataExposure.SensitiveKeysinUrl).delete(verifyToken, ValidationMiddleware(DomainValidationSchema), SensitiveDataExposure.SensitiveKeysinUrlDelete)
router.get("/sourcecode-disclosoure", verifyToken,
    ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware,
    GetFileCOntentMiddleware,
    SensitiveDataExposure.sourcecodeDisclousoure)

// Critical information in URL
router.get("/DefaultWebPage", verifyToken,
    ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.DefaultWebPage)
router.post("/critical-info-url", verifyToken,
    // ValidationMiddleware(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.DefaultWebPage)
router.get("/fingerprint-detection", verifyToken,
    ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.FingerprintDetection)
router.get("/server-path-disclosure", verifyToken,
    ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.ServerPathDisclosure),
    router.get("/ServerFileAvailbleInCLearText", verifyToken,
        ValidationMiddleware(DomainValidationSchema),
        GetFileCOntentMiddleware, AuthDomainMiddleware,
        SensitiveDataExposure.ServerFileAvailbleInCLearText)
router.get("/server-plain-text", verifyToken, ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.SensitiveDataInPlainText)
router.get("/server-crendetial-plain-text", verifyToken, ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware,
    SensitiveDataExposure.SensitiveDataInPlainText)
router.get("/clear-password-text-response", verifyToken, ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware, SensitiveDataExposure.ClearPasswordtext)
router.get("/Private-IP-address-disclosed", verifyToken, ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware, SensitiveDataExposure.PrivateIPdisclosed)

module.exports = router