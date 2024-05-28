const
    router = require("express").Router()
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddlewareQuery, AuthDomainMiddleware, ValidationMiddleware } = require("../../middlewares/ValidationMiddleware");
const SecurityMisconfiguration = require("../../controllers/Security/SecurityMisconfiguration.controller");
const { DomainValidationSchema } = require("../../helpers/Validators");
const GetFileCOntentMiddleware = require("../../middlewares/GetFileCOntentMiddleware");
const { decryptData } = require("../../middlewares/IncomingDataHashFormat");

router.get("/arbitrary-methods", verifyToken, ValidationMiddleware(DomainValidationSchema), GetFileCOntentMiddleware,
    SecurityMisconfiguration.arbitraryMethods)

router.get("/passwords-insecure", verifyToken,
    verifyToken, ValidationMiddleware(DomainValidationSchema),
    SecurityMisconfiguration.passwordsInsecure)
router.get("/week-passwords-insecure", verifyToken,
    verifyToken, ValidationMiddleware(DomainValidationSchema),
    SecurityMisconfiguration.WealALgorithmPassword)
router.get("/support-oldnodejs-version", verifyToken,
    ValidationMiddleware(DomainValidationSchema),
    SecurityMisconfiguration.supportoldnodejsversion)
router.get("/dangerous-http-methods-enabled", verifyToken,
    ValidationMiddleware(DomainValidationSchema), GetFileCOntentMiddleware,
    SecurityMisconfiguration.DangerousHttpMethodsEnabled)
router.get("/option-methods-enabled", verifyToken,
    ValidationMiddleware(DomainValidationSchema), GetFileCOntentMiddleware,
    SecurityMisconfiguration.OptionsMethodsEnabled)

router.get("/defaultpasswordandusername", ValidationMiddleware(DomainValidationSchema), SecurityMisconfiguration.defaultpasswordandusername);

module.exports = router