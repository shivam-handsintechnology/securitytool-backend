const mongoose=require('mongoose')
const ClientLoagsModelSchema = mongoose.Schema({
  hostname: { type: String, unique: true },
  LogsData: { type: Array },
});
const ClientLoagsModel= mongoose.model(
  "ClientLoagsModel",
  ClientLoagsModelSchema
)
module.exports = {
  ClientLoagsModel
};
