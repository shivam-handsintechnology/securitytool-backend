const { default: axios } = require("axios");
const VpnResponse = async (ip) => {
  try {
    await axios.get('https://internetdb.shodan.io/' + ip)
    return true

  } catch (e) {
    return false;
  }
};
VpnResponse('185.239.173.244').then((res) => console.log(res)).catch((e) => console.log(e))