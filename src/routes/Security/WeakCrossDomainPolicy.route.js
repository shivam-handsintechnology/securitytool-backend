const router= require('express').Router();
const WeakCrossDomainPolicy=require('../../controllers/Security/WeakCrossDomainPolicy.controller');

// Is "Origin" header in client request validated at the server?
router.get("/is-origin-header-validated",WeakCrossDomainPolicy.isOriginHeaderValidated);
module.exports=router;
