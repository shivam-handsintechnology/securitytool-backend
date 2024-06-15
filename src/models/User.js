const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DEV_API_URL, PROD_API_URL, NODE_ENV } = process.env
const defaultProfilePic = `${NODE_ENV === 'development' ? DEV_API_URL : PROD_API_URL}/static/avatar.jpg`
const UserSchema = new Schema({
  // domain: { type: Array, unique: true, trim: true, default: [] },
  email: { type: String, unique: true, trim: true },
  password: { type: String, trim: true },
  appid: { type: String, unique: true },
  name: { type: String, trim: true },
  subsription: { type: mongoose.Types.ObjectId, ref: 'Subscription' },
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
  otpisvalid: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    default: null
  },
  expiresAt: {
    type: Date,
    default: null,
    index: { expires: '5m' }  // TTL index that will trigger deletion
  },
  profilepic: { type: String, default: defaultProfilePic },


}, {
  timestamps: true,
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

UserSchema.pre("save", async function (next) {
  //  create default subsription model

  if (!this.otpisvalid) {
    // Set expiresAt to  5 minute from now
    this.expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  } else {
    // If otpisvalid is true, do not set expiresAt
    this.expiresAt = null;

  }
  // create subscription



  next();
});
module.exports = mongoose.model("users", UserSchema);