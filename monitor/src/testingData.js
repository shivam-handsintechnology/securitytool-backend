
const axios = require("axios")
const fs = require("fs");
const { consoleColorText, scanDirectory } = require("./helpers/httpparameterpollution");
const { getEndpoints } = require("./helpers/getEndpoint");
const { baseUrl } = require("./config");
const routes=require("./routes")
module.exports =
  (hostname, appid) => {
   return (req,res,next)=>{
    req.appid=appid
    req.audithostname=hostname
    req.app.use(routes)
    next()
   }
   
  };

