const router = require('express').Router();
const InsecureObjectRefGuard = require('../../controllers/Security/InsecureObjectRefGuard.controoler');
const { DomainValidationSchema } = require('../../helpers/Validators');
const GetFileCOntentMiddleware = require('../../middlewares/GetFileCOntentMiddleware');
const { ValidationMiddlewareQuery } = require('../../middlewares/ValidationMiddleware');

router.get('/DirectoryListingEnable',ValidationMiddlewareQuery(DomainValidationSchema), InsecureObjectRefGuard.DirectoryListingEnable);
router.get('/httpparameterpollution',ValidationMiddlewareQuery(DomainValidationSchema), InsecureObjectRefGuard.httpparameterpollution);
router.get('/robottxt',ValidationMiddlewareQuery(DomainValidationSchema),GetFileCOntentMiddleware, InsecureObjectRefGuard.robotsTxtPath);
module.exports = router;