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
// paths.forEach(path => {
//     testDirectoryListing(domain, path);
// });
// 
const puppeteer = require('puppeteer');

async function getCookies() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = window.location

    // Navigate to a webpage where the cookies are stored
    await page.goto('https://www.c3xpress.com');

    // Get all cookies from the browser session
    const cookies = await page.cookies();

    // Print the cookies
    console.log(cookies);

    await browser.close();
}
// getCookies();
const cookies = [
    {
        name: '_fbp',
        value: 'fb.1.1710833874012.1433916463',
        domain: '.c3xpress.com',
        path: '/',
        expires: 1718609874,
        size: 33,
        httpOnly: false,
        secure: false,
        session: false,
        sameSite: 'Lax',
        priority: 'Medium',
        sameParty: false,
        sourceScheme: 'Secure'
    },
    {
        name: '_ga_MST41ZD5FT',
        value: 'GS1.1.1710833873.1.0.1710833873.0.0.116622274',
        domain: '.c3xpress.com',
        path: '/',
        expires: 1745393873.455833,
        size: 59,
        httpOnly: false,
        secure: false,
        session: false,
        priority: 'Medium',
        sameParty: false,
        sourceScheme: 'Secure'
    },
    {
        name: '_ga',
        value: 'GA1.1.1267382486.1710833873',
        domain: '.c3xpress.com',
        path: '/',
        expires: 1745393873.385038,
        size: 30,
        httpOnly: false,
        secure: false,
        session: false,
        priority: 'Medium',
        sameParty: false,
        sourceScheme: 'Secure'
    },
    {
        name: '_gcl_au',
        value: '1.1.1643812785.1710833872',
        domain: '.c3xpress.com',
        path: '/',
        expires: 1718609871,
        size: 32,
        httpOnly: false,
        secure: false,
        session: false,
        priority: 'Medium',
        sameParty: false,
        sourceScheme: 'Secure'
    }
]
async function scanSessionVulnerability(cookies) {
    const results = {
        session_does_not_expire_on_close: false,
        session_timeout: "",
        session_fixation: false,
        session_hijacking: false,
        file: "" // No file provided as this is for browser-side analysis
    };

    // Check if the session does not expire on closing the browser
    results.session_does_not_expire_on_close = cookies.some(cookie => !cookie.session);

    // Check session timeout
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    cookies.forEach(cookie => {
        if (!cookie.session) {
            // Session cookie detected
            if (cookie.expires - now > 60 * 60 * 24 * 30) {
                results.session_timeout = "High"; // More than 30 days expiration time
            } else {
                results.session_timeout = "Normal"; // Less than 30 days expiration time
            }
        }
    });

    const secureTransmitted = cookies.every(cookie => cookie.secure);
    const httpOnly = cookies.every(cookie => cookie.httpOnly);
    const sameSiteSecure = cookies.every(cookie => cookie.sameSite === 'Strict' || cookie.sameSite === 'Lax');
    const domainPathRestriction = cookies.every(cookie => cookie.domain && cookie.path);
    const sessionIdChanges = /* Add your logic to check if session ID changes after authentication */ true; // Example logic
    // Check for session fixation
    const sessionIds = cookies.filter(cookie => cookie.name === 'sessionid').map(cookie => cookie.value);
    const uniqueSessionIds = new Set(sessionIds);
    if (uniqueSessionIds.size > 1) {
        // Session identifier changes, indicating protection against session fixation
        results.session_fixation = false;
    } else {
        // Session identifier remains constant, indicating session fixation vulnerability
        results.session_fixation = true;
    }

    results.session_hijacking = secureTransmitted && httpOnly && sameSiteSecure && domainPathRestriction && sessionIdChanges;

    return results;
}
(async () => {
    let data = await scanSessionVulnerability(cookies)
    console.log(data)
})()

