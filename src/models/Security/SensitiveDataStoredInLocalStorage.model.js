const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SensitiveDataStoredInLocalStorageSchema = new Schema({
    appid: {
        type: String,
        ref: 'User'
    },
    data:[
        {
            key:{
                type:String,
                required:true
            },
            value:{
                type:mongoose.Schema.Types.Mixed,
                required:true
            }
        }
    ],
    domain: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('SensitiveDataStoredInLocalStorage', SensitiveDataStoredInLocalStorageSchema);