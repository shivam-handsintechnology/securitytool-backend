const mongoose = require('mongoose')
const AuthSessionGuardianSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  hostname: { type: String, unique: true,trim:true },
  "Session does not expire on closing the browser": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "Session time-out is high (or) not implemented.": { type: String, trim:true, enum: ['High', 'Low', 'Normal','Not Implemented'], default: 'Not Implemented'},
  "Session token being passed in other areas apart from cookie": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "An adversary can hijack user sessions by session fixation": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
  "Application is vulnerable to session hijacking attack": { type: String, enum: ['No', 'Yes','Not Implemented'],default:"Not Implemented" },
});
module.exports = mongoose.model( "AuthSessionGuardian", AuthSessionGuardianSchema )
