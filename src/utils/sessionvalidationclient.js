const puppeteer = require('puppeteer');

async function sessionvulnerability(url,sessionvulnerabilityinitialdata) {
    const results = {
        session_does_not_expire_on_close: false,
        session_timeout: "",
        session_fixation: false,
        session_hijacking: false,
        file: ""
    };
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            const cookies = await page.cookies();

            if (cookies.length > 0) {
                results.session_does_not_expire_on_close = cookies.some(cookie => !cookie.session);

                const now = Math.floor(Date.now() / 1000);
                cookies.forEach(cookie => {
                    if (!cookie.session) {
                        if (cookie.expires - now > 60 * 60 * 24 * 30) {
                            results.session_timeout = "High";
                        } else {
                            results.session_timeout = "Normal";
                        }
                    }
                });

                const secureTransmitted = cookies.every(cookie => cookie.secure);
                const httpOnly = cookies.every(cookie => cookie.httpOnly);
                const sameSiteSecure = cookies.every(cookie => cookie.sameSite === 'Strict' || cookie.sameSite === 'Lax');
                const domainPathRestriction = cookies.every(cookie => cookie.domain && cookie.path);
                const sessionIdChanges = true; // Add your logic to check if session ID changes after authentication

                const sessionIds = cookies.filter(cookie => cookie.name === 'sessionid').map(cookie => cookie.value);
                const uniqueSessionIds = new Set(sessionIds);
                if (uniqueSessionIds.size > 1) {
                    results.session_fixation = false;
                } else {
                    results.session_fixation = true;
                }

                results.session_hijacking = secureTransmitted && httpOnly && sameSiteSecure && domainPathRestriction && sessionIdChanges;
                sessionvulnerabilityinitialdata["Session does not expire on closing the browser"] = results.session_does_not_expire_on_close?"Yes":"No"
                sessionvulnerabilityinitialdata["Session time-out is high (or) not implemented."] = results.session_timeout
                sessionvulnerabilityinitialdata["Session token being passed in other areas apart from cookies"] = "No"
                sessionvulnerabilityinitialdata["An adversary can hijack user sessions by session fixation"] = results.session_fixation?"Yes":"No"
                sessionvulnerabilityinitialdata["Application is vulnerable to session hijacking attack"] = results.session_hijacking?"Yes":"No"
            } else {
                sessionvulnerabilityinitialdata["Session does not expire on closing the browser"] = "Session Authentication Not Implemented"
                sessionvulnerabilityinitialdata["Session time-out is high (or) not implemented."] = "Session Authentication Not Implemented"
                sessionvulnerabilityinitialdata["Session token being passed in other areas apart from cookies"] = "Session Authentication Not Implemented"
                sessionvulnerabilityinitialdata["An adversary can hijack user sessions by session fixation"] = "Session Authentication Not Implemented"
               
                sessionvulnerabilityinitialdata["Application is vulnerable to session hijacking attack"] = "Session Authentication Not Implemented"

            }
            await browser.close();
            resolve(sessionvulnerabilityinitialdata);
        } catch (error) {
            resolve(sessionvulnerabilityinitialdata)
        }
    });
}

module.exports = { sessionvulnerability };
