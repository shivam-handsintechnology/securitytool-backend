const express = require('express');
const router = express.Router();
const IpRoutes=require('./Ip.routes')
const Middlewareroutes=require('./middleware.routes')
const AllLogs=require('./Logs/AllLogs')
const IndexRouter=require('./sys_ssl')
const TestRouter=require('./test')
router.use(AllLogs)
router.use("/middlwares",Middlewareroutes)
router.use("/",IndexRouter)
router.use("/ip",IpRoutes)
router.use("/test",TestRouter)
module.exports=router