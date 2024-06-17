const { default: axios } = require("axios");
const validator = require("validator")
const VpnResponse = async (ip) => {
  try {
    await axios.get('https://internetdb.shodan.io/' + ip)
    return true

  } catch (e) {
    return false;
  }
};
console.log(validator.isIPRange('206.84.234.63'))
// VpnResponse('185.253.96.178').then((res) => console.log(res)).catch((e) => console.log(e))