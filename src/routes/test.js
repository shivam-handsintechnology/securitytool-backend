var express = require('express');
var router = express.Router();
const ServerCheckerController = require('../controllers/ServerChecker.controller.js');
const EmailHarvestingController = require('../controllers/EmailHarvestingController/EmailHarvesting.controller');
const { sendResponse } = require('../utils/dataHandler');
const crypto = require('crypto');
const { ClientLoagsModel } = require('../models/ClientLoagsModel.js');
const verifyToken = require('../middlewares/VerifyUser.js');
const { default: mongoose } = require('mongoose');
const { Session_time_out_is_high__not_implemented } = require('../utils/dashboarddataChecker.js');
router.post("/", async (req, res) => {
  return sendResponse(res, 200, "Sucessfull", req.body)
})
router.get('/EmailHarvestingsData', EmailHarvestingController.EmailHarvestingData);
router.get('/sensitiveinfoinurl', EmailHarvestingController.SensitiveinfoInUrl);
router.get('/sensitiveinfoinbody', EmailHarvestingController.SensitiveInfoInBody);
router.get('/defaultwebpage', EmailHarvestingController.DefaultWebPage);
router.get("/", (req, res) => {
  return sendResponse(res, 200, "Sucessfull", req.query)
})
router.get("/", (req, res) => {
  console.log(req.body)
    (res, 200, "Sucessfull", req.body)
})
router.get("/robottxt", ServerCheckerController.getRobotsTxt)
router.get("/PasswordValidatorController", ServerCheckerController.PasswordValidatorController)
router.get("/responsecodes", ServerCheckerController.ServerErrorResponseCodesController)
router.get("/reponsecodeslogin", ServerCheckerController.ResponseCodesLoginController)
router.get("/session-data", verifyToken, async (req, res) => {
  try {


    let data = await ClientLoagsModel.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      { $project: { "LogsData": 1 } }
    ]);
    if (data.length === 0) {
      return sendResponse(res, 404, "Records are not found");
    }
    // Combine duplicate properties and merge their values into arrays
    const originalLogsData = data[0].LogsData.reduce((accumulator, current) => {
      Object.entries(current).forEach(([key, value]) => {
        if (accumulator[key]) {
          if (!Array.isArray(accumulator[key])) {
            accumulator[key] = [accumulator[key]];
          }
          accumulator[key].push(value.toString());
        } else {
          accumulator[key] = value;
        }
      });

      return accumulator;
    }, {});
    const cleanedLogsData = Object.fromEntries(
      Object.entries(originalLogsData).map(([key, value]) => {
        // Use a Set to track unique values
        const uniqueValues = new Set(Array.isArray(value) ? value : [value]);
        const cleanedArray = Array.from(uniqueValues);
        return [key, cleanedArray];
      })
    );
    let sessionobj = {}
    if (cleanedLogsData) {
      if (cleanedLogsData.session) {
        // Session token being passed in other areas apart from a cookie
        sessionobj["Session token being passed in other areas apart from a cookie"] = "No"
        if (cleanedLogsData.session.includes("Session token being passed in other areas apart from a cookie")) {
          sessionobj["Session token being passed in other areas apart from a cookie"] = "Yes"
        }
        // An adversary can hijack user sessions by session fixation
        sessionobj["An adversary can hijack user sessions by session fixation"] = ""
        if (cleanedLogsData.session.includes("Regularly regenerating session IDs to prevent session fixation attack")) {
          sessionobj["An adversary can hijack user sessions by session fixation"] = "No"
        } else {
          sessionobj["An adversary can hijack user sessions by session fixation"] = "Yes"

        }
        // Session does not expire on closing the browser
        sessionobj["Session does not expire on closing the browser"] = "No"
        if (cleanedLogsData.session.includes("Session does not expire on closing the browser")) {
          sessionobj["Session does not expire on closing the browser"] = "Yes"
        }
        // Session time-out is high (or) not implemented
        let stringvalue = ""
        //  Session 
        if (cleanedLogsData.session.includes("Session_time_out is Normal")) {
          stringvalue += "Session Time Out is Normal" + ","
        }
        if (cleanedLogsData.session.includes("Session_time_out is Low")) {
          stringvalue += "Session Time Out is Low" + ","
        }
        if (cleanedLogsData.session.includes("Session_time_out is High")) {
          stringvalue += "Session Time Out is High" + ","
        }
        if (cleanedLogsData.session.includes("Session is Infinite")) {
          stringvalue += "Session is Infinite" + ","
        }
        if (cleanedLogsData.session.includes("Not Implemented")) {
          stringvalue += "Not Implemented" + ","
        }
        if (cleanedLogsData.session.includes("Session Found")) {
          stringvalue += "Session Found" + ","
        }
        sessionobj["Session time-out is high (or) not implemented"] = stringvalue
      }
    }
    return sendResponse(res, 200, "Fetch all domains", { LogsData: cleanedLogsData, sessionobj });
  } catch (error) {
    return sendResponse(res, 500, error.message);

  }
}
)
router.get('/set-session-cookie', (req, res) => {
  res.cookie('session-id', 'your-session-data', {
    session: true // Set cookie to expire when the browser is closed
  });
  return res.send('Session cookie set');
});
router.get('/profile', (req, res) => {
  console.log(req.session)

  if (req.session.user) {
    const user = req.session.user;
    return res.send(`Welcome ${user.firstName} ${user.lastName}!`);
  } else {
    return res.send('Please log in to view your profile.');
  }
});
router.get('/remember', (req, res) => {
  if (req.session.user) {
    const user = req.session.user;
    return res.send(`Welcome ${user.firstName} ${user.lastName}!`);
  } else {
    return res.send('Please log in to view your profile.');
  }
});
router.get('/hash/:algorithm', (req, res) => {
  const algorithm = req.params.algorithm;
  const message = req.query.message;
  if (!message) {
    return res.status(400).send('Missing required parameter: message');
  }
  if (!crypto.getHashes().includes(algorithm)) {
    return res.status(400).send(`Unsupported algorithm: ${algorithm}`);
  }
  const hash = crypto.createHash(algorithm).update(message).digest('hex');
  res.send(hash);
});
router.get('/allhashesh', (req, res) => {

  let listOfSupportedHashes = crypto.getHashes();

  if (!listOfSupportedHashes) {
    return res.status(400).send('Missing required parameter: message');
  }
  return sendResponse(res, 200, "all hsh list", listOfSupportedHashes)
});

module.exports = router