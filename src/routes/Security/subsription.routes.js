const express = require('express');
const { getSubscriptionById } = require('../../controllers/SubsCriptionController');
const verifyToken = require('../../middlewares/VerifyUser');
const router = express.Router();

router.get("/:id", verifyToken, getSubscriptionById)
module.exports = router;