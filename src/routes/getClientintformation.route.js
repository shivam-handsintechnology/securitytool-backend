// Import required modules
const { scanXSSvulnerability, scanRedirectvulnerability, scanSessionvulnerability, scanSQLvulnerability, scanHardCodedData, scanHardPasswordHashing, scanDirectoryOptionMethod, ScanDangerousMethods, DefaultWebPage, checkDirectoryListing, scanWebsite, generateWebsiteReport, } = require("../utils/scanClientData");
const { CallEmailVerify, checkDomainAvailability, hashttpParametersPollutionavailable, Nodeversion } = require("../utilities/functions/functions");
const { Project_Security_Logs } = require("../models/Project_Security_Logs");
const verifyToken = require('../middlewares/VerifyUser')
const url = require('url')
const { PasswordKeyModel } = require("../models/PasswordKeysModel");
const { CrticalInformationInurl, EmailVerifyModel, } = require("../models/sensitivekeywordsModel");
const { isHashedPassword, checkForSensitiveInfoInBody, CheckPasswordKeyText, CreatStatusCodesDetails, } = require("../utils/functions");
const { sensitivedata, passwordkeys, } = require("../sensitive/availableapikeys");
const NodeCache = require("node-cache");
const { ServerReportModel } = require("../models/ServerModels");
const { ClientLoagsModel } = require("../models/ClientLoagsModel");
const router = require("express").Router();
const axios = require('axios');
const { sensitiveinfoinbodyModel } = require("../models/SensitiveInfoInBodyModel");
const getMiddlewareController = require('../controllers/middlwaresController').getMiddlewareControllerForClient
const { SSLverifier } = require("../utils/Downtimemonitor");
const { sendResponse } = require("../utils/dataHandler");
const { errorHandler } = require("../utils/errorHandler");
const User = require("../models/User");
const { NodeVersionModel } = require("../models/NodeVersionModel");
const { default: mongoose } = require("mongoose");
const cache = new NodeCache({ stdTTL: 60 }); // Cache with a TTL of 60 seconds
router.get("/sslverify", async (req, res) => {
  try {
    const hostname = req.query.hostname
    if (hostname) {
      console.log("get hostname", hostname)
      const data = await SSLverifier(hostname).then((r => r)).catch((e) => e)
      console.log("get data", data)
      return sendResponse(res, 200, "fetch ssl ", data)
    } else {
      return sendResponse(res, 200, "Hostname is required", {})
    }
    // Example usage
  } catch (error) {
    console.error("Error retrieving allowed domains:", error.message);
    return errorHandler(res.message)
  }
});
router.get("/alloweddomains", async (req, res) => {
  const domain = req.query.sid;
  const appid = req.query.appid;
  try {
    const alloweddomains = await User.findOne(
      { domain: { $in: [domain] }, appid },
      { password: 0, createdAt: 0, updatedAt: 0 }
    ).lean();

    if (alloweddomains) {
      return res.status(200).json(alloweddomains);
    } else {
      return res.status(404).json("please enter valid details");
    }
  } catch (error) {
    console.error("Error retrieving allowed domains:", error);
    return res.status(500).json("Internal server error");
  }
});

