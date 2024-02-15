const axios = require('axios');
const API_KEY = 'd55435107bbfb1235bdeb3457aa0cc7ca48ce7cba06aeb2fd8b3e8cc82096187'; 
const https=require('https')
// Function to make a request to the VirusTotal API and scan the domain for viruses
function scanDomain(domain) {
try {
    const timestamp = Math.floor(Date.now() / 1000);
    const url = `https://www.virustotal.com/vtapi/v2/domain/report?apikey=${API_KEY}&domain=${domain}&date=${timestamp}`;
    const options = {
      method: 'GET'
    };
    // Make the request
    const request = https.request(url, options, (response) => {
      const chunks = [];
  
      // Collect the response data in chunks
      response.on('data', (chunk) => {
        chunks.push(chunk);
      });
  
      // When the response is complete, concatenate the chunks into a single buffer
      response.on('end', () => {
        const buffer = Buffer.concat(chunks);
  
        // Parse the JSON response
        const result = JSON.parse(buffer.toString());
  
        if (result.response_code !== 1) {
          console.log(`The domain ${domain} could not be scanned.`);
          return;
        }
  
        if (result.detected_urls.length > 0) {
          console.log(`The domain ${domain} contains a virus!`);
          console.log(`The following URLs were detected as malicious:`);
          for (const url of result.detected_urls) {
            console.log(url.url);
          }
        } else {
          console.log(`The domain ${domain} is clean.`);
        }
      });
    });
  
    // Handle errors
    request.on('error', (error) => {
      console.error(error);
    });
  
    request.end();
} catch (error) {
    console.log(error)
}
}
async function checkDirectoryListing(url) {
  try {
    const response = await axios.get(`http://${url}/routes/index.js`);
    console.log(response.status)
    if (response.status === 200 && response.data.includes('Index of')) {
      console.log('Directory listing is enabled.');
    } else {
        scanDomain(url)
      console.log('Directory listing is disabled.');
    }
  } catch (error) {
    if(error?.response?.status>=400){
      scanDomain(url)
        console.log('Directory listing is disabled.');
    }
  }
}

// Usage example
checkDirectoryListing('lmpadmin.handsintechnology.in');
