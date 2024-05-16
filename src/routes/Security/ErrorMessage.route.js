const router = require("express").Router();
const verifyToken = require('../../middlewares/VerifyUser')
const { ValidationMiddleware } = require("../../middlewares/ValidationMiddleware");
const { DomainValidationSchema } = require("../../helpers/Validators");
const ErrorMessageController = require("../../controllers/Security/ErrorMessage.controller");
const GetFileCOntentMiddleware = require("../../middlewares/GetFileCOntentMiddleware")
router.get("/",verifyToken,ValidationMiddleware(DomainValidationSchema),GetFileCOntentMiddleware,
ErrorMessageController.getAllErrorMessages)
router.get("/403error-message",verifyToken,ValidationMiddleware(DomainValidationSchema), GetFileCOntentMiddleware,ErrorMessageController.get403ErrorMessage)
router.get("/http-error-messages",verifyToken,ValidationMiddleware(DomainValidationSchema), GetFileCOntentMiddleware,ErrorMessageController.getHttpErrorMessages)
router.get("/login-error-messages",verifyToken,ValidationMiddleware(DomainValidationSchema),GetFileCOntentMiddleware,ErrorMessageController.getLoginErrorMessages)
module.exports = router