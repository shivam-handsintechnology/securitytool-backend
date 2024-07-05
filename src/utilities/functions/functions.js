const dns = require("dns");

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
const hashttpParametersPollutionavailable = async (params) => {
  if (hasDuplicateParameters(params)) {
    return "Yes"
  } else {
    // await noHpp(appid)
    return "No"

  }
}
module.exports = {
  checkDomainAvailability, hashttpParametersPollutionavailable, validatePassword
}


