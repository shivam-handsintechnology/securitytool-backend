const router = require("express").Router();
const VIdeoStreamController = require("../controllers/VIdeoStreamController");
const verifytoken = require("../middlewares/VerifyUser");
router.route("/:filename").get(VIdeoStreamController.VideoStream).delete(verifytoken, VIdeoStreamController.DeleteVideo)

module.exports = router