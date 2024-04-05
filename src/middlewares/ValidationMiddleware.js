const Joi = require('joi');
const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');

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
           return  errorHandler(res,422,message)
        }
    };
};
const ValidationMiddlewareQuery = (schema) => {
    return (req, res, next) => {
        const { error } = Joi.object(schema).validate(req.query)
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            console.log("error", message);
           return  errorHandler(res,422,message)
        }
    };
};

module.exports = {ValidationMiddleware,ValidationMiddlewareQuery};
