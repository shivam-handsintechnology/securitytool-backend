const router=require("express").Router();
const AllDashboardDataShowController=require("../../controllers/Security/AllDashboardDataShow.controller");
const { ValidationMiddlewareQuery } = require('../../middlewares/ValidationMiddleware');
const { DomainValidationSchema } = require('../../helpers/Validators');
const GetFileCOntentMiddleware = require('../../middlewares/GetFileCOntentMiddleware');
router.get("/",ValidationMiddlewareQuery(DomainValidationSchema),GetFileCOntentMiddleware,AllDashboardDataShowController)
module.exports=router