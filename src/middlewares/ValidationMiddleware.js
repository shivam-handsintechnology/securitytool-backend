const Joi = require('joi');
const moment = require('moment');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const { AllowedDomainsModel, AllowedWebDomainsModel } = require('../models/AllowedDomainsModel');
const User = require("../models/User");
const { checkDomainAvailability } = require('../utilities/functions/functions');
const { default: mongoose } = require('mongoose');
const { extractRootDomain } = require('../utils');
const ValidationMiddleware = (schema) => {
    return (req, res, next) => {
        let statusCode = 500
        try {

            const payload = { ...req.body, ...req.query, ...req.params }
            const { error } = Joi.object(schema).unknown(true).validate(payload)

            if (error) {
                const { details } = error;
                const message = details.map(i => i.message.replace(/"/g, '')).join(',');
                statusCode = 422
                throw new Error(message)
            }
            next()
        } catch (error) {

            return errorHandler(res, statusCode, error.message)
        }
    }
};
const ValidationMiddlewareQuery = (schema) => {
    return async (req, res, next) => {
        let statusCode = 500
        try {
            const payload = {
                ...req.query,
                ...req.params,
            }

            const { error } = Joi.object(schema).unknown(true).validate(payload)

            if (error) {
                const { details } = error;
                const message = details.map(i => i.message).join(',');
                statusCode = 422
                throw new Error(message)
            }


            next()

        } catch (error) {
            return errorHandler(res, statusCode, error.message)
        }
    };
};
const AuthDomainMiddleware = async (req, res, next) => {
    let statusCode = 500
    try {
        let user = req.user ? req.user : {}
        const payload = { ...req.body, ...req.query, ...req.params, ...user }
        let { domain, appid } = payload
        if (!domain) {
            throw new Error("Domain is required")
        }
        let url = `http://${domain}`
        domain = extractRootDomain(url)
        console.log(domain)
        if (!appid) {
            throw new Error("Appid is required")
        }
        let isdomainfound = await checkDomainAvailability(domain)
        if (!isdomainfound) {
            statusCode = 422
            throw new Error("Domain Not found")
        }
        let isExistDomain = await User.findOne({ domain: domain, appid: appid });
        if (isExistDomain) {
            next()
        } else {
            statusCode = 403
            throw new Error("You Are Not Allowed")
        }
    } catch (error) {
        return errorHandler(res, statusCode, error.message)
    }
}

const AuthDomainMiddlewarePackage = async (req, res, next) => {
    let statusCode = 500
    let user = req.user ? req.user : {}
    const payload = { ...req.body, ...req.query, ...req.params, ...user }
    let { domain } = payload;
    try {
        if (!domain) {
            statusCode = 400;
            throw new Error("Domain is required")
        }
        let url = `http://${domain}`
        domain = extractRootDomain(url)
        console.log(domain)
        if (!appid) {
            statusCode = 400;
            throw new Error("Appid is required")
        }
        let isExistDomain = await User.findOne({ domain: domain, appid: appid }).populate("subsription")
        if (isExistDomain) {
            let subscription = isExistDomain.subsription;
            console.log("Subscription", subscription)
            if (!subscription) {
                statusCode = 400;
                throw new Error("Please Subsribe First")
            }
            if (!subscription.startDate && !subscription.endDate) {
                statusCode = 400;
                throw new Error("Please Subsribe First")
            }
            const currentDate = moment();
            const valid = moment(subscription.endDate, 'MMM DD HH:mm:ss YYYY GMT');
            if (valid.isBefore(currentDate)) {
                statusCode = 400;
                throw new Error("Subscription is Expired")
            }
            // isExistDomain.apistatus = true
            // await isExistDomain.save()

            req.user = isExistDomain
            // const result = await checkDomainAvailability(domain);
            // if (result) {
            //     let obj = { user: user._id, appid: payload.appid, domain }
            //     let existdomain = await AllowedDomainsModel.aggregate([
            //         {
            //             $match: {
            //                 user: new mongoose.Types.ObjectId(user._id),
            //                 appid: payload.appid
            //             }
            //         }
            //     ])
            //     if (existdomain.length == 0) {
            //         data = await AllowedDomainsModel.create(obj);
            //     } else if (existdomain.length === 1) {
            //         let finddomain = existdomain.find((item) => item.domain === domain)
            //         if (!finddomain) {
            //             throw new Error(`Only One Domain is Allowed  , ${existdomain[0]["domain"]}`)
            //         } else {
            //             data = finddomain
            //         }
            //     }
            // }
            next()
        } else {
            statusCode = 403
            throw new Error("You Are Not Allowed")
        }
    } catch (error) {
        return errorHandler(res, statusCode, error.message)
    }
}


module.exports = { ValidationMiddleware, ValidationMiddlewareQuery, AuthDomainMiddleware, AuthDomainMiddlewarePackage };
