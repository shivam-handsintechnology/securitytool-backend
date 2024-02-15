
const express = require('express');
const router = express.Router();
const Security=require('./security')
const verifytoken=require('../middlewares/VerifyUser')
const GetClientInformation=require('./getClientintformation.route')
router.use("/api/security",verifytoken,Security)
router.use("/api/client",GetClientInformation)
module.exports=router