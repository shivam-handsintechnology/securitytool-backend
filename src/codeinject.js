const https = require('https');

const API_KEY = 'd55435107bbfb1235bdeb3457aa0cc7ca48ce7cba06aeb2fd8b3e8cc82096187'; // Replace with your VirusTotal API key
const domain = 'healthkart.com';

// Function to make a request to the VirusTotal API and scan the domain for viruses
// function scanDomain() {
//   const timestamp = Math.floor(Date.now() / 1000);
//   const url = `https://www.virustotal.com/vtapi/v2/domain/report?apikey=${API_KEY}&domain=${domain}&date=${timestamp}`;
//   const options = {
//     method: 'GET'
//   };
//   // Make the request
//   const request = https.request(url, options, (response) => {
//     const chunks = [];

//     // Collect the response data in chunks
//     response.on('data', (chunk) => {
//       chunks.push(chunk);
//     });

//     // When the response is complete, concatenate the chunks into a single buffer
//     response.on('end', () => {
//       const buffer = Buffer.concat(chunks);

//       // Parse the JSON response
//       const result = JSON.parse(buffer.toString());

//       if (result.response_code !== 1) {
//         console.log(`The domain ${domain} could not be scanned.`);
//         return;
//       }

//       if (result.detected_urls.length > 0) {
//         console.log(`The domain ${domain} contains a virus!`);
//         console.log(`The following URLs were detected as malicious:`);
//         for (const url of result.detected_urls) {
//           console.log(url.url);
//         }
//       } else {
//         console.log(`The domain ${domain} is clean.`);
//       }
//     });
//   });

//   // Handle errors
//   request.on('error', (error) => {
//     console.error(error);
//   });

//   request.end();
// }
// scanDomain()
const puppeteer = require('puppeteer');

async function runTest(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const metrics = await page.metrics();
  const requests = await page.evaluate(() => window.performance.getEntriesByType("resource").length);
  await browser.close();
  return { metrics, requests };
}
const GetMatrix=async()=>{
 const result=await   runTest("https://www.healthkart.com/")
 console.log(JSON.stringify(result.metrics))
 console.log(result.requests)
}
// GetMatrix()
const clamd = require('clamdjs');

const scanDomain = async (domain) => {
  const scanner = clamd.createScanner('127.0.0.1', 3310);
  const ip = await dnsLookup(domain);
  try {
    const result = await scanner.scanIp(ip);
    console.log(`Scan result for ${domain}: ${result}`);
  } catch (error) {
    console.error(`Error scanning ${domain}: ${error}`);
  } finally {
    scanner.close();
  }
};

const dnsLookup = async (domain) => {
  const { promisify } = require('util');
  const dns = require('dns');
  const lookup = promisify(dns.lookup);
  try {
    const { address } = await lookup(domain);
    return address;
  } catch (error) {
    console.error(`Error looking up IP address for ${domain}: ${error}`);
    return null;
  }
};

scanDomain('healthkart.com');
