const router=require("express").Router()

const { GetAutitReport, errorHandler } = require("../helpers/functions");
const controllers=require("../controllers")
router.get("/sitescanner", (req, res) => {
    let query=req.query
    res.json(query)
  });
  router.get("/GetAutitReport",controllers.GetAutitReport )
  router.get("/DirectoryListingEnable",controllers.DirectoryListingEnable )
  router.get("/getEndpoints",controllers.getEndpoints )
  router.get("/passwords-insecure",controllers.passwordsInsecure )
  module.exports=router