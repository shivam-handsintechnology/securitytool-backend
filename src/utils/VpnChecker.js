const { default: axios } = require("axios");
const VpnResponse = async (ip) => {
  return new Promise(async (resolve, reject) => {
    try {
      await axios.get('https://internetdb.shodan.io/' + ip)
      resolve(true)

    } catch (e) {
      console.log(e)
      reject(false)
    }
  })
};

module.exports = { VpnResponse }