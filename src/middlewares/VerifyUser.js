const jwt = require("jsonwebtoken");
const moment = require("moment");
const { sendResponse } = require("../utils/dataHandler");
const { errorHandler } = require("../utils/errorHandler");
const Subscription = require("../models/SubscriptionModel");
const skiproute = ['/checkout', '/checkout/verify']
const verifyToken = (req, res, next) => {
  try {
    console.log(req.path)
    console.log("verify token", req.headers.authorization)
    var Authenticate = true;
    const authHeader = req.headers.authorization || req.query.authorization || req.body.authorization || req.headers.Authorization || req.query.Authorization || req.body.Authorization
    if (!authHeader) {
      Authenticate = false;
      return sendResponse(res, 403, "missing authorization", { Authenticate })
    }
    const [authType, token] = authHeader.split(' ');
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        Authenticate = false;
        return sendResponse(res, 403, err.message, { Authenticate })
      }

      if (skiproute.includes(req.path)) {
        req.user = user
        return next();
      }
      let subsription = await Subscription.findOne({ userId: user.id });
      console.log("subsription", subsription

      )
      if (!subsription) {

        return sendResponse(res, 405, "Please Subsribe First", { Authenticate })
      } else if (!subsription.startDate && !subsription.endDate) {
        return sendResponse(res, 405, "Please Subsribe First", { Authenticate })
      }
      const currentDate = moment();
      const valid = moment(subsription.endDate, 'MMM DD HH:mm:ss YYYY GMT');
      if (valid.isBefore(currentDate)) {
        return sendResponse(res, 405, "Subscription is Expired", { Authenticate })
      }
      req.user = user
      return next();
    });

  } catch (error) {
    console.log(error)
    return errorHandler(res, 500, error.message)
  }
};


module.exports = verifyToken;