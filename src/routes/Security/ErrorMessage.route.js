const router = require("express").Router();
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddlewareQuery,AuthDomainMiddleware } = require("../../middlewares/ValidationMiddleware");
const SecurityMisconfiguration = require("../../controllers/Security/SecurityMisconfiguration.controller");
const { DomainValidationSchema } = require("../../helpers/Validators");
const ErrorMessageController = require("../../controllers/Security/ErrorMessage.controller");
router.get("/", verifyToken,ErrorMessageController.getAllErrorMessages)
router.get("/403error-message", verifyToken,ErrorMessageController.get403ErrorMessage)
router.get("/http-error-messages", verifyToken,ErrorMessageController.getHttpErrorMessages)
router.get("/login-error-messages", verifyToken,ErrorMessageController.getLoginErrorMessages)
module.exports = router