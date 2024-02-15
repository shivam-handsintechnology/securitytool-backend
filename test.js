const { hasRobotsTxt } = require("./src/utils/functions");

(async () => {
    const axios = require('axios');
  
    try {
      const response = await axios.get('http://lmpapi.handsintechnology.in/');
      console.log(response.request.protocol.replace(':',""));
      console.log(response.request.res.httpVersion);
    } catch (error) {
      console.log(error.request.protocol.replace(':',""));
      console.log(error.request.res.httpVersion);
      console.log('Error:', error.message);
    }
  })();
  
