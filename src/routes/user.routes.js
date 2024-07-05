var express = require('express');
var router = express.Router();
const { UserController } = require('../controllers/UserController');
const verifyToken = require('../middlewares/VerifyUser');
const { ValidationMiddleware } = require('../middlewares/ValidationMiddleware');
const { razorPayValidation, razorPaySuccessValidation } = require('../helpers/Validators');
router.post('/register', UserController.Register)
router.get('/users', UserController.getAllUsers)
router.post('/login', UserController.Login)
router.post('/Oauth', UserController.GoogleRegister)
router.get('/profile', verifyToken, UserController.Profile)
router.post('/facebook', UserController.FBCustomerLogin)
router.post('/logout', UserController.Logout)
router.post("/checkout", verifyToken, ValidationMiddleware(razorPayValidation), UserController.Checkout)
router.post("/checkout/verify", verifyToken, ValidationMiddleware(razorPaySuccessValidation), UserController.CheckoutSuccess)


module.exports = router