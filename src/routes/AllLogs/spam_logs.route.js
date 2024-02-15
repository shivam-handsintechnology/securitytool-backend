var express = require('express');
const BotLogsController=require('../../controllers/Botogs.controller')

var router = express.Router();
/* GET Spam Logs. */
router.get('/', BotLogsController.getAllspamLogs);
router.post('/single', BotLogsController.getSingleSpamLogs);
router.post('/deleteall', BotLogsController.deleteAllSpamLogs);
router.post('/deletesingle', BotLogsController.deleteSingleSpamBotLogs);
router.get('/count', BotLogsController.getSingleSpamLogsCount);
module.exports = router;