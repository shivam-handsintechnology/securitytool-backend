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
        const queryParams = sensitivedata;
        // Construct regex pattern to match any of the specified query parameters
        const regexPattern = new RegExp(`[?&](${queryParams.join('|')})=([^&]+)`, 'g');
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        // sensitive information
        const sensitiveInformationExist = [];
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
        
        // get js file where bundle is located
        let scripts = $('script').map((i, el) => $(el).attr('src')).get();
        let testingalljsfiles = async () => {
            const uniqueParams = new Set(); // To store unique query parameters

            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].includes('.js')) {
                    console.log(scripts[i]);
                    const jsResponse = await fetch(`${url}/${scripts[i]}`);
                    const jsData = await jsResponse.text();
                    const lines = jsData.split('\n');

                    for (const line of lines) {
                        let matches;
                        while ((matches = regexPattern.exec(line)) !== null) {
                            const param = matches[1];
                            if (uniqueParams.has(param)) {
                                sensitiveInformationExist.push(param);
                            } else {
                                uniqueParams.add(param);
                            }
                        }
                    }
                }
            }
            return sensitiveInformationExist;
        };
        
        const vulnurability = await testingalljsfiles();
        return { vulnurability, frameworks };

    } catch (error) {
        console.error('Error fetching or parsing the web app:', error);
    }
}


// Example usage
findFrameworks('http://localhost:3000');



