const router=require("express").Router()
const CrossSiteScripting=require("../../controllers/Security/CrossSiteScripting.controller")
const { DomainValidationSchema } = require("../../helpers/Validators")
const { ValidationMiddlewareQuery } = require("../../middlewares/ValidationMiddleware")
const verifytoken=require("../../middlewares/VerifyUser")
router.get('/', verifytoken,ValidationMiddlewareQuery(DomainValidationSchema),CrossSiteScripting.XSSvulnurability)
module.exports=router
