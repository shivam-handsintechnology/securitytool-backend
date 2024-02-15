var express = require('express');
const middlwareController = require('../controllers/middlwaresController');

const Sqllogs = require('../controllers/middlwaresController');
const verifyToken = require('../middlewares/VerifyUser');
var router = express.Router();
/* GET Sql Logs. */
router.get('/', middlwareController.getMiddlewareController);
router.post('/switch', middlwareController.findAndUpdateMiddlewareController);
module.exports = router;