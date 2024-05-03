const { errorHandler } = require("../utils/errorHandler");
const  CryptoJS=require("crypto-js")
const SecretKey=process.env.SECREY_KEY
const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SecretKey).toString();
}
 const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, SecretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
module.exports = async function (req, res, next) {
  console.log("IncomingDataHashFormat",req.originalUrl)
  //  get queru params

  if(req.body.encryptData){
    req.body=await decryptData(req.body.encryptData)
  }
  return next();
}
module.exports.convertResponseDatatoEncryptedFormat=async(req,res,next)=>{
  const originalSend = res.json;
  // res.json = async function (body) {
  //   originalSend.call(res, encryptData(JSON.stringify({body:body})))
   
  // };
  next()
}

