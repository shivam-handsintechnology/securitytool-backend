const router=require("express").Router()
const InjectionController=require("../../controllers/Security/Injection.controller")
const { DomainValidationSchema } = require("../../helpers/Validators")
const { ValidationMiddlewareQuery } = require("../../middlewares/ValidationMiddleware")
const verifytoken=require("../../middlewares/VerifyUser")
router.get('/count',verifytoken,ValidationMiddlewareQuery(DomainValidationSchema), InjectionController.getLogsCount);
router.get('/', verifytoken,InjectionController.getAllLogs)
router.route("/:ip",verifytoken).delete(InjectionController.deleteLogs).get(InjectionController.getLogs)
module.exports=router
