// Import required modules
const router = require("express").Router();
const Vulnurabilitycontroller = require('../controllers/Security/vulnurability.controller');
const { AuthDomainMiddlewarePackage } = require("../middlewares/ValidationMiddleware");
const JsSnippetController = require("../controllers/JsSnippetController");

// @api protected
router.route("/protection").get(AuthDomainMiddlewarePackage, JsSnippetController.JsSnippet).post(AuthDomainMiddlewarePackage, JsSnippetController.getALlDataFromSnippet);
// Inections Data Create Get from Nodemonitor Package
router.post("/createuserdetails", AuthDomainMiddlewarePackage, Vulnurabilitycontroller.createuserdetails);
router.post("/createuserdetailsfromclient", AuthDomainMiddlewarePackage, Vulnurabilitycontroller.createuserdetailsfromclient);
// Error Message  Get from Nodemonitor Package
// Critical information in URL Get from Nodemonitor Package
router.post("/sensitivekeysinurl", AuthDomainMiddlewarePackage, Vulnurabilitycontroller.sensitivekeysinurl);
router.get("/authentication", AuthDomainMiddlewarePackage, Vulnurabilitycontroller.AuthValidation);
router.get("/vpnvalidation", Vulnurabilitycontroller.VpnValidation);
module.exports = router;
