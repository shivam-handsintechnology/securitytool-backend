const mongoose=require('mongoose')
const PasswordValidateSchema = mongoose.Schema({
  domain: { type: String, unique: true },
  HashedPassword: { type: Boolean, default: null },
  appid: { type: String, default: null },
  password: { type: String, default: null },
  algorithm: { type: String, default: null },
  // user: { type: mongoose.Types.ObjectId,ref:'User' },
});
const PasswordValidateModel= mongoose.model(
  "PasswordValidateModel",
  PasswordValidateSchema
)
module.exports = {
  PasswordValidateModel
};
