const Audit = require("../models/Audit.model");



module.exports = (req, res, next) => {
    console.log(req.originalUrl)

    const sessionData = {
        url: req.originalUrl,
        method: req.method,
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
    };

    Audit.create(sessionData)
        .then(() => {
            console.log('Session data saved successfully');
            next();
        })
        .catch((err) => {
            console.error('Error saving session data:', err);
            next();
        });
    next()



}