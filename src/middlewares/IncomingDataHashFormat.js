
const CryptoJS = require("crypto-js");
const SecretKey = process.env.SECREY_KEY; // Correct the typo here: SECREY_KEY to SECRET_KEY
const skipAPiurl = ["/protection", "/createuserdetails", "/sensitivekeysinurl"];
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SecretKey).toString();
}

const decryptData = (data) => {
  console.log("SecretKey", SecretKey);
  console.log(typeof data, "typeof data"); // Log the type of data
  const bytes = CryptoJS.AES.decrypt(data, SecretKey);
  try {
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decrypted, "Decrypted data"); // Log the decrypted data
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption failed: ", error.message); // Log error details
    throw new Error("Invalid Data");
  }
}

module.exports = async function (req, res, next) {
  console.log("IncomingDataHashFormat", req.originalUrl);

  try {
    if (skipAPiurl.includes(req.originalUrl)) {
      return next();
    }
    if (Object.keys(req.body).length > 0) {
      // if (!req.body.encryptData) {
      //   return res.status(403).json({ message: "Access Deied" });
      // }
      if (req.body.encryptData) {
        console.log("Decrypting body data");
        req.body = await decryptData(req.body.encryptData);
      }
    }
    if (Object.keys(req.query).length > 0) {
      // if (!req.query.data) {
      //   return res.status(403).json({ message: "Access Deied" });
      // }
      if (req.query.data) {
        let { data } = req.query;
        if (data) {
          try {
            data = JSON.parse(data);
            await Promise.all(Object.keys(data).map(async (key) => {
              console.log("Decrypting query data: ", key, data[key])
              req.query[decryptData(key)] = decryptData(data[key]);
            }));

          } catch (error) {
            return res.status(400).json({ message: "Invalid encrypted data format" });
          }
        }
      }
    }


  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return next();
}

module.exports.decryptData = decryptData;
module.exports.encryptData = encryptData;
