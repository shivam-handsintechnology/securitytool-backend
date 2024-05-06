const mongoose=require('mongoose')
const PasswordValidateSchema = mongoose.Schema({
  domain: { type: String, unique: true },
  HashedPassword: { type: Boolean, default: false },
  appid: { type: String,ref:"users" },
  password: { type: Boolean, default: false },
  // user: { type: mongoose.Types.ObjectId,ref:'User' },
});
const PasswordValidateModel= mongoose.model(
  "PasswordValidateModel",
  PasswordValidateSchema
)
module.exports = {
  PasswordValidateModel
};
