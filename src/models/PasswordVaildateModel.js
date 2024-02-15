const mongoose=require('mongoose')
const PasswordValidateSchema = mongoose.Schema({
  hostname: { type: String, unique: true },
  HashedPassword: { type: Boolean, default: null },
});
const PasswordValidateModel= mongoose.model(
  "PasswordValidateModel",
  PasswordValidateSchema
)
module.exports = {
  PasswordValidateModel
};
