const rooter = require('express').Router();
const { ValidationMiddleware, AuthDomainMiddleware } = require("../../middlewares/ValidationMiddleware");
const { DomainValidationSchema } = require("../../helpers/Validators");
const { Managementinterface, passWordChangeAttack } = require('../../controllers/Security/MissingFunctionLevelAccessControl.controller')
rooter.get('/Managementinterface', ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware, Managementinterface)
rooter.get('/passWordChangeAttack', ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware, passWordChangeAttack)
module.exports = rooter