const { verify } = require('email-verify-security');
const { promisify } = require('util');

const verifierAsync = promisify(verify);

async function verifyEmail(email) {
  return new Promise(async(resolve,reject)=>{
    try {
      const info = await verifierAsync(email);
      return resolve(info.success)
    
  } catch (err) {
     reject(err)
  }
  })
}

module.exports=verifyEmail