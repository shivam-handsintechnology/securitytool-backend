const { HostnameAppIDGetter } = require("../utils");
const { errorHandler } = require("../utils/errorHandler");

async function HostAndAppidGetterMiddleware(req, res, next) {
    try {
        if (!req.headers.origin) {
            return errorHandler(res, 404, "Origin Not found");
        }
        const hostname = new URL(req.headers.origin).hostname;
        req.body.domain = hostname
        req.body.hostname = hostname
        // Continue to the next middleware or route handler
        return next();
    } catch (error) {
        console.log(error)
        return errorHandler(res, 403, error.message)
    }

}
module.exports = {
    HostAndAppidGetterMiddleware
}