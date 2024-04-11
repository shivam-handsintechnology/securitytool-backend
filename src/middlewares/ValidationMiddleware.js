const Joi = require('joi');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const { AllowedDomainsModel } = require('../models/AllowedDomainsModel');
const User = require("../models/User");
const { checkDomainAvailability } = require('../utilities/functions/functions');
const ValidationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = Joi.object(schema).validate(req.body)
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message.replace(/"/g, '')).join(',');

            console.log("error", message);
            return errorHandler(res, 422, { succces: false, data: {}, message: message })
        }
    };
};
const ValidationMiddlewareQuery = (schema) => {
    return async (req, res, next) => {
        const { error } = Joi.object(schema).validate(req.query)
        const valid = error == null;

        if (valid) {
            if (req.query.domain) {
                const validdomain = await checkDomainAvailability(req.query.domain)
                if (!validdomain) {
                    return errorHandler(res, 422, "Please Enter Valid Domain", { succces: false, data: {}, message: error.message })
                }

            }

            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            return errorHandler(res, 422, message, { succces: false, data: {}, message: message })
        }
    };
};
const AuthDomainMiddleware = async (req, res, next) => {
    try {
        let domain = req.query.domain
        let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
        if (isExistDomain) {
            next()
        } else {
            return errorHandler(res, 500, "Domain is Not Allowed")
        }
    } catch (error) {
        return errorHandler(res, 500, error.message)
    }
}
const AuthDomainMiddlewarePackage = async (req, res, next) => {
    try {
        if (!req.body.appid) {
            throw new Error("Plese Provide Appid")
        }
        let user = await User.findOne({ appid: req.body.appid })
        if (user) {
            req.user = user
            const { domain } = req.body;
            if (!domain) {
                throw new Error("domain is required")
            }
            // else if (domain.includes("localhost")) {
            //     throw new Error("Domain should not be localhost")
            // }
            const result = await checkDomainAvailability(domain);
            if (result) {
                let obj = { user: user._id, domain: domain, appid: req.body.appid }
                let existdomain = await AllowedDomainsModel.findOne(obj);
                if (!existdomain) {
                    await AllowedDomainsModel.create(obj);
                    return sendResponse(res, 200, "Domain added successfully");
                }

            }
            next()
        } else {
            throw new Error("You Are Not Allowed")
        }
    } catch (error) {
        return errorHandler(res, 500, error.message)
    }
}


module.exports = { ValidationMiddleware, ValidationMiddlewareQuery, AuthDomainMiddleware, AuthDomainMiddlewarePackage };
