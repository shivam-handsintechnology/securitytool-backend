const { GetSSl } = require('../../controllers/Security/SSL.controller');
const router = require('express').Router();
router.get('/', GetSSl)
module.exports = router;
