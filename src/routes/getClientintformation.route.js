// Import required modules
const router = require("express").Router();
const Vulnurabilitycontroller = require('../controllers/vulnurubilitifounder/vulnurability.controller');
const Validators = require("../helpers/Validators");
const verifyToken = require('../middlewares/VerifyUser')
const { ValidationMiddlewareQuery,AuthDomainMiddlewarePackage } = require("../middlewares/ValidationMiddleware");
const getMiddlewareController = require('../controllers/middlwaresController').getMiddlewareControllerForClient
// Insecure Direct Object References (3. HTTP parameter pollution)
router.get("/httpparameterpollution", verifyToken,
 ValidationMiddlewareQuery(Validators.DomainValidationSchema), 
 Vulnurabilitycontroller.httpparameterpollution);
//  SSL Information 
router.get("/sslverify",
verifyToken,
 ValidationMiddlewareQuery(Validators.DomainValidationSchema), 
 Vulnurabilitycontroller.sslverify);
// Inections Data Create
router.post("/createuserdetails",AuthDomainMiddlewarePackage, Vulnurabilitycontroller.createuserdetails);
// Error Message (Server returns HTTP 403 error message,Server returns HTTP error message,Helpful error message displayed at login page)
router.post("/error-messages",AuthDomainMiddlewarePackage, Vulnurabilitycontroller.errorMessages);
router.post("/emailverify",AuthDomainMiddlewarePackage, Vulnurabilitycontroller.emailverify);
// Critical information in URL
router.post("/sensitivekeysinurl",AuthDomainMiddlewarePackage, Vulnurabilitycontroller.sensitivekeysinurl);
router.post('/sessionstoragedata',Vulnurabilitycontroller.sessionstoragedata)
router.get("/accesscontrollalloworigin", verifyToken, Vulnurabilitycontroller.accesscontrollalloworigin);
router.get('/securityheaders', Vulnurabilitycontroller.securityheaders)
router.get('/middlewares', getMiddlewareController)
module.exports = router;
