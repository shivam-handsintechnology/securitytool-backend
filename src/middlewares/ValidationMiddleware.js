const Joi = require('joi');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const { AllowedDomainsModel } = require('../models/AllowedDomainsModel');
const User = require("../models/User");
const { checkDomainAvailability } = require('../utilities/functions/functions');
const { default: mongoose } = require('mongoose');
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
        const payload = { ...req.body, ...req.query, ...req.params }
        let { domain, appid } = payload
        if (!domain) {
            throw new Error("Domain is required")
        }
        if (!appid) {
            throw new Error("Appid is required")
        }
        let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, appid: appid });
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
    try {
        let data
        if (!req.body.appid) {
            throw new Error("Plese Provide Appid")
        }
        let user = await User.findOne({ appid: req.body.appid })
        if (user) {
            await User.findByIdAndUpdate(user._id, { apistatus: true })
            req.user = user
            const { domain } = req.body;

            const result = await checkDomainAvailability(domain);
            if (result) {
                let obj = { user: user._id, appid: req.body.appid }
                let existdomain = await AllowedDomainsModel.aggregate([
                    {
                        $match: {
                            user: new mongoose.Types.ObjectId(user._id),
                            appid: req.body.appid
                        }
                    }
                ])
                if (existdomain.length == 0) {
                    data = await AllowedDomainsModel.create(obj);
                } else if (existdomain.length === 1) {
                    let finddomain = existdomain.find((item) => item.domain === domain)
                    if (!finddomain) {
                        throw new Error(`Only One Domain is Allowed  , ${existdomain["domain"]}`)
                    } else {
                        data = finddomain
                    }
                }
            }
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
