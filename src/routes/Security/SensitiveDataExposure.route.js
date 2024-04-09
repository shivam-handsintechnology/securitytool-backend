const router = require("express").Router()
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddlewareQuery,AuthDomainMiddleware } = require("../../middlewares/ValidationMiddleware");
const SensitiveDataExposure = require("../../controllers/Security/SensitiveDataExposure.controller");
const { DomainValidationSchema } = require("../../helpers/Validators");

router.post("/email-harvesting", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.emailHarvesting)
router.get("/sourcecode-disclosoure", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.sourcecodeDisclousoure)
router.get("/DefaultWebPage", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    AuthDomainMiddleware,
    SensitiveDataExposure.DefaultWebPage)

module.exports = router