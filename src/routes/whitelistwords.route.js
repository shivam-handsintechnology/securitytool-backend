const router = require('express').Router();
const WhitelistWords = require("../controllers/WhitelistWords.controller");
router.route("/").post(WhitelistWords.addWord).get(WhitelistWords.getAllWords).delete(WhitelistWords.deleteWord);
router.post("/add-multiple-words", WhitelistWords.addMUltipleWords);
module.exports = router;