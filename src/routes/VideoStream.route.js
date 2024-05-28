const router = require("express").Router();
const verifyToken = require('../middlewares/VerifyUser')
const VIdeoStreamController = require("../controllers/VIdeoStreamController");
router.get("/:filename", VIdeoStreamController.VideoStream)

module.exports = router