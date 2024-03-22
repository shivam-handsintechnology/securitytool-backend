const router = require('express').Router();
const Insecure_Direct_Object_References = require('./Insecure_Direct_Object_References.route');
// Insecure Direct Object References
router.use('/insecure_direct_object_references', Insecure_Direct_Object_References)
module.exports = router;