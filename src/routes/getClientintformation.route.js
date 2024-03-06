// Import required modules
const router = require("express").Router();
const Vulnurabilitycontroller = require('../controllers/vulnurubilitifounder/vulnurability.controller')
const getMiddlewareController = require('../controllers/middlwaresController').getMiddlewareControllerForClient
const verifyToken = require('../middlewares/VerifyUser')
// console.log('Vulnurabilitycontroller', Vulnurabilitycontroller)
router.get("/httpparameterpollution", verifyToken, Vulnurabilitycontroller.httpparameterpollution);
router.get("/sslverify", Vulnurabilitycontroller.sslverify);
router.post("/alloweddomains", Vulnurabilitycontroller.alloweddomains);

router.post("/createuserdetails", Vulnurabilitycontroller.createuserdetails);
router.post("/responsecodeavailableornot", Vulnurabilitycontroller.responsecodeavailableornot);
router.post("/emailverify", Vulnurabilitycontroller.emailverify);
router.get("/passwordkeys", Vulnurabilitycontroller.passwordkeys);
router.post("/sensitivekeysandPasswordValidate", Vulnurabilitycontroller.sensitivekeysandPasswordValidate);
router.post("/sensitivekeysinurl", Vulnurabilitycontroller.sensitivekeysinurl);
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
router.get('/plaincredential', verifyToken, Vulnurabilitycontroller.plaincredential)
router.get("/accesscontrollalloworigin", verifyToken, Vulnurabilitycontroller.accesscontrollalloworigin);
router.get('/securityheaders', Vulnurabilitycontroller.securityheaders)
router.get('/nodeversion', verifyToken, Vulnurabilitycontroller.nodeversion)
router.post('/scanpackagejson', Vulnurabilitycontroller.scanpackagejson)
router.get('/middlewares', getMiddlewareController)
module.exports = router;
