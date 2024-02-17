const express = require('express');
const router = express.Router();
const Sqllogs = require('../controllers/Sqllogs.controller')
const middlwareController = require('../controllers/middlwaresController')
const IpController = require('../controllers/IP.controller')
const DomainController = require('../controllers/DomainController')
const IndexRouter = require('./sys_ssl')
const TestRouter = require('./test')
// Logs
router.get('/sqllogs/', Sqllogs.getAllSqllLogs);
router.post('/sqllogs/single', Sqllogs.getSingleSqllLogs);
router.post('/sqllogs/deleteall', Sqllogs.deleteAllSqllLogs);
router.post('/sqllogs/deletesingle', Sqllogs.deleteSingleSqllLogs);
router.get('/sqllogs/count', Sqllogs.getSingleSqllLogsCount);
// End Logs
// middlewares
router.get('/middlwares', middlwareController.getMiddlewareController);
router.post('/middlwares/switch', middlwareController.findAndUpdateMiddlewareController);
// End Middlewares
router.use("/", IndexRouter)
// Start Ips
router.post('/ip/add', IpController.addIP);
router.get('/ip/all', IpController.getAllIPs)
router.delete('/ip', IpController.DeleteBlackListip)
router.post('/ip/blacklist/add', IpController.AddBlackListIp);
router.get('/ip/blacklist/all', IpController.BlackList)
router.delete('/ip/blacklist', IpController.DeleteBlackListip)
// End Ips
// Domains
router.route('/domain').post(DomainController.addDomain).get(DomainController.getAllDomains).delete(DomainController.deleteDomain).put(DomainController.updateDomain);


router.use("/test", TestRouter)
module.exports = router