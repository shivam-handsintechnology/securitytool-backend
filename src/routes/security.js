const express = require('express');
const router = express.Router();
const middlwareController = require('../controllers/middlwaresController')
const IpController = require('../controllers/IP.controller')
const DomainController = require('../controllers/DomainController')
// middlewares
router.get('/middlwares', middlwareController.getMiddlewareController);
router.post('/middlwares/switch', middlwareController.findAndUpdateMiddlewareController);
// Start Ips
router.route('/ip').post(IpController.addIP).get(IpController.getAllIPs).delete(IpController.deleteIP);
router.route("/blacklist").post(IpController.AddBlackListIp).get(IpController.BlackList).delete(IpController.DeleteBlackListip);
// End Ips
// Domains
router.route('/domain').post(DomainController.addDomain).get(DomainController.getAllDomains).delete(DomainController.deleteDomain).put(DomainController.updateDomain);
// Whitelist words


module.exports = router