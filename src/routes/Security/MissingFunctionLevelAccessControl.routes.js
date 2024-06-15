const rooter = require('express').Router();
const { ValidationMiddleware, AuthWebDomainMiddleware } = require("../../middlewares/ValidationMiddleware");
const { DomainValidationSchema } = require("../../helpers/Validators");
const { Managementinterface, passWordChangeAttack } = require('../../controllers/Security/MissingFunctionLevelAccessControl.controller')
rooter.get('/Managementinterface', ValidationMiddleware(DomainValidationSchema), AuthWebDomainMiddleware, Managementinterface)
rooter.get('/passWordChangeAttack', ValidationMiddleware(DomainValidationSchema), AuthWebDomainMiddleware, passWordChangeAttack)
module.exports = rooter