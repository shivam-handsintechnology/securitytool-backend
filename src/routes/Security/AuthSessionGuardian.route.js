
const router = require("express").Router()


const AuthSessionGurdiancontroller = require('../../controllers/Security/AuthSession.controlller')

router.get("/session-vulnurability", AuthSessionGurdiancontroller.SessionVulnurbilityCOntroller);

// Route for checking session hijacking vulnerability
router.get("/non-html-content-accessability", AuthSessionGurdiancontroller.NOnHtmlContentAccebiltyController);

router.get("/SecondFactorAuth", AuthSessionGurdiancontroller.SecondFactorAuthBypassedController);

router.get("/blankpasswordandusername", AuthSessionGurdiancontroller.BlackPasswordValidationController
);

// 

module.exports = router