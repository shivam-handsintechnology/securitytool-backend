import Joi from "joi";
export const Validators = {
    validateDomainAndType: (data) => {
        const Schema = Joi.object({
            domain: Joi.string().required().label("Domain"),
        }).unknown(true)
        const Error = Schema.validate(data)
        //console.log(Error)
        let message = null;
        if (Error.error) {
            message = Error.error.details.length > 0 && Error.error.details[0]["message"].replace(/"/g, '')
        }
        return message
    },
}