const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SensitiveDataStoredInLocalStorageSchema = new Schema({
    appid: {
        type: String,
        ref: 'User',
        unique: true,
    },
    data:[
        {
            key:{
                type:String,
             
            },
            value:{
                type:mongoose.Schema.Types.Mixed,
                
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