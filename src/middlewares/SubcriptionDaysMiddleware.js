const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/errorHandler');
const { UserModel } = require('../models/UserModel');
const { SubscriptionModel } = require('../models/SubscriptionModel');

const SubscriptionDaysMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ _id: decoded._id });
        if (!user) {
            throw new Error('User not found');
        }
        const subscription = await SubscriptionModel.findOne({ userId: decoded._id });
        if (!subscription) {
            throw new Error('Subscription not found');
        }
        const currentDate = new Date();
        if (currentDate > subscription.endDate) {
            throw new Error('Subscription expired');
        }
        next();
    } catch (e) {
        errorHandler(e, res);
    }
}