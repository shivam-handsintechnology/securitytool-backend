const router = require("express").Router();
const SEoCOntroller = require("../controllers/SEO.controller");
const { SeoValidation, SeoValidationUrl } = require("../helpers/Validators");
const { ValidationMiddleware } = require("../middlewares/ValidationMiddleware");
router.route("/").get(ValidationMiddleware(SeoValidationUrl), SEoCOntroller.getSEOByUrl).delete(ValidationMiddleware(SeoValidationUrl), SEoCOntroller.deleteSEO).put(ValidationMiddleware(SeoValidation), SEoCOntroller.updateSEO).post(ValidationMiddleware(SeoValidation), SEoCOntroller.createSEO)

module.exports = router