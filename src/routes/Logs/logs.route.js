var express = require('express');
var router = express.Router();
const AllLogsController=require('../../controllers/AllLogs.controller')

router.get('/', AllLogsController.getAllBotLogs);
router.post('/single', AllLogsController.getSingleBotLogs);
router.post('/deleteall', AllLogsController.deleteAllBotLogs);
router.post('/deletesingle', AllLogsController.deleteSingleBotLogs);
router.get('/count', AllLogsController.getSingleBotLogsCount);
module.exports = router;