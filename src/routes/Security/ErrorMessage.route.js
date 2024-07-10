const router = require("express").Router();
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddleware, AuthDomainMiddleware } = require("../../middlewares/ValidationMiddleware");
const { DomainValidationSchema } = require("../../helpers/Validators");
const ErrorMessageController = require("../../controllers/Security/ErrorMessage.controller");
const GetFileCOntentMiddleware = require("../../middlewares/GetFileCOntentMiddleware")
router.get("/", ValidationMiddleware(DomainValidationSchema), GetFileCOntentMiddleware,
    ErrorMessageController.getAllErrorMessages)
router.get("/403error-message", ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware, GetFileCOntentMiddleware, ErrorMessageController.get403ErrorMessage)
router.get("/http-error-messages", ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware, GetFileCOntentMiddleware, ErrorMessageController.getHttpErrorMessages)
router.get("/login-error-messages", ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware, GetFileCOntentMiddleware, ErrorMessageController.getLoginErrorMessages)
module.exports = router