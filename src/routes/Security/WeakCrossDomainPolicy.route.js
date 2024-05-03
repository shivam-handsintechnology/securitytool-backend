const router= require('express').Router();
const WeakCrossDomainPolicy=require('../../controllers/Security/WeakCrossDomainPolicy.controller');

// Is "Origin" header in client request validated at the server?
router.get("/OriginHeaderValidation",WeakCrossDomainPolicy.isOriginHeaderValidated);
// Is "Access-Control-Allow-Origin" header in server response is set securely?
router.get("/AccessControlAllowOriginHeaderSecure",WeakCrossDomainPolicy.isAccessControlAllowOriginHeaderSecure);
module.exports=router;
