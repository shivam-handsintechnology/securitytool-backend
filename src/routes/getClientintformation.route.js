// Import required modules
const router = require("express").Router();
const Vulnurabilitycontroller = require('../controllers/vulnurubilitifounder/vulnurability.controller');
const DomainController = require('../controllers/DomainController');
const Validators = require("../helpers/Validators");
const verifyToken = require('../middlewares/VerifyUser')
const { ValidationMiddlewareQuery,AuthDomainMiddlewarePackage } = require("../middlewares/ValidationMiddleware");
const getMiddlewareController = require('../controllers/middlwaresController').getMiddlewareControllerForClient
// Insecure Direct Object References (3. HTTP parameter pollution)
router.get("/httpparameterpollution", verifyToken,
//  ValidationMiddlewareQuery(Validators.DomainValidationSchema), 
 Vulnurabilitycontroller.httpparameterpollution);
//  SSL Information 
router.get("/sslverify",
verifyToken,
//  ValidationMiddlewareQuery(Validators.DomainValidationSchema), 
 Vulnurabilitycontroller.sslverify);
router.get('/plaincredential', verifyToken, Vulnurabilitycontroller.plaincredential)
// Allowed Domains
router.post("/alloweddomains",DomainController.addDomainToMiddlware);
// Inections Data Create
router.post("/createuserdetails", Vulnurabilitycontroller.createuserdetails);
// Error Message (Server returns HTTP 403 error message,Server returns HTTP error message,Helpful error message displayed at login page)
router.post("/error-messages", Vulnurabilitycontroller.errorMessages);
router.post("/emailverify",AuthDomainMiddlewarePackage, Vulnurabilitycontroller.emailverify);
router.get("/passwordkeys", Vulnurabilitycontroller.passwordkeys);
// Sensitive information revealed in HTTP response
router.post("/sensitive-information-check",AuthDomainMiddlewarePackage, Vulnurabilitycontroller.sensitiveInformationCheck);
// Critical information in URL
router.post("/sensitivekeysinurl",AuthDomainMiddlewarePackage, Vulnurabilitycontroller.sensitivekeysinurl);
// router.post("/scanhardcodedata", Vulnurabilitycontroller.scanhardcodedata);
// router.post("/scanpasswordhashing", Vulnurabilitycontroller.scanpasswordhashing);
// router.post("/optionmethodvulnerability", Vulnurabilitycontroller.optionmethodvulnerability);
// router.post("/dangerousemethodvulnerability", Vulnurabilitycontroller.dangerousemethodvulnerability);
// router.post("/defaultwebpagevulnerability", Vulnurabilitycontroller.defaultwebpagevulnerability);
// router.post("/nodeconfiguration", Vulnurabilitycontroller.nodeconfiguration);

// router.post("/xssvulnerability", Vulnurabilitycontroller.xssvulnerability);
// router.post("/redirectvulnerability", Vulnurabilitycontroller.redirectvulnerability);
// router.post("/sessionvulnerability", Vulnurabilitycontroller.sessionvulnerability);
// router.post("/sqlvulnerability", Vulnurabilitycontroller.sqlvulnerability);
router.post("/logsdata", Vulnurabilitycontroller.addlogsdata);
router.get("/logsdata", Vulnurabilitycontroller.logsdata);
router.post('/sessionstoragedata', Vulnurabilitycontroller.sessionstoragedata)
router.get('/directory_listing_is_enabled_on_the_server', verifyToken, Vulnurabilitycontroller.directory_listing_is_enabled_on_the_server)
// router.get('/default_web_page', verifyToken, Vulnurabilitycontroller.default_web_page)

router.get("/accesscontrollalloworigin", verifyToken, Vulnurabilitycontroller.accesscontrollalloworigin);
router.get('/securityheaders', Vulnurabilitycontroller.securityheaders)
router.get('/nodeversion', verifyToken, Vulnurabilitycontroller.nodeversion)
router.post('/scanpackagejson', Vulnurabilitycontroller.scanpackagejson)
router.get('/middlewares', getMiddlewareController)
module.exports = router;
