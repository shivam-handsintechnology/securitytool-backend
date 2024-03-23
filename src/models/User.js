const mongoose = require("mongoose");
const { Schema } = mongoose;
const CryptoJS = require("crypto-js")
const { Project_Security_Logs } = require("./Project_Security_Logs");
const { AllowedDomainsModel } = require("./AllowedDomainsModel");
const secretkey = process.env.SECREY_KEY
const UserSchema = new Schema({
  // domain: { type: Array, unique: true, trim: true, default: [] },
  email: { type: String, unique: true, trim: true },
  password: { type: String, trim: true },
  appid: { type: String, unique: true },
  // online:{type:Boolean,default:null},
  userType: {
    type: String, enum: ['Admin', 'User'], default: 'User'
  },

}, {
  timestamps: true,
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})
UserSchema.virtual('id').get(function () {
  const idString = this._id.toString();
  return CryptoJS.AES.encrypt(idString, secretkey).toString();
});


UserSchema.pre("save", async function (next) {
  if (this.isNew) {
    await Project_Security_Logs.create({ user: this._id, })
    next()
  }
});
module.exports = mongoose.model("users", UserSchema);