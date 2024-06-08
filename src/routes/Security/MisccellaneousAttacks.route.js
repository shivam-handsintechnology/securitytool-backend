const router = require('express').Router();
let { MiscellaneousAttackValidation } = require('../../helpers/Validators')

const MiscellaneousAttacksController = require('../../controllers/Security/MiscellaneousAttacks.controller');
const { ValidationMiddleware } = require('../../middlewares/ValidationMiddleware');
router.get("/", ValidationMiddleware(MiscellaneousAttackValidation), MiscellaneousAttacksController.handleSpecialCharacters)
router.get("/lockoutfeature", ValidationMiddleware(MiscellaneousAttackValidation), MiscellaneousAttacksController.handleAccountLockout)
router.get("/SqlWildcards", MiscellaneousAttacksController.SqlWildcards)
module.exports = router;