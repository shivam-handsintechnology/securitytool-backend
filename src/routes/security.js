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
// End Middlewaresnpm run dev
router.use("/", IndexRouter)
// Start Ips
router.route('/ip').post(IpController.addIP).get(IpController.getAllIPs).delete(IpController.deleteIP);
router.route("/blacklist").post(IpController.AddBlackListIp).get(IpController.BlackList).delete(IpController.DeleteBlackListip);
// End Ips
// Domains
router.route('/domain').post(DomainController.addDomain).get(DomainController.getAllDomains).delete(DomainController.deleteDomain).put(DomainController.updateDomain);


router.use("/test", TestRouter)
module.exports = router