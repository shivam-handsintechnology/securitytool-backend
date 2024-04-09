const router = require('express').Router();
const InsecureObjectRefGuard = require('../../controllers/Security/InsecureObjectRefGuard.controoler');
router.get('/DirectoryListingEnable', InsecureObjectRefGuard.DirectoryListingEnable);
module.exports = router;