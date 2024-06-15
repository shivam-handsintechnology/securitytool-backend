const router = require("express").Router()
const InjectionController = require("../../controllers/Security/Injection.controller")
const { DomainValidationSchema } = require("../../helpers/Validators")
const { ValidationMiddlewareQuery } = require("../../middlewares/ValidationMiddleware")
router.get('/count', ValidationMiddlewareQuery(DomainValidationSchema), InjectionController.getLogsCount);
router.get("/testvulnurability", InjectionController.testVulnurability)
router.get('/', InjectionController.getAllLogs)
router.route("/:ip").delete(InjectionController.deleteLogs).get(InjectionController.getLogs)
module.exports = router
