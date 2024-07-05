const router = require("express").Router()
const InjectionController = require("../../controllers/Security/Injection.controller")
const { DomainValidationSchema } = require("../../helpers/Validators")
const DomainCheckerMiddleware = require("../../middlewares/DomainCheckerMiddleware")
const { ValidationMiddleware } = require("../../middlewares/ValidationMiddleware")

router.get('/count', ValidationMiddleware(DomainValidationSchema), InjectionController.getLogsCount);
router.get("/testvulnurability", ValidationMiddleware(DomainValidationSchema), DomainCheckerMiddleware, InjectionController.testVulnurability)
router.get('/', InjectionController.getAllLogs)
router.route("/:ip").delete(DomainCheckerMiddleware, InjectionController.deleteLogs).get(DomainCheckerMiddleware, InjectionController.getLogs)
module.exports = router
