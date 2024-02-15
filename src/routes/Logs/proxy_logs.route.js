var express = require('express');
const Proxylogs = require('../../controllers/Proxyogs.controller');
var router = express.Router();
/* GET Proxy Logs. */
router.get('/', Proxylogs.getAllProxylLogs);
router.post('/single', Proxylogs.getSingleProxylLogs);
router.post('/deleteall', Proxylogs.deleteAllProxylLogs);
router.post('/deletesingle', Proxylogs.deleteSingleProxylLogs);
router.get('/count', Proxylogs.getSingleProxylLogsCount);
module.exports = router;