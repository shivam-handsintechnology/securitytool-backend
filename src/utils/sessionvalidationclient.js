
const puppeteer = require('puppeteer');
// Get all cookies from the browser session
// @param {string} url - The URL of the webpage where the cookies are stored
// @returns {Promise} - Promise object represents the cookies

async function getCookies(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            // Navigate to a webpage where the cookies are stored
            await page.goto(url);

            // Get all cookies from the browser session
            const cookies = await page.cookies();


            await browser.close();
            if (cookies.length === 0) {
                resolve({session_does_not_expire_on_close: false,
                         session_timeout: "",
                         session_fixation: false,
                         session_hijacking: false,
                         session_enabled: false,
                        })
            }
            else if (cookies.length > 0) {
                resolve({ cookies: cookies, error: false, message: "Cookies fetched successfully" })
            }
        } catch (error) {
            reject({ error: true, message: error.message })
        }
    })

}
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

const sessionvunurability = async (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await getCookies(url);
            if (data.error) {
                reject(data)
            } else if (!data.error && Object(data).hasOwnProperty("session_enabled")){
               resolve(data)
            } else if (!data.error && data.cookies.length > 0) {
                let sessionvulnurability = await scanSessionVulnerability(data.cookies)
                resolve(sessionvulnurability)
            }
        } catch (error) {
            reject(error)
        }
    })

}
module.exports = { sessionvunurability };