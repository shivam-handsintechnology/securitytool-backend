const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SensitiveDataStoredInLocalStorageSchema = new Schema({
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
                key: String,
                id: {
                    type: Boolean,
                    default: false
                },
                value: String



            }
        }
    ],
    domain: {
        type: String,
        required: true,
        unique: true
    }, subdomain: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('SensitiveDataStoredInLocalStorage', SensitiveDataStoredInLocalStorageSchema);