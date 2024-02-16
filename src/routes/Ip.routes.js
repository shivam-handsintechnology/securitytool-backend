var express = require('express');
const WhitelistModels = require('../models/WhitelistModel');
const BlacklistModel = require('../models/BlacklistModel');
const { sendResponse } = require('../utils/dataHandler');
var router = express.Router();


module.exports = router;