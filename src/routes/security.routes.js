const express = require('express');
const router = express.Router();
const middlwareController = require('../controllers/middlwaresController')
const IpController = require('../controllers/IP.controller')
const DomainController = require('../controllers/DomainController');
const { ValidationMiddleware } = require('../middlewares/ValidationMiddleware');
const { DomainValidationSchema } = require('../helpers/Validators');
// middlewares
router.route('/middlwares').get(ValidationMiddleware(DomainValidationSchema), middlwareController.getMiddlewareController).post(ValidationMiddleware(DomainValidationSchema), middlwareController.findAndUpdateMiddlewareController);
// Start Ips
router.route('/ip').post(IpController.addIP).get(IpController.getAllIPs).delete(IpController.deleteIP);
router.route("/blacklist").post(IpController.AddBlackListIp).get(IpController.BlackList).delete(IpController.DeleteBlackListip);
// End Ips
// Domains
router.route('/domain').post(DomainController.addDomain).get(DomainController.getAllDomains).delete(DomainController.deleteDomain).put(DomainController.updateDomain);
router.route('/webdomain').get(DomainController.getAllWebDomains).post(DomainController.addWebDomain).delete(DomainController.deleteWebDomain);
// End Domains
// Whitelist words


module.exports = router