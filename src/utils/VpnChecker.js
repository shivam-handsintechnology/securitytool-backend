const { fetchHttpsData } = require("../lib/fetchUrl");
  const VpnResponse = async (ip) => {
    try {
      const data = await fetchHttpsData('https://internetdb.shodan.io/' + ip);
      if (data.statusCode === 200) {
        return  true 
      } else if (data.statusCode === 404) {
        return  false 
      }
    } catch (e) {
      return  false ;
    }
  };
  
  module.exports={VpnResponse}