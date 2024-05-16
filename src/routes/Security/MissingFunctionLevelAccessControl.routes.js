const rooter=require('express').Router();
const { ValidationMiddleware } = require("../../middlewares/ValidationMiddleware");
const { DomainValidationSchema } = require("../../helpers/Validators");
const {Managementinterface}=require('../../controllers/Security/MissingFunctionLevelAccessControl.controller')
rooter.get('/Managementinterface',ValidationMiddleware(DomainValidationSchema),Managementinterface)
module.exports=rooter