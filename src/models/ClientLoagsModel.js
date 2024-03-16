const mongoose = require('mongoose')
const ClientLoagsModelSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  hostname: { type: String, unique: true },
  LogsData: { type: Object },
  "auditReportVersion": Number,
  "vulnerabilities": {
    "package_name": {
      "name": String,
      "severity": String,
      "isDirect": Boolean,
      "via": [
        {
          "source": Number,
          "name": String,
          "dependency": String,
          "title": String,
          "url": String,
          "severity": String,
          "cwe": [String],
          "cvss": {
            "score": Number,
            "vectorString": String
          },
          "range": String
        }
      ],
      "effects": [String],
      "range": String,
      "nodes": [String],
      "fixAvailable": Boolean
    }
  },
  "metadata": {
    "vulnerabilities": {
      "info": Number,
      "low": Number,
      "moderate": Number,
      "high": Number,
      "critical": Number,
      "total": Number
    },
    "dependencies": {
      "prod": Number,
      "dev": Number,
      "optional": Number,
      "peer": Number,
      "peerOptional": Number,
      "total": Number
    }
  }
});
const ClientLoagsModel = mongoose.model(
  "ClientLoagsModel",
  ClientLoagsModelSchema
)
module.exports = {
  ClientLoagsModel
};
