const router = require('express').Router();
const Insecure_Direct_Object_ReferencesController = require('../../controllers/insecure_direct_object_references.controller');
router.get('/directory_listing_is_enabled_on_the_server', Insecure_Direct_Object_ReferencesController.directory_listing_is_enabled_on_the_server);
module.exports = router;