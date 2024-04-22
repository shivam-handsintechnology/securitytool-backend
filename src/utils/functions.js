const Project_Security_Logs = require('.././models/Project_Security_Logs')
// const axios = require('axios')
const https = require('https');
const { useCustomAxios } = require('../utilities/functions/fetchUrl');
const { default: mongoose } = require('mongoose');
const { sendResponse } = require('./dataHandler');
const passwordhashlist = require('../data/json/passwordhashlist');

// XLInjectionCheck
function checkForXMLInjection(xml) {
  // Check for CDATA injection attacks
  const cdataRegex = /<!\[CDATA\[(.*)\]\]>/;
  const cdataMatch = cdataRegex.exec(xml);
  if (cdataMatch && cdataMatch[1].includes(']]>')) {
    return true;
  }

  // Check for entity injection attacks
  const entityRegex = /<!ENTITY\s+([\w_-]+)\s+(['"])(.*?)\2\s*>/g;
  let entityMatch;
  while (entityMatch = entityRegex.exec(xml)) {
    const entityValue = entityMatch[3];
    if (entityValue.includes('<') || entityValue.includes('>')) {
      return true;
    }
  }

  // Check for tag injection attacks
  const tagRegex = /<([^\s/>]+)/g;
  let tagMatch;
  while (tagMatch = tagRegex.exec(xml)) {
    const tagName = tagMatch[1];
    if (tagName.includes('<') || tagName.includes('>')) {
      return true;
    }
  }
  // No injection detected
  return false;
}
// XSS Injection Function
// Create Blacklistusers details function

const CreateuserDetails = async (req, res, message, type) => {
  try {
    message = "malacios"
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    const response = await useCustomAxios(`http://ip-api.com/json/${ip}`)
    const { country, city, region } = response.data
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const d = new Date();

    const useragent = req.headers['user-agent']
    // // const result = detector.detect(useragent);
    // // const { client, os, device } = result

    const UserRawData = {
      ip,
      date: d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear(),
      time: d.toLocaleTimeString(),
      page: req.url,
      query: req.query || req.query || "",
      inputQuery: req.body || "",
      type,
      // browser: client.name + client.version || "",
      // browser_code: client.name || "",
      // os: os.name + os.version + os.platform || "",
      country: country || "",
      city: city || "",
      region: region || "",
      useragent,
      latitude: "",
      longitude: "",
      // device: device.type,
      domain: req.get('host'),
      referurl: req.protocol + '://' + req.get('host') + req.originalUrl || ""
    }
    const filter = { ip };
    const update = UserRawData;

    const finduser = await Project_Security_Logs.findOne(filter)
    if (finduser) {
      await Project_Security_Logs.findOneAndUpdate(filter, update)
      //  errorHandler(res, 406, message)
    } else if (!finduser) {
      await Project_Security_Logs.create(UserRawData)
      //  errorHandler(res, 406, message)
    }
  } catch (error) {
    console.error(error)
  }
}
const CreatStatusCodesDetails = async (ErrorStatuscode, message, url, domain, id, appid) => {
  try {
    const StatusCodeModels = require('../models/ServerErrorResponseCodes')
    const ResponseCodesLoginPageModels = require('../models/ResponseCodesLoginPageModels')
    const UserRawData = {
      ErrorStatuscode,
      message,
      domain, appid, user: mongoose.Types.ObjectId(id)
    }
    if (url.includes('/login') || url.includes('/signin')) {
      const finduser = await ResponseCodesLoginPageModels.findOne({ ErrorStatuscode, domain, user: mongoose.Types.ObjectId(id) })
      if (finduser) {
        console.log("already exist")
      } else {
        await ResponseCodesLoginPageModels.create(UserRawData)
      }
    } else {
      const finduser = await StatusCodeModels.findOne({ ErrorStatuscode, domain, user: mongoose.Types.ObjectId(id) })
      if (finduser) {
        console.log("already exist")
      } else {
        await StatusCodeModels.create(UserRawData)
      }
    }

  } catch (error) {
    console.error(error)
  }
}


// Sql Injection Function
function hasSqlInjection(value) {
  const sqlMeta = new RegExp('(%27)|(--)|(1=1)|(1 and 1=1)|(1 AND 1=1)|(or 1=1)|(OR 1=1)|(%23)|(#)', 'i');
  if (sqlMeta.test(value)) {
    return true;
  }
  const sqlMeta2 = new RegExp('((%3D)|(=))[^\n]*((%27)|(\')|(--)|(%3B)|(;))', 'i');
  if (sqlMeta2.test(value)) {
    return true;
  }
  const nestedQuery = new RegExp('((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))?[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))[^\n]*((\%3D)|(=))', 'i');
  if (nestedQuery.test(value)) {
    return true;
  }
  const timeBased = new RegExp('(\%3B)|(;)[^\n]*sleep\((\d+)\)[^\n]*', 'i');
  if (timeBased.test(value)) {
    return true;
  }
  const booleanBased = new RegExp('((\%3D)|(=))[^\n]*[^\s]*(\%27)|(\')|(\-\-)|(\%3B)|(;)', 'i');
  if (booleanBased.test(value)) {
    return true;
  }
  const typicalSql = new RegExp('w*((%27)|(\'))((%6F)|o|(%4F))((%72)|r|(%52))', 'i');
  if (typicalSql.test(value)) {
    return true;
  }
  const sqlUnion = new RegExp('((%27)|(\'))union', 'i');
  if (sqlUnion.test(value)) {
    return true;
  }
  const entireText = new RegExp('\b((select|delete|insert|update|drop|create|alter)\b.*)', 'i');
  if (entireText.test(value)) {
    return true;
  }
  return false;
}
// Co0mmandline Injection Function
function hasCommandLineInjection(value) {
  const commandMeta = new RegExp(
    "(rm -rf)|(ls -la)|(command >/dev/sda)|(:\\(\\){ :|:& };:)|(sudo yum install)|(.conf)|(sudo mv  /dev/null)|(wget)|(-O-)|(crontab -r)|(history)|(dd if=/dev/zero of=/dev/sda)|(/dev/sda)|(/dev/sda1)|(sudo apt purge python|python2|python3.x-minimal)|(chmod -R 777 /)",
    "i"
  );
  if (commandMeta.test(value)) {
    return true;
  }

  return false;
}
// HTML Injection Function
function hasHTMLnjection(value) {
  const HTML = new RegExp(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/, "g");
  if (HTML.test(value)) {
    return true;
  }

  return false;
}
// HTML Injection Function
function hasXSSnjection(value) {
  const XSS = /<script>/
  if (XSS.test(value)) {
    return true;
  }

  return false;
}
// Sql Injection middleware
async function isHashedPassword(password) {
  const md5Regex = /^[a-f0-9]{32}$/i;
  if (md5Regex.test(password)) {
    return { message: true, algorithmname: "md5" };
  }
  const sha1Regex = /^[a-f0-9]{40}$/i;
  if (sha1Regex.test(password)) {
    return { message: true, algorithmname: "sha-1" };
  }
  const sha256Regex = /^[a-f0-9]{64}$/i;
  if (sha256Regex.test(password)) {
    return { message: true, algorithmname: "sha-256" };
  }
  const sha512Regex = /^[a-f0-9]{128}$/i;
  if (sha512Regex.test(password)) {
    return { message: true, algorithmname: "sha-512" };
  }
  const bcryptRegex = /^\$2[ayb]\$.{56}$/i;
  if (bcryptRegex.test(password)) {
    return { message: true, algorithmname: "bcrypt" };
  }
  const sha384Regex = /^[a-f0-9]{96}$/;
  if (sha384Regex.test(password)) {
    return { message: true, algorithmname: "sha-384" };
  }
  const sha3_224Regex = /^[a-f0-9]{56}$/;
  if (sha3_224Regex.test(password)) {
    return { message: true, algorithmname: "sha-3224" };
  }
  const DES = /^[a-zA-Z0-9./]{13}$/
  if (DES.test(password)) {
    return { message: true, algorithmname: "DES" };
  }
  const fnv164Regex = /^[0-9a-f]{16}$/i;
  if (fnv164Regex.test(password)) {
    return { message: true, algorithmname: "fnv164Regex" };
  }



  return { message: false }
}
async function InjectionChecker(req) {
  entries = {
    ...req.body,
    ...req.query,
    ...req.params,
  }
  let containsSql = false
    , validateXss = false, validatehtml = false, containCommand = false;
  value = JSON.stringify(entries)
  if (hasSqlInjection(value) === true) {
    containsSql = true;
  }
  if (hasXSSnjection(value) === true) {
    validateXss = true;
  }
  if (hasHTMLnjection(value) === true) {
    validatehtml = true;
  }
  if (hasCommandLineInjection(value) === true) {
    containCommand = true;
  }
  return { containsSql, validateXss, validatehtml, containCommand }

}
async function checkForSensitiveInfoInBody(data, keysToMatch,passwordTestHashes) {
  try {
    let result = []
    let matchedData = null; // Initialize variable to store matched data
    const recursiveSearch = (currentData) => {
      if (typeof currentData === "object" && currentData !== null) {
        // If the current data is an object, recursively search its properties
        Object.entries(currentData).forEach(([key, value]) => {
          if (keysToMatch.includes(key) && value) {
            // If the current key matches one of the keys and the value is not falsy, set it as the matched data
            matchedData = key;
            result.push(matchedData)
          } else {
            recursiveSearch(value);
          }
        });
      }
    }

    recursiveSearch(data);
    console.log("result", result)
    return matchedData ;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function CheckJwttokenSecurity(req) {
  try {
    const authHeader = req.headers.authorization;
    let message;
    var [authType, token] = authHeader ? authHeader.split(" ") : "";
    switch (authType) {
      case !authHeader:

        break;
      case "Bearer":
        if (token) {
          message = "Authorization Token Passed in Barer Authentication area";
        }

        break;

      case "Basic":
        if (token) {
          message = "Authorization Token Passed in Basic Authentication area";

        }

        break;

      case "AWS":
        if (token) {
          message = "Authorization Token Passed in Aws Authentication area";

        }

        break;

      case "OAuth":
        if (token) {
          message = "Authorization Token Passed in OAuth Authentication area";

        }

        break;
      default:
        if (token) {
          message = "unknown authorization type";
        }

    }
    if (message) {
      const existingMessage = await TokenPassedArea.findOne();
      if (existingMessage) {
        await TokenPassedArea.findOneAndUpdate({}, { message });
      } else {
        await TokenPassedArea.create({ message });
      }
    }
  } catch (error) {

  }
}
async function CheckPasswordKeyText(data, keysToMatch,passwordhashlist) {
  
  try {
    let isHashedPassword = false; // Initialize variable to store matched data
    let ispassword = false
    const recursiveSearch = (currentData) => {
      if (typeof currentData === "object" && currentData !== null) {
        // If the current data is an object, recursively search its properties
        Object.entries(currentData).forEach(([key, value]) => {
          if (keysToMatch.includes(key) && value) {
            ispassword = true
            // If the current key matches one of the keys and the value is not falsy, set it as the matched data
            for (let i of passwordhashlist) {
              let regx =eval(i.regex)
              console.log("let check the password", regx.test(value),i.name)
              if (regx.test(value)) {
                isHashedPassword = true;
                break;
              }
            }
          } else {
            recursiveSearch(value);
          }
        });
      }
    }
    recursiveSearch(data);
    return { isHashedPassword, ispassword };
  } catch (error) {
    throw new Error(error.message);
  }
}
async function CheckAllDataIsEncrypted(data, keysToMatch,passwordhashlist) {
  try {
    const matchedData = []; // Initialize array to store matched data
    const recursiveSearch = (currentData) => {
      if (typeof currentData === "object" && currentData !== null) {
        // If the current data is an object, recursively search its properties
        Object.entries(currentData).forEach(([key, value]) => {
          if (keysToMatch.includes(key) && value) {
            // If the current key matches one of the keys and the value is not falsy
            const matchedItem = { key, value,encrypted:false };
            for (item of passwordhashlist){
              let regx =eval(item.regex)
              console.log("let check the password", regx.test(value),item.name)
              if(regx.test(value)){
                matchedItem["encrypted"] = true
                break;
              }
            }
            matchedData.push(matchedItem);
          } else {
            recursiveSearch(value);
          }
        });
      }
    }
    recursiveSearch(data);
    return matchedData;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  CreatStatusCodesDetails,
  hasSqlInjection,
  CreateuserDetails,
  checkForXMLInjection,
  isHashedPassword,
  hasCommandLineInjection,
  hasHTMLnjection,
  hasXSSnjection,
  InjectionChecker,
  CheckJwttokenSecurity,
  checkForSensitiveInfoInBody,
  CheckPasswordKeyText,CheckAllDataIsEncrypted
  // checkForSensitiveInfo
}