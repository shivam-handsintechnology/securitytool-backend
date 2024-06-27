const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SensitiveDataStoredInSessionStorageSchema = new Schema({
    appid: {
        type: String,
        ref: 'User'
    },
    data: [
        {
            key: {
                type: String,

            },
            value: {
                type: mongoose.Schema.Types.Mixed,

            }
        }
    ],
    domain: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('SensitiveDataStoredInSessionStorage', SensitiveDataStoredInSessionStorageSchema);