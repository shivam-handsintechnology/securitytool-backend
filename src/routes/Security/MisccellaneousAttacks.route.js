const router = require('express').Router();
const MiscellaneousAttacksController = require('../../controllers/Security/MiscellaneousAttacks.controller');
router.get("/", MiscellaneousAttacksController.handleSpecialCharacters)
module.exports = router;