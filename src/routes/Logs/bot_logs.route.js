var express = require('express');
var router = express.Router();
const BotLogsController=require('../../controllers/Botogs.controller')

router.get('/', BotLogsController.getAllBotLogs);
router.post('/single', BotLogsController.getSingleBotLogs);
router.post('/deleteall', BotLogsController.deleteAllBotLogs);
router.post('/deletesingle', BotLogsController.deleteSingleBotLogs);
router.get('/count', BotLogsController.getSingleBotLogsCount);
module.exports = router;