const mongoose = require("mongoose");
const { Schema } = mongoose;
const psec_logs = new Schema({
  ip: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  page: {
    type: String
  },
  query: {
    type: Object
  },
  inputQuery: {
    type: Object
  },

  type: {
    type: String
  },
  oldsessionid: {
    type: Object
  },
  SessiontimeHoghornot: {
    type: String
  },
  oldidmatched: {
    type: String
  },
  browser: {
    type: String
  },
  browser_code: {
    type: String
  },
  os: {
    type: String
  },
  country: {
    type: String
  },
  region: {
    type: String
  },
  city: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  useragent: {
    type: String
  },
  isp: {
    type: String
  },
  device: {
    type: String
  },
  domain: {
    type: String
  },
  referurl: {
    type: String
  },
  localip: {
    type: String
  },
  count: {
    type: Number
  },

}, {
  timestamps: true,
  versionKey: false,
  id: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id,
        delete ret.Date
      delete ret._id
    }
  }

})
const Project_Security_Logs = mongoose.model("psec_logs", psec_logs);
module.exports = { Project_Security_Logs }