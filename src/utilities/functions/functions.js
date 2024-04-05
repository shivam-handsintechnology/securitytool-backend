const dns = require("dns");
const { httpParameterPollutionModel } = require("../../models/httpParameterPollutionModel");
const { EmailVerifyModel } = require("../../models/sensitivekeywordsModel");
const { sensitiveinfoinbodyModel } = require("../../models/SensitiveInfoInBodyModel");
const { NodeVersionModel } = require("../../models/NodeVersionModel");
const CallEmailVerify = async (email, hostname) => {
  const existingMessage = await EmailVerifyModel.findOne(
    { email, hostname },
    { _id: 0, exist: true }
  );
  if (existingMessage) {
    // Handle matching hostname and sensitive key
    //console.log("Found existing");
  } else {
    await sensitiveinfoinbodyModel.create({
      email,
      hostname,
    });
    // Return success response for creating new data
  }
}
const checkDomainAvailability = async (domain) => {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, d) => {
      if (err && err.code === "ENOTFOUND") {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
const validatePassword = async (str = '') => {
  const { length: l } = str;
  const strArr = str.split('');
  if (l < 6 || l > 20) {
    return false;
  };
  const specialCharacters = '!@#$%^&*()-+';
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const checkWith = (char, set) => set.includes(char);
  const containsSpecialCharacter = strArr.some(char => checkWith(char, specialCharacters));
  const containsLowercase = strArr.some(char => checkWith(char, alphabets));
  const containsUppercase = strArr.some(char => checkWith(char, alphabets.toUpperCase()));
  const containsNumber = strArr.some(char => checkWith(char, numbers));

  return { containsSpecialCharacter, containsLowercase, containsUppercase, containsNumber }
};
const noHpp = async (appid) => {
  const existingMessage = await httpParameterPollutionModel.findOne({});
  if (existingMessage) {
    await httpParameterPollutionModel.findOneAndUpdate(
      { appid },
      { isPolluted: false }
    );
  } else {
    await httpParameterPollutionModel.create({ appid, isPolluted: false });
  }
}
const isHpp = async (appid) => {
  const existingMessage = await httpParameterPollutionModel.findOne({ appid });
  if (existingMessage) {
    await httpParameterPollutionModel.findOneAndUpdate(
      { appid },
      { isPolluted: true }
    );
  } else {
    await httpParameterPollutionModel.create({ appid, isPolluted: true });
  }
}
const Nodeversion = async (appid, version) => {
  const existingMessage = await NodeVersionModel.findOne({ appid });
  if (existingMessage) {
    const data = await NodeVersionModel.findOneAndUpdate(
      { appid },
      { version }
    );
    return data
  } else {
    const data = await NodeVersionModel.create({ appid, version });
    return data
  }
}
const hasArrayParameters = (params) => {
  for (const param in params) {
    if (Array.isArray(params[param])) {
      return true; // Array parameter found
    }
  }
  return false; // No array parameters found
}
const hasDuplicateParameters = (params) => {
  const seen = new Set();
  for (const param in params) {
    if (seen.has(param)) {
      return true; // Duplicate parameter found
    }
    seen.add(param);
  }
  return false; // No duplicate parameters found
}
const hashttpParametersPollutionavailable = async (params, appid) => {
  if (hasDuplicateParameters(params)) {
    return "Yes"
  } else {
    // await noHpp(appid)
    return "No"

  }
}
module.exports = {
  CallEmailVerify, checkDomainAvailability, hashttpParametersPollutionavailable, validatePassword, Nodeversion
}


