const
    router = require("express").Router()
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddlewareQuery } = require("../../middlewares/ValidationMiddleware");
const SecurityMisconfiguration = require("../../controllers/Security/SecurityMisconfiguration.controller");
const { DomainValidationSchema } = require("../../helpers/Validators");

router.get("/arbitrary-methods", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    SecurityMisconfiguration.arbitraryMethods)

router.get("/passwords-insecure", verifyToken,
    // ValidationMiddlewareQuery(DomainValidationSchema),
    SecurityMisconfiguration.passwordsInsecure)
module.exports = router