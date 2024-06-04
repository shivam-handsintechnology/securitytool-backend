const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DEV_API_URL, PROD_API_URL, NODE_ENV } = process.env
const defaultProfilePic = `${NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL}/static/avatar.jpg`
const UserSchema = new Schema({
  // domain: { type: Array, unique: true, trim: true, default: [] },
  email: { type: String, unique: true, trim: true },
  password: { type: String, trim: true },
  appid: { type: String, unique: true },
  // online:{type:Boolean,default:null},
  userType: {
    type: String, enum: ['Admin', 'User'], default: 'User'
  },
  apistatus: {
    type: Boolean, default: false
  },
  webstatus: {
    type: Boolean, default: false
  },
  profilepic: { type: String, default: null },


}, {
  timestamps: true,
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})
UserSchema.virtual('id').get(function () {

});

module.exports = mongoose.model("users", UserSchema);