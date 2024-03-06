var express = require('express');
var router = express.Router();
const { UserController } = require('../controllers/UserController');
const verifyToken = require('../middlewares/VerifyUser');
router.post('/register', UserController.Register)
router.post('/login', UserController.Login)
router.post('/Oauth', UserController.GoogleRegister)
router.get('/profile', verifyToken, UserController.Profile)
router.post('/facebook', UserController.FBCustomerLogin)
router.post('/logout', UserController.Logout)
router.get('/setup', UserController.SetUp)

module.exports = router