
const express = require('express');
const router = express.Router();
const path = require("path")
const fs = require("fs")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const AuditMiddleware = require('../middlewares/AuditMiddleware');
// Import Middlewares  And Functions
let ChangeHtml = `<title>Security Tool</title>`
const { ValidationMiddleware, AuthDomainMiddleware } = require('../middlewares/ValidationMiddleware');
const verifytoken = require('../middlewares/VerifyUser')
const verifyToken = require('../middlewares/VerifyUser');
const GetFileCOntentMiddleware = require('../middlewares/GetFileCOntentMiddleware');
const CorsMiddleware = require('../middlewares/CorsMiddleware').cors;
const allowall = require('../middlewares/CorsMiddleware').allowall
const IncomingDataHashFormat = require('../middlewares/IncomingDataHashFormat')
const { DomainValidationSchema } = require('../helpers/Validators');
const Security = require('./security.routes')
const GetClientInformation = require('./monitor.routes')
const SecurityMisconfiguration = require("./Security/SecurityMisconfiguration.route")
const SensitiveDataExposure = require("./Security/SensitiveDataExposure.route")
const SensitiveDataLocalStorage = require("../controllers/Security/SensitiveDataStoredInLocalStorage.controller")
const AuthSessionGuardian = require("./Security/AuthSessionGuardian.route")
const InsecureObjectRefGuard = require("./Security/Insecure_Direct_Object_References.route")
const InjectionsRoute = require("./Security/Injection.routes")
const WeekCrossDomainPolicy = require("./Security/WeakCrossDomainPolicy.route")
const Authrouter = require('./user.routes');
const MissingFunctionalLevelAccessControlrouter = require("./Security/MissingFunctionLevelAccessControl.routes")
const VideoStreamRouter = require("./VideoStream.route")
const SSlRouter = require("./Security/SSL.routes")
const MiscellaneousAttacksRoute = require("./Security/MisccellaneousAttacks.route")
const ErrorMessagesRoute = require("./Security/ErrorMessage.route")
const subsriptionrouter = require("./Security/subsription.routes")
const UnvalidatedRedirectsandForwardsRouter = require("../controllers/Security/UnvalidatedRedirectsandForwards.controller").get
const CrossSiteScriptingRouer = require("./Security/CrossSiteScripting")
const SEORoutes = require("./seo.routes");
const SEO = require('../models/SEO.Model');
// Import Routes
router.use("/security", CorsMiddleware, IncomingDataHashFormat, verifytoken, Security)
router.use("/seo", CorsMiddleware, IncomingDataHashFormat, verifytoken, SEORoutes)
// Get Client Information
router.use("/client", allowall, GetClientInformation)
// Auth
router.use("/auth", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, Authrouter)
// subsription
router.use("/subsription", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, subsriptionrouter)
// Broken Authentication and Session Management
router.use("/AuthSessionGuardian", CorsMiddleware, IncomingDataHashFormat, verifyToken,
  ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware,
  AuthSessionGuardian
)
// Injections
// router.use("/injections",CorsMiddleware,AuditMiddleware, IncomingDataHashFormat, verifyToken, AuthDomainMiddleware, InjectionsRoute)
router.use("/injections", AuthDomainMiddleware, CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, InjectionsRoute)
// SSL Verify
router.use("/SSLVerify", AuthDomainMiddleware, CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, verifyToken,
  ValidationMiddleware(DomainValidationSchema), SSlRouter)
// Error Message
router.use("/ErrorMessage", AuthDomainMiddleware, CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, ErrorMessagesRoute)
// Insecure Direct Object References
router.use("/InsecureObjectRefGuard", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, InsecureObjectRefGuard)
// SecurityMisconfigurationuu
router.use("/SecurityMisconfiguration", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, SecurityMisconfiguration)
// Missing Function Level Access Control
router.use("/MissingFunctionLevelAccessControl", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, verifyToken, MissingFunctionalLevelAccessControlrouter)
// SensitiveDataExposure
router.use("/SensitiveDataExposure", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, SensitiveDataExposure)
// Unvalidated Redirects and Forwards
router.use("/UnvalidatedRedirects", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, verifyToken, AuthDomainMiddleware,
  ValidationMiddleware(DomainValidationSchema), GetFileCOntentMiddleware, UnvalidatedRedirectsandForwardsRouter)
// Cross-Site Scripting (XSS)
router.use("/CrossSiteScripting", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, verifyToken, AuthDomainMiddleware, CrossSiteScriptingRouer)
// Sensitive data is Store in Local Storage
router.use("/SensitiveStorageLocalStorage", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, verifyToken, AuthDomainMiddleware, SensitiveDataLocalStorage.get)
// Week Cross Domain Policy
router.use("/WeakCrossDomainPolicy", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, verifyToken, ValidationMiddleware(DomainValidationSchema), AuthDomainMiddleware, WeekCrossDomainPolicy)
// MiscellaneousAttacks
router.use("/MiscellaneousAttacks", CorsMiddleware, AuditMiddleware, IncomingDataHashFormat, MiscellaneousAttacksRoute)
// vide streaming route
router.use("/videostream", IncomingDataHashFormat, VideoStreamRouter)
// Docs Api
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));
router.use("/api", router)

router.use("/*", async (req, res) => {
  try {
    const buildpath = path.join(__dirname, "../build", "index.html");
    if (!fs.existsSync(buildpath)) {
      return res.status(404).json({ message: "Resource is Not Found" });
    }

    const raw = fs.readFileSync(buildpath, 'utf8');
    let url = req.originalUrl === "/" ? "home" : req.originalUrl.replace(/\//g, "");
    console.log("url", req.originalUrl);

    // Mongoose aggregation
    const [seoData] = await SEO.aggregate([
      { $match: { url: url } },
      { $limit: 1 }
    ]);

    console.log(seoData ? "SEO data found" : "No SEO data found");

    // Default home page SEO

    let metaTags = `
        <title>Welcome to Our Website</title>
        <meta name="description" content="Explore our amazing content and services">
        <meta name="keywords" content="home, welcome, website">
      `;
    let updated = raw.replace(ChangeHtml, metaTags);
    if (!seoData || !seoData.meta_data || seoData.meta_data.length === 0) {
      // Default home page SEO
      metaTags = `
        <title>Welcome to Our Website</title>
        <meta name="description" content="Explore our amazing content and services">
        <meta name="keywords" content="home, welcome, website">
      `;
    } else {
      // Construct meta tags for all items in the meta_data array
      metaTags = seoData.meta_data.map(metaData => `
        <title>${metaData.title}</title>
        <meta name="description" content="${metaData.description}">
        <meta name="keywords" content="${metaData.keywords.join(', ')}">
      `).join('');
    }

    // Replace __PAGE_META__ with the constructed meta tags
    updated = raw.replace(ChangeHtml, metaTags);

    // Send the updated HTML
    return res.send(updated);

  } catch (error) {
    console.error('Error updating meta tags:', error);
    return res.status(500).json({ message: "Error updating meta tags" });
  }
})


module.exports = router