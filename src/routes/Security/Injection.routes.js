const router=require("express").Router()
const InjectionController=require("../../controllers/Security/Injection.controller")
const verifytoken=require("../../middlewares/VerifyUser")
router.get('/', verifytoken,InjectionController.getAllLogs)
router.route("/:ip",verifytoken).delete(InjectionController.deleteLogs).get(InjectionController.getLogs)
router.get('/count',verifytoken, InjectionController.getLogsCount);
module.exports=router
