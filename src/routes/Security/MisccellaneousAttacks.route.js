const router = require('express').Router();
let { MiscellaneousAttackValidation } = require('../../helpers/Validators')

const MiscellaneousAttacksController = require('../../controllers/Security/MiscellaneousAttacks.controller');
const { ValidationMiddleware, AuthWebDomainMiddleware } = require('../../middlewares/ValidationMiddleware');
router.get("/", AuthWebDomainMiddleware, MiscellaneousAttacksController.handleSpecialCharacters)
router.get("/lockoutfeature", AuthWebDomainMiddleware, ValidationMiddleware(MiscellaneousAttackValidation), MiscellaneousAttacksController.handleAccountLockout)
router.get("/SqlWildcards", AuthWebDomainMiddleware, MiscellaneousAttacksController.SqlWildcards)
module.exports = router;