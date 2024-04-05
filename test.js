const http = require('http');
// Function to test directory listing for a specific path
function testDirectoryListing(domain, path) {
    const url = `http://${domain}${path}`;

    http.get(url, (res) => {
        if (res.statusCode === 200) {
            //console.log(`Directory listing enabled for ${url}`);
        } else if (res.statusCode === 403) {
            //console.log(`Directory listing disabled for ${url}`);
        } else {
            //console.log(`Unexpected status code ${res.statusCode} for ${url}`);
        }
    }).on('error', (err) => {
        console.error(`Error accessing ${url}:`, err);
    });
}

// Define the domain to scan
const domain = 'example.com';

// Define the paths to test
const paths = [
    '/',
    '/somepath',
    '/anotherpath',
    // Add more paths to test as needed
];

// Test directory listing for each path
// paths.forEach(path => {
//     testDirectoryListing(domain, path);
// });

const axios = require('axios');
const cheerio = require('cheerio');
const { sensitivedata } = require('./src/sensitive/availableapikeys');

async function findFrameworks(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        // sensitive infiormation
        const sensitiveinformationexist = []
        // Framework detection logic
        const frameworks = [];

        // Check for presence of React
        if ($('[data-reactroot]').length > 0 || $('[id="root"]').length > 0) {
            frameworks.push('React');
        }

        // Check for presence of Vue
        if ($('[data-v-]').length > 0) {
            frameworks.push('Vue');
        }

        // Check for presence of Angular
        if ($('[ng-app]').length > 0 || $('[ng-version]').length > 0) {
            frameworks.push('Angular');
        }

        // Check for presence of Next.js
        if ($('meta[name="next-head-count"]').length > 0 || $('[data-next-root]').length > 0) {
            frameworks.push('Next.js');
        }

        // Add checks for other frameworks

        if (frameworks.length === 0) {
            //console.log('No frameworks detected.');
        }
         else {
            //   get js file where bundle is located
            let scripts = $('script').map((i, el) => $(el).attr('src')).get()
          let testingalljsfiles= async()=>{
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].includes('/assets') || scripts[i].includes('/static') && !scripts[i].includes('http')){
                    if (scripts[i].includes('.js') ) {
                        console.log(url+scripts[i])
                        await fetch(url+scripts[i])
                             .then(response => response.text())
                             .then(data => {
                                 sensitivedata.forEach((sensitive) => {
                                     // find when in query sensitive field available
                                     if (data.includes(`${sensitive}=`)) {
                                         sensitiveinformationexist.push(sensitive)
                                     }
                                 })
                             })
                     }
                }
               
            }
            return sensitiveinformationexist
          }
          let AllPromise=await testingalljsfiles()
        return {AllPromise, frameworks};
        }

    } catch (error) {
        console.error('Error fetching or parsing the web app:', error);
    }
}

// Example usage
// findFrameworks('https://lmpfrontend.handsintechnology.in').then(({ AllPromise, frameworks }) => {
//     if (AllPromise.length > 0) {
//         console.log('Sensitive information found in the following files:', AllPromise);
//     } else {
//         console.log('No sensitive information found in the JavaScript files.');
//     }
//     console.log('Detected frameworks:', frameworks);
// }); 

const url = 'http://example.com/';
const traversalSequences = ['../../../etc/passwd', '%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd',"../"];

async function checkDirectoryTraversal() {
  for (const sequence of traversalSequences) {
    try {
      const response = await axios.get(`${url}?file=${sequence}`);
      console.log(`Status Code: ${response.status}`);
      console.log(`Response Data: ${response.data}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

checkDirectoryTraversal();


