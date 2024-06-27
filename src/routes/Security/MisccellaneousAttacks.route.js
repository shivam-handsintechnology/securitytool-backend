const router = require('express').Router();
let { MiscellaneousAttackValidation } = require('../../helpers/Validators')

const MiscellaneousAttacksController = require('../../controllers/Security/MiscellaneousAttacks.controller');
const { ValidationMiddleware, AuthDomainMiddleware } = require('../../middlewares/ValidationMiddleware');
router.get("/", AuthDomainMiddleware, MiscellaneousAttacksController.handleSpecialCharacters)
router.get("/lockoutfeature", AuthDomainMiddleware, ValidationMiddleware(MiscellaneousAttackValidation), MiscellaneousAttacksController.handleAccountLockout)
router.get("/SqlWildcards", AuthDomainMiddleware, MiscellaneousAttacksController.SqlWildcards)
module.exports = router;