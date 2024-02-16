// server report
const mongoose = require('mongoose')
const SiteReportSchema = mongoose.Schema(
  {
    hostname: { type: String, required: true, unique: true },
    data: { type: Array },
  },
  { versionKey: false }
);
const ServerReportSchema = mongoose.Schema(
  {
    hostname: { type: String, unique: true },
    information: { type: Object },
  },
  { timestamps: false, versionKey: false }
);
const SiteReportModel = mongoose.model("SiteReportModel", SiteReportSchema)
module.exports = {
  SiteReportModel,
}