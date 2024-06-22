const router = require("express").Router()
const InjectionController = require("../../controllers/Security/Injection.controller")
const { DomainValidationSchema } = require("../../helpers/Validators")
const DomainCheckerMiddleware = require("../../middlewares/DomainCheckerMiddleware")
const { ValidationMiddlewareQuery } = require("../../middlewares/ValidationMiddleware")

router.get('/count', ValidationMiddlewareQuery(DomainValidationSchema), InjectionController.getLogsCount);
router.get("/testvulnurability", ValidationMiddlewareQuery(DomainValidationSchema), DomainCheckerMiddleware, InjectionController.testVulnurability)
router.get('/', InjectionController.getAllLogs)
router.route("/:ip").delete(DomainCheckerMiddleware, InjectionController.deleteLogs).get(DomainCheckerMiddleware, InjectionController.getLogs)
module.exports = router
