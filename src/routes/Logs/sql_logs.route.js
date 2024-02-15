var express = require('express');
const Sqllogs = require('../../controllers/Sqllogs.controller');
var router = express.Router();
/* GET Sql Logs. */
router.get('/', Sqllogs.getAllSqllLogs);
router.post('/single', Sqllogs.getSingleSqllLogs);
router.post('/deleteall', Sqllogs.deleteAllSqllLogs);
router.post('/deletesingle', Sqllogs.deleteSingleSqllLogs);
router.get('/count', Sqllogs.getSingleSqllLogsCount);
module.exports = router;