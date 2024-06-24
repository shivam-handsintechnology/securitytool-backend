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
            password: Joi.string().required().label("Password"),
            name: Joi.string().required().label("Name"),
            // start date is min current date




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
        }).unknown(true)
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
    },
    razorPayValidation: {
        amount: Joi.number().equal(9).required().label("Amount").messages({
            "number.base": "Amount must be a number",
            "number.equal": "Amount must be 9"
        }),
        currency: Joi.string().required().label("Currency"),
        // receipt: Joi.string().required().label("Receipt"),
        // customer: Joi.object().required().label("Customer"),
        // order_id: Joi.string().required().label("Order ID")
    },
    razorPaySuccessValidation: {
        order_id: Joi.string().required().label("Order ID"),
        razorpay_order_id: Joi.string().required().label("Razorpay Order ID"),
        razorpay_payment_id: Joi.string().required().label("Payment ID"),
        razorpay_signature: Joi.string().required().label("Signature")

    },
    SeoValidationUrl: {
        url: Joi.string().required().label("Url")
    },
    SeoValidation: {
        url: Joi.string().required().label("Url"),
        meta_data: Joi.array().items(
            Joi.object({
                title: Joi.string().required().label("Title"),
                description: Joi.string().required().label("description"),
                keywords: Joi.array().required().label("keywords"),
            })
        ).required().label("meta data"),
    }


}

