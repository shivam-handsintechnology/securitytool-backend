const http = require('http');

// Function to test directory listing for a specific path
function testDirectoryListing(domain, path) {
    const url = `http://${domain}${path}`;

    http.get(url, (res) => {
        if (res.statusCode === 200) {
            console.log(`Directory listing enabled for ${url}`);
        } else if (res.statusCode === 403) {
            console.log(`Directory listing disabled for ${url}`);
        } else {
            console.log(`Unexpected status code ${res.statusCode} for ${url}`);
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
paths.forEach(path => {
    testDirectoryListing(domain, path);
});
