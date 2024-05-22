const { isValidObjectId } = require('mongoose');
const Project_Security_Logs = require('.././models/Project_Security_Logs')
const { useCustomAxios } = require('../utilities/functions/fetchUrl');
let validator = require('validator')

const BcryptRegX = /^\$2[ayb]\$.{56}$/i
function checkHashedData(value, isHashedPassword) {
  console.log("bcrypt test", BcryptRegX.test(value))
  console.log("bcrypt test value", value)
  if (validator.isMD5(value)
    || BcryptRegX.test(value)
    || validator.isHash(value)
    || validator.isStrongPassword(value)
  ) {
    isHashedPassword = true;
  }

  return isHashedPassword;
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


async function checkForSensitiveInfoInBody(data, keysToMatch, passwordTestHashes) {
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
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}


async function CheckPasswordKeyText(data, keysToMatch, passwordhashlist) {

  try {
    let isHashedPassword = false; // Initialize variable to store matched data
    let ispassword = false
    const recursiveSearch = (currentData) => {
      if (typeof currentData === "object" && currentData !== null) {
        // If the current data is an object, recursively search its properties
        Object.entries(currentData).forEach(([key, value]) => {
          if (keysToMatch.includes(key) && value) {
            ispassword = true
            isHashedPassword = checkHashedData(value, isHashedPassword)
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
async function CheckAllDataIsEncrypted(data, keysToMatch, passwordhashlist) {
  try {
    const matchedData = []; // Initialize array to store matched data
    const recursiveSearch = (currentData) => {
      if (typeof currentData === "object" && currentData !== null) {
        // If the current data is an object, recursively search its properties
        Object.entries(currentData).forEach(([key, value]) => {
          if (keysToMatch.includes(key) && value) {
            // If the current key matches one of the keys and the value is not falsy
            const matchedItem = { key, value, encrypted: false };
            let encrypted = checkHashedData(value, data = false)
            matchedItem["encrypted"] = encrypted
            matchedData.push(matchedItem);

          }
          else {
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
// Define a function to check for CSS injection
function isObject(input) {
  return input !== null && typeof input === 'object' && !Array.isArray(input);
}


async function CheckAllSensitiveData(data) {
  try {
    const result = [];

    // Recursive function to check for sensitive data in nested objects or arrays
    function checkForSensitiveData(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(item => {
          if (typeof item === 'object' && item !== null) {
            // Check if the item is an object with a 'value' property
            if (item.hasOwnProperty('value')) {
              checkValue(item);
            } else {
              checkForSensitiveData(item); // Recursive call for nested objects or arrays
            }
          }
        });
      } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
              checkForSensitiveData(value); // Recursive call for nested objects or arrays
            } else if (typeof value === 'string') {
              checkValue({ key, value });
            }
          }
        }
      }
      return result;
    }

    // Helper function to check the value for sensitive data
    function checkValue(item) {
      const { key, value } = item;
      const sensitiveData = { Email: false, "JSON Web Token": false, ObjectId: false, PassportNumber: false, CreditCard: false, Password: false, PhoneNumber: false, };
      if (typeof value === 'string') {

        // Check if the value is a stringified JSON object
        if (isJsonString(value)) {
          const parsedValue = JSON.parse(value);
          checkForSensitiveData(parsedValue);
        } else {
          // Check if the value is a string containing sensitive data
          if (validator.isEmail(value)) {
            sensitiveData.Email = true;
          }
          if (validator.isJWT(value)) {
            sensitiveData["JSON Web Token"] = true;
          }
          if (isValidObjectId(value)) {
            sensitiveData.ObjectId = true;
          }

          if (validator.isCreditCard(value)) {
            sensitiveData.CreditCard = true;
          }
          if (validator.isStrongPassword(value)) {
            sensitiveData.Password = true;
          }
          if (validator.isMobilePhone(value)) {
            sensitiveData.PhoneNumber = true;
          }


        }
      }

      result.push({ key, value: sensitiveData });
    }

    // Helper function to check if a string is a valid JSON string
    function isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    }

    // Start checking for sensitive data
    return checkForSensitiveData(data);
  } catch (error) {
    console.log("Error in CheckAllSensitiveData", error)
    throw new Error(error.message);
  }
}

module.exports = {
  CreateuserDetails,
  checkForSensitiveInfoInBody, CheckAllSensitiveData,
  CheckPasswordKeyText, CheckAllDataIsEncrypted
  // checkForSensitiveInfo
}