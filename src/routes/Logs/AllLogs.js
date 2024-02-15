
var express = require('express');
var router = express.Router();
const Allogs=require('./logs.route')
const Sqllogs=require('./sql_logs.route')
const Proxylogs=require('./proxy_logs.route')
const Botlogs=require('./bot_logs.route')
const Spamlogs=require('./spam_logs.route')
router.use("/logs",Allogs)
router.use("/sqllogs",Sqllogs)
router.use("/proxylogs",Proxylogs)
router.use("/botlogs",Botlogs)
router.use("/spamlogs",Spamlogs)
module.exports=router