router.post("/createuserdetails", async (req, res) => {
  var { UserRawData, ip, type, appid } = req.body;
  const update = UserRawData;
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    const finduser = await Project_Security_Logs.findOne({ user: mongoose.Types.ObjectId(alloweddomains._id), ip });
    if (finduser) {
      await Project_Security_Logs.findOneAndUpdate({ user: mongoose.Types.ObjectId(alloweddomains._id), ip }, update);
    } else if (!finduser) {
      await Project_Security_Logs.create({ user: mongoose.Types.ObjectId(alloweddomains._id), ...UserRawData });
    }
  } else {
    res.status(403).json("you are not allowed");
  }
  //  return  res.status(200).json("Ok")
});
router.post("/responsecodeavailableornot", async (req, res) => {
  var { data, hostname, url, appid } = req.body;
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    if (data.resoponsecodedata.code) {
      CreatStatusCodesDetails(
        data.resoponsecodedata.code,
        data.resoponsecodedata.phrase,
        url,
        hostname,
        id = alloweddomains._id
      );
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post("/emailverify", async (req, res) => {
  var { emailid, hostname, url, appid } = req.body;

  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    if (emailid) {
      await CallEmailVerify(email = emailid, hostname);
      res.status(200).json("workflow");
    } else {
      res.status(404).send("not found");
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.get("/passwordkeys", async (req, res) => {
  const data = await PasswordKeyModel.find(
    {},
    { passwordkey: 1, exist: true }
  );
  const values = data.map((v) => v.passwordkey);
  return res.status(200).json({ passwordkeys: values });
});
router.post("/sensitivekeysandPasswordValidate", async (req, res) => {
  try {
    var { hostname, currentData, appid } = req.body;
    const alloweddomains = await User.findOne(
      { appid },
      { password: 0, createdAt: 0, updatedAt: 0 }
    ).lean();
    if (alloweddomains) {
      const sensitivedatainbody = await checkForSensitiveInfoInBody(
        currentData,
        sensitivedata
      );
      const password = await CheckPasswordKeyText(currentData, passwordkeys);
      if (password) {
        const HashedPassword = await isHashedPassword(password);
        const existingMessage = await PasswordValidateModel.findOne({
          user: mongoose.Types.ObjectId(alloweddomains._id),
          hostname,
        });
        if (existingMessage) {
          console.log("Found existing HashedPassword in Db");
          await PasswordValidateModel.findOneAndUpdate(
            { user: mongoose.Types.ObjectId(alloweddomains._id), hostname },
            { HashedPassword: HashedPassword.message }
          );
        } else {
          console.log("Create New HashedPassword in Db");
          await PasswordValidateModel.create({
            _id: alloweddomains._id,
            hostname: hostname,
            HashedPassword: HashedPassword.message,
          });
        }
      }
      if (sensitivedatainbody) {
        const existingMessage = await sensitiveinfoinbodyModel.findOne(
          { user: mongoose.Types.ObjectId(alloweddomains._id), hostname, sensitivekeys: sensitivedatainbody },
          { exist: true }
        );
        if (existingMessage) {
          // Handle matching hostname and sensitive key
          console.log("Found existing sensitivedata in body");
        } else {
          console.log("Create New sensitivedata in body");
          await sensitiveinfoinbodyModel.create({
            user: mongoose.Types.ObjectId(alloweddomains._id),
            hostname,
            sensitivekeys: sensitivedatainbody,
          });
          // Return success response for creating new data
          res.status(200).json({ succes: true });
        }
      } else {
        res.status(200).json({ sucess: true });
      }
    } else {
      res.status(403).json("you are not allowed");
    }
  } catch (error) {
    console.log("sensitive error", error);
  }
});
router.post("/sensitivekeysinurl", async (req, res) => {
  try {
    console.log(req.body)
    let { data, url, hostname, appid } = req.body;

    const alloweddomains = await User.findOne(
      { appid },
      { password: 0, createdAt: 0, updatedAt: 0 }
    ).lean();
    if (alloweddomains) {
      const sensitivekey = await checkForSensitiveInfoInBody(
        data,
        sensitivedata
      );
      if (sensitivekey) {
        const existingMessage = await CrticalInformationInurl.findOne(
          {
            user: mongoose.Types.ObjectId(alloweddomains._id),
            hostname,
            sensitivekeys: sensitivekey,
          },
          { _id: 0 }
        );
        console.log({ existingMessage });
        if (existingMessage) {
          console.log("Found existing sensitive key in URL");
        } else {
          console.log("Creating new sensitive key in URL");
          const d = await CrticalInformationInurl.create({
            user: alloweddomains._id,
            hostname,
            url,
            sensitivekeys: sensitivekey,
          });
          console.log(d);
          // Return success response for creating new data
          return res.status(201).json({ success: true });
        }
      } else {
        // Return response indicating that no sensitive key was found
        return res.status(200).json({ sensitivekey: false });
      }
    } else {
      res.status(403).json("you are not allowed");
    }
    //
  } catch (error) {
    console.log({ sensitivekeysinurlerror: error });
    // Handle the error routerropriately
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/scanhardcodedata", async (req, res) => {
  const { fileName, content, sid, appid } = req.body;
  //
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    var HardCodedData = await scanHardCodedData(content, fileName);
    if (HardCodedData.length > 0) {
      return res.status(200).json({ HardCodedData });
    } else {
      return res.sendStatus(204);
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post("/scanpasswordhashing", async (req, res) => {
  const { fileName, content, sid, appid } = req.body;
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    var PasswordHashing = await scanHardPasswordHashing(content, fileName);
    if (PasswordHashing.length > 0) {
      return res.status(200).json({ PasswordHashing: PasswordHashing });
    } else {
      return res.sendStatus(204);
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post("/optionmethodvulnerability", async (req, res) => {
  const { routes, hostname, appid } = req.body;
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    const OptionMethod = await scanDirectoryOptionMethod(routes, hostname);
    res.json({ OptionMethod });
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post("/dangerousemethodvulnerability", async (req, res) => {
  const { routes, hostname, appid } = req.body;

  //
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    const DangerousMethods = await ScanDangerousMethods(routes, hostname);
    res.json({ DangerousMethods });
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post("/defaultwebpagevulnerability", async (req, res) => {
  const { routes, hostname, appid } = req.body;
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {

    const dwp = await DefaultWebPage(routes, hostname);
    return res.json({ dwp: dwp.toString() });
  } else {
    return res.status(403).json("you are not allowed");
  }
});
router.post("/nodeconfiguration", async (req, res) => {
  const { nodejsveresion, hostname, appid, params } = req.body;
  console.log({ params })
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    await hashttpParametersPollutionavailable(params, appid)
    var version = nodejsveresion
    version = version.replace(/^./, "")
    version = parseInt(version)
    const nodejslatestserverresonse = await axios.get('https://nodejs.org/dist/index.json');
    const versions = nodejslatestserverresonse.data;
    const ltsVersions = versions.filter(version => version.lts);
    // Get the latest LTS version
    let latest_version = ltsVersions[0].version;
    latest_version = latest_version.replace(/^./, "")
    latest_version = parseInt(latest_version)
    console.log(latest_version)
    isolderversion = version < latest_version ? "older version" : "latest version"
    const data = await Nodeversion(appid, isolderversion)
    return res.json({ Nodejs_version: data, });
  } else {
    return res.status(403).json("you are not allowed");
  }
});

router.post("/xssvulnerability", async (req, res) => {
  const { fileName, content, sid, appid } = req.body;
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    const xss = await scanXSSvulnerability(content, fileName);
    res.json({ xss });
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post("/redirectvulnerability", async (req, res) => {
  const { fileName, content, sid, appid } = req.body;
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    const redirect = await scanRedirectvulnerability(content, fileName);
    res.json({ redirect });
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post("/sessionvulnerability", async (req, res) => {
  const { fileName, content, sid, middlewares, appid } = req.body;
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    const session = await scanSessionvulnerability(content, fileName, middlewares);
    console.log("fafafaf", session)
    res.json({ session });
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post("/sqlvulnerability", async (req, res) => {
  const { fileName, content, sid, appid } = req.body;
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    const sql = await scanSQLvulnerability(content, fileName);
    res.json({ sql });
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post("/logsdata", async (req, res) => {
  try {
    const { logs, sid, appid } = req.body;
    const alloweddomains = await User.findOne(
      { appid },
      { password: 0, createdAt: 0, updatedAt: 0 }
    ).lean();
    if (alloweddomains) {
      const finduser = await ClientLoagsModel.findOne({ user: mongoose.Types.ObjectId(alloweddomains._id), hostname: sid });
      console.log({ ClientLoagsModel: finduser })
      if (finduser) {
        const updatedata = await ClientLoagsModel.findOneAndUpdate(
          { user: mongoose.Types.ObjectId(alloweddomains._id), hostname: sid },
          { LogsData: logs }
        );
        res.json(updatedata);
      } else if (!finduser) {
        const newdata = await ClientLoagsModel.create({
          user: mongoose.Types.ObjectId(alloweddomains._id),
          LogsData: logs,
          hostname: sid,
        });
        res.json(newdata);
      }
    } else {
      res.status(403).json("you are not allowed");
    }
  } catch (error) {
    console.log
  }
});
router.get("/logsdata", async (req, res) => {
  const { sid, appid, } = req.query;
  function deleteDuplicate(a) { a = a.toString().replace(/ /g, ","); a = a.replace(/[ ]/g, "").split(","); for (var b = [], c = 0; c < a.length; c++)-1 == b.indexOf(a[c]) && b.push(a[c]); b = b.join(", "); return b = b.replace(/,/g, " ") };
  const results = []
  const alloweddomains = await User.findOne(
    { appid },
    { password: 0, createdAt: 0, updatedAt: 0 }
  ).lean();
  if (alloweddomains) {
    const finduser = await ClientLoagsModel.findOne({ user: mongoose.Types.ObjectId(alloweddomains._id), hostname: sid });
    if (finduser) {
      var passwordHashing = ""
      var xss = ""
      var sql = ""
      var session = ""
      var dwp = ""
      var redirect = ""
      var OptionMethod = ""
      var DangerousMethods = ""
      var npmvulnurabilties = ""
      var LogsData = finduser.LogsData;
      console.log("LogsData", LogsData)
      LogsData.map((k, v) => {

        if (Object.keys(k).includes('npmvulnurabilties')) {
          for (value of Object.values(k)) {
            npmvulnurabilties += value.toString()
          }
        }
        if (Object.keys(k).includes('DangerousMethods')) {
          for (value of Object.values(k)) {
            if (value === null) {
              DangerousMethods = "Dangerous Methods are  not enable"
            } else {
              DangerousMethods = value.toString()
            }
          }
        }
        if (Object.keys(k).includes('OptionMethod')) {
          for (value of Object.values(k)) {
            if (value === null) {
              OptionMethod = "Option Method is not enable"
            } else {
              OptionMethod = value.toString()
            }


          }
        }
        if (Object.keys(k).includes('PasswordHashing')) {
          for (value of Object.values(k)) {

            passwordHashing += value.toString()
          }
        } else {
          passwordHashing = "password text not store in hash format"
        }
        if (Object.keys(k).includes('xss')) {
          for (value of Object.values(k)) {
            xss += value.toString()
          }
        }
        if (Object.keys(k).includes('sql')) {
          let sessionvalue = Object.values(k)[0]
          if (sessionvalue.toString() == "Mysql Not Found") {
            sql += sessionvalue.toString() + ",";
          } else {
            sql += sessionvalue.toString()
          }
        }
        if (Object.keys(k).includes('redirect')) {
          for (value of Object.values(k)) {
            if (value.length < 1) {
              redirect += "Redirect vunurbilities not found" + ","
            } else {
              redirect += value.toString()
            }
          }
        }
        if (Object.keys(k).includes('session')) {
          let sessionvalue = Object.values(k)[0]
          if (Object.values(k)[0].length > 1) {
            session += sessionvalue.toString() + ","
          } else {
            session += sessionvalue.toString() + ","
          }

        }
        if (Object.keys(k).includes('dwp')) {
          for (value of Object.values(k)) {
            dwp += value.toString()
          }
        }
        // console.log(Object.keys(k))
      })
      sql = deleteDuplicate(sql)
      session = deleteDuplicate(session)
      redirect = deleteDuplicate(redirect)
      const data = {
        passwordHashing,
        xss,
        sql,
        session,
        dwp,
        redirect,
        OptionMethod,
        DangerousMethods,
        npmvulnurabilties
      }
      res.status(200).json(data);
    } else if (!finduser) {
      res.status(404).json("not found");
    }
  } else {
    res.status(403).json("you are not allowed");
  }
});
router.post('/sessionstoragedata', async (req, res) => {
  const { filteredRequests, localStorageData, sessionStorageData } = req.body
  if (filteredRequests) {
    const d = filteredRequests.forEach(async (x) => {
      if (x.response.startsWith("{")) {
        if (x.url == 'http://localhost:8080/api/security/test/sensitiveinfoinurl') {
          return
        } else {
          const responsedata = JSON.parse(x.response)
          const sensitivekey = await checkForSensitiveInfoInBody(
            responsedata,
            sensitivedata
          );
          if (sensitivekey) {
            return { sensitivekey, res: x.response }
          }
        }

      }
    })
    Promise.all([d]).then((result) => console.log(result));
  }
  if (localStorageData) {

    // console.log(localStorageData)

  }
  if (sessionStorageData) {
    // console.log(sessionStorageData)
  }
  res.json("hello")
  return false
  const sensitivekey = await checkForSensitiveInfoInBody(
    data,
    sensitivedata
  );
  if (sensitivekey) {
    const existingMessage = await CrticalInformationInurl.findOne(
      {
        hostname,
        sensitivekeys: sensitivekey,
      },
      { _id: 0 }
    );
    console.log(existingMessage);
    if (existingMessage) {
      console.log("Found existing sensitive key in URL");
    } else {
      console.log("Creating new sensitive key in URL");
      const d = await CrticalInformationInurl.create({
        hostname,
        url,
        sensitivekeys: sensitivekey,
      });
      console.log(d);
      // Return success response for creating new data
      return res.status(201).json({ success: true });
    }
  } else {
    // Return response indicating that no sensitive key was found
    return res.status(200).json({ sensitivekey: false });
  }

  res.json("hello")
}
)
router.get('/directory_listing_is_enabled_on_the_server', verifyToken, async (req, res) => {
  try {
    if (req.user) {
      const data = await checkDirectoryListing(`http://autotest.handsintechnology.in/`)
      return sendResponse(res, 200, 'Directory listing.', data)
    } else {
      throw new Error("user does not exist")
    }
  } catch (error) {
    console.log(error)
    return errorHandler(res, 500, error.message)
  }
}
)
router.get('/default_web_page', verifyToken, async (req, res) => {
  try {
    const response = await axios.get(`http://lmpapi.handsintechnology.in/`);
    if (response.status === 200 && response.data.includes('Index of')) {
      return sendResponse(res, 200, 'Directory listing is enabled.', { Webpage: 'Directory listing is enabled.' })
    } else if (response.status === 200) {
      return sendResponse(res, 200, 'Default web page available.', { Webpage: 'Default web page available.' })
    }
  } catch (error) {
    if (error?.response?.status >= 400) {
      if (error?.response?.status === 404) {
        return sendResponse(res, 200, 'Default web page not found.', { Webpage: 'Default web page not found.' })
      } else if (error?.response?.status === 403) {
        return sendResponse(res, 200, 'Access forbidden', { Webpage: 'Access forbidden' })
      }
    }
  }

}
)
router.get('/plaincredential', async (req, res) => {
  const axios = require('axios');
  try {
    const response = await axios.get('http://lmpapi.handsintechnology.in/');
    const protocol = response.request.protocol.replace(':', "");
    if (protocol == "http") {
      return sendResponse(res, 200, 'Credentials are transmitted to server in plain text', { cra: "Credentials are transmitted to server in plain text" })
    }
    else if (protocol == "https") {
      return sendResponse(res, 200, 'Credentials are not transmitted to server in plain text', { cra: "Credentials are not transmitted to server in plain text" })
    }
    // console.log(response.request.res.httpVersion);
  } catch (error) {
    const protocol = error.request.protocol.replace(':', "")
    if (protocol == "http") {
      return sendResponse(res, 200, 'Credentials are transmitted to server in plain text', { cra: "Credentials are transmitted to server in plain text" })
    }
    else if (protocol == "https") {
      return sendResponse(res, 200, 'Credentials are not transmitted to server in plain text', { cra: "Credentials are not transmitted to server in plain text" })
    }
    // console.log(error.request.res.httpVersion);
    console.log('Error:', error.message);
  }
}
)
router.get("/accesscontrollalloworigin", verifyToken, async (req, res) => {

  if (req.user) {
    const response = await axios.get(`http://autotest.handsintechnology.in/`).then((res => res)).catch((err => err.response))
    const access_control_allow_origin = response.headers['access-control-allow-origin']
    if (access_control_allow_origin) {
      if (access_control_allow_origin === '*') {
        return sendResponse(res, 200, "access controll alow origin is set to *", { access_control_allow_origin: "access controll alow origin is set to *" })

      } else {
        return sendResponse(res, 200, "access controll alow origin is not set to *", { access_control_allow_origin: "access controll alow origin is not  set to *" })
      }
    } else {
      return sendResponse(res, 200, "access controll alow origin is not set", { access_control_allow_origin: "access controll alow origin is not set" })

    }
  } else {
    return res.status(403).json("you are not allowed");
  }
});
router.get('/securityheaders', async (req, res) => {
  // try {
  const url = require('url')
  if (req.query.url) {
    const { isUrlValid } = require('../utils/ScanHeaders/helpers')
    if (!isUrlValid(req.query.url)) throw new Error('Invalid URL format!')
    const hostname = url.parse(req.query.url).hostname
    const valid = await checkDomainAvailability(hostname)

    if (!valid) {
      return res.json("please enter valid url")
    } else if (valid) {
      const checkMyHeaders = require('../utils/ScanHeaders')
      const data = await checkMyHeaders(req.query.url)
        .then((messages) => messages)
      const rawHeaders = data.headers
      return res.json({ headersinfo: data.messages, rawHeaders })

    }

  } else {
    res.json("please provide url")
  }
  // } catch (error) {
  // console.log({error})
  // errorHandler(res,500,error.message)
  // }

}
)
router.get('/nodeversion', verifyToken, async (req, res) => {
  try {
    if (req.user) {
      const data = await NodeVersionModel.findOne({ appid: req.user.appid })
      return sendResponse(res, 200, "fetch", data)
    } else {
      throw new Error("User not exist")
    }
  } catch (error) {
    console.log({ error })
    errorHandler(res, 500, error.message)
  }
}
)

router.post('/scanpackagejson', async (req, res) => {
  const { fileContent, sid, appid } = req.body
  const dependencies = JSON.parse(fileContent).dependencies
  const dependencieslist = Object.keys(dependencies)
  if (dependencieslist.includes('sequelize')) {
    console.log("sequelize is used")
  }
  else if (dependencieslist.includes('mysql2' || 'mysql')) {
    console.log("mysql is used")
  } else if (dependencieslist.includes('mongoose')) {
    console.log("mongodb find")
  } else {
    console.log("any database not found")
  }
  res.json("ok")
})
router.get('/middlewares', getMiddlewareController)
module.exports = router;
