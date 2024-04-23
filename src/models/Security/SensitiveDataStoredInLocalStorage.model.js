const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SensitiveDataStoredInLocalStorageSchema = new Schema({
    appid: {
        type: String,
        ref: 'User'
    },
    cssxss:{
        type:String,
        required:false

    },
    data:[
        {
            key:{
                type:String,
                required:true
            },
            value:{
                type:String,
                required:true
            }
        }
    ],
    hostname: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('SensitiveDataStoredInLocalStorage', SensitiveDataStoredInLocalStorageSchema);