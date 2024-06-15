const { Schema, model, default: mongoose } = require('mongoose');
const SubscriptionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    appid: {
        type: String,
        ref: 'User',
        required: true,
        unique: true,
    },
    startDate: {
        type: Date,
        // min date current date
        min: Date.now(),
        default: null,

    },
    endDate: {
        type: Date,
        // min date is one month after current date
        min: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Subscription = model('Subscription', SubscriptionSchema);
module.exports = Subscription;