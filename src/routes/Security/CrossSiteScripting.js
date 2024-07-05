const router = require("express").Router()
const CrossSiteScripting = require("../../controllers/Security/CrossSiteScripting.controller")
const { DomainValidationSchema } = require("../../helpers/Validators")
const { ValidationMiddleware } = require("../../middlewares/ValidationMiddleware")
const verifytoken = require("../../middlewares/VerifyUser")
router.get('/', verifytoken, ValidationMiddleware(DomainValidationSchema), CrossSiteScripting.XSSvulnurability)
module.exports = router
