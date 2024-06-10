const rooter = require('express').Router();
const { ValidationMiddleware } = require("../../middlewares/ValidationMiddleware");
const { DomainValidationSchema } = require("../../helpers/Validators");
const { Managementinterface, passWordChangeAttack } = require('../../controllers/Security/MissingFunctionLevelAccessControl.controller')
rooter.get('/Managementinterface', ValidationMiddleware(DomainValidationSchema), Managementinterface)
rooter.get('/passWordChangeAttack', ValidationMiddleware(DomainValidationSchema), passWordChangeAttack)
module.exports = rooter