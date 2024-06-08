const Joi = require("joi");

module.exports = {
    validateIPaddress: async (ipaddress) => {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return true;
        }
        return false;
    },
    MiscellaneousAttackValidation:
    {
        attempt: Joi.string().required().label("Attempt"),
        duration: Joi.string().required().label("Duration"),
        domain: Joi.string().domain().required().label("Domain")

    },
    ValidateUserSignUp: (data) => {
        const Schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
        }).unknown(true)
        const Error = Schema.validate(data)
        let message = null;
        if (Error.error) {
            message = Error.error.details.length > 0 && Error.error.details[0]["message"].replace(/"/g, '')
        }
        return message
    },
    ValidateUserLogin: (data) => {
        const Schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
            password: Joi.string().required().label("Paasword"),
        })
        const Error = Schema.validate(data)
        let message = null;
        if (Error.error) {
            message = Error.error.details.length > 0 && Error.error.details[0]["message"].replace(/"/g, '')
        }
        return message
    },
    refreshTokenBodyValidation: (body) => {
        const schema = Joi.object({
            refreshToken: Joi.string().required().label("Refresh Token"),
        });
        return schema.validate(body);
    },
    DomainValidationSchema: {
        domain: Joi.string().domain().required().label("Domain")
    }
}

