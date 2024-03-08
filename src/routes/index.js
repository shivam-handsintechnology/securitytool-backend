
const express = require('express');
const router = express.Router();
const Security = require('./security')
const verifytoken = require('../middlewares/VerifyUser')
const GetClientInformation = require('./getClientintformation.route')
const Authrouter = require('./UserRoutes')
router.use("/api/security", verifytoken, Security)
router.use("/api/client", GetClientInformation)
router.use("/api/auth", Authrouter)
router.get('/', (req, res) => {

    res.send("Welcome to the application")
})
module.exports = router