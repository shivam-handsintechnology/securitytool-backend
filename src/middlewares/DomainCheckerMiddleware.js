const { errorHandler } = require("../utils/errorHandler");
const dns = require("dns")
module.exports = async (req, res, next) => {
    const payload = {
        ...req.query,
        ...req.params,
    }
    dns.lookup(payload.domain, (err, d) => {
        if (err && err.code === "ENOTFOUND") {
            return errorHandler(res, 422, "Domain not found")
        } else {
            next()
        }
    })
}