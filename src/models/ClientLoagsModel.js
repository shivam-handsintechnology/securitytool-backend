const mongoose = require('mongoose')
const ClientLoagsModelSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  hostname: { type: String, unique: true },
  LogsData: { type: Object },
  auditReport: { type: Object },
  webSessionVulnurability: { type: Object },
});
const ClientLoagsModel = mongoose.model(
  "ClientLoagsModel",
  ClientLoagsModelSchema
)
module.exports = {
  ClientLoagsModel
};
