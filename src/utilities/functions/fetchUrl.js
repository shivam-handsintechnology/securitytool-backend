const url = require('url');
const https = require('https');
const http=require('http')
function parseUrl(urlString) {
    const parsedUrl = new URL(urlString);
    return {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
    };
  }
  async function useCustomAxios(url, options = {}) {
    return new Promise((resolve, reject) => {
      const req = http.request(url, options, (res) => {
        let data = '';
  
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        res.on('end', () => {
         
          resolve({data:JSON.parse(data)});
        });
      });
  
      req.on('error', (error) => {
        reject(error);
      });
  
      req.end();
    });
  }
  async function fetchHttpsData(url) {
    return new Promise((resolve, reject) => {
      const request = https.get(url, (response) => {
        let data = '';
  
        response.on('data', (chunk) => {
          data += chunk;
        });
  
        response.on('end', () => {
            const responseData = {
                statusCode: response.statusCode,
                data: JSON.parse(data)
              };
              resolve(responseData);
        });
      });
  
      request.on('error', (error) => {
        reject(error);
      });
    });
  }
  module.exports={useCustomAxios,fetchHttpsData}