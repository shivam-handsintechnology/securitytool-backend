const { default: axios } = require("axios");
const VpnResponse = async (ip) => {
  try {
    await axios.get('https://internetdb.shodan.io/' + ip)
    return true

  } catch (e) {
    return false;
  }
};

module.exports = { VpnResponse }