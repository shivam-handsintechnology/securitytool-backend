const { chromium } = require('playwright');
const cheerio = require('cheerio');
const moment = require('moment')
const tls = require('tls');
const { ignorePatterns, queryParams } = require("../data/json/ApplicationTestingData.json");
const SSLverifier = async (hostname) => {
    return new Promise((resolve, reject) => {
        try {
            const result = {};
            const options = {
                host: hostname,
                port: 443,
                rejectUnauthorized: false,
            };

            const socket = tls.connect(options, () => {
                const certificate = socket.getPeerCertificate();
                const negotiatedProtocol = socket.getProtocol();

                if (!certificate || !certificate.subject || !certificate.issuer) {
                    const { authorized, authorizationError } = socket;
                    if (!authorized && authorizationError) {
                        reject({ message: `Authorization error: ${authorizationError}` });
                    } else {
                        reject({ message: "Certificate information is incomplete" });
                    }
                    socket.end();
                    return;
                }

                const { subject, issuer, valid_from: validFrom, valid_to: validTo, fingerprint, serialNumber, subjectaltname: subjectAltName } = certificate;
                const valid = moment(validTo, 'MMM DD HH:mm:ss YYYY GMT');
                const currentDate = moment();

                try {
                    const s = JSON.stringify(subject);
                    const i = JSON.stringify(issuer);
                    if (s === i) {
                        result.self = 'Self-signed certificate detected';
                    } else {
                        result.self = 'Certificate is not self-signed';
                    }
                } catch (error) {
                    resolve({ message: "Invalid JSON" });
                    socket.end();
                    return;
                }

                if (valid.isBefore(currentDate)) {
                    result.valid = 'Certificate is not valid';
                    result.expired = 'Certificate has expired';
                } else {
                    result.valid = 'Certificate is valid';
                    result.expired = 'Certificate expires on ' + validTo;
                }

                if (negotiatedProtocol === 'TLSv1' || negotiatedProtocol === 'SSLv3') {
                    result.negotiatedProtocol = 'Obsolete SSL/TLS protocol detected';
                } else {
                    result.negotiatedProtocol = 'No obsolete SSL/TLS protocol detected';
                }

                fetch(`https://${hostname}`).then((res) => {
                    const setCookieHeader = res.headers.get('set-cookie');
                    if (setCookieHeader && !setCookieHeader.includes('Secure')) {
                        result.cookieSecureFlag = 'SSL Cookie without secure flag set';
                    } else {
                        result.cookieSecureFlag = 'SSL Cookie secure flag is set';
                    }
                    resolve(result);
                    socket.end();
                }).catch((error) => {
                    reject(error);
                    socket.end();
                });
            });

            socket.on('error', (error) => {
                if (error.code === 'ENOTFOUND') {
                    reject({ message: "Domain Not Found" });
                }
                reject(error);
                socket.end();
            });
        } catch (error) {
            reject(error);
        }
    });
};
function containsQueryParams(url) {
    return queryParams.some(param => url.includes(param));
}
const withRetry = async (fn, retries = 3) => {
    let attempt = 0;
    while (attempt < retries) {
        try {
            return await fn();
        } catch (error) {
            if (error.name === 'TimeoutError') {
                attempt++;
                if (attempt === retries) {
                    throw error;
                }
                console.log(`Retry attempt ${attempt} after timeout error`);
            } else {
                throw error;
            }
        }
    }
};
function shouldIgnoreURL(url) {
    return ignorePatterns.some(pattern => url.includes(pattern));
}
async function scrapWebsite(url, res, sendEvent, visited = new Set(), isFirstPage = true) {
    try {
        if (visited.has(url)) {
            return visited;
        }

        const startTime = new Date();

        sendEvent({ message: `Crawling  ${url}`, time: Date.now() }, res);
        visited.add(url);

        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            // wait for 2 seconds
            await withRetry(async () => {
                await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
            });

            await withRetry(async () => {
                await page.waitForLoadState('networkidle', { timeout: 60000 });
            });
        } catch (error) {
            console.log(`Failed to load ${url} after multiple attempts:`, error);
            await browser.close();
            return visited;
        }
        const uniqueLinks = new Set();
        const baseUrl = new URL(url);

        const hrefs = await page.$$eval('a[href]', links => links.map(link => link.getAttribute('href')));

        hrefs.forEach(href => {
            if (href && !href.includes('http') && href.trim().length > 0) {

                const parsedUrl = new URL(href, baseUrl);
                if (parsedUrl.hostname === baseUrl.hostname && !(isFirstPage && parsedUrl.pathname === '/')) {
                    let testurl = parsedUrl.href;
                    if (!shouldIgnoreURL(testurl)) {
                        uniqueLinks.add(testurl)
                    }
                }
            }
        });

        await browser.close();

        const endTime = new Date();
        const timeElapsed = (endTime - startTime) / 1000;
        sendEvent({ message: `Crawling ${url} complete. Time elapsed: ${timeElapsed} seconds`, time: Date.now() }, res);

        // Recursively scrap each unique link
        for (const link of uniqueLinks) {
            let testurl = link;

            if (!shouldIgnoreURL(testurl)) {
                await scrapWebsite(link, res, sendEvent, visited, false);
            }

        }

        return visited;
    } catch (error) {
        console.log('Error occurred:', error);
        throw new Error(error);
    }
}
const fillInputField = async (page, selector, value) => {
    const inputs = await page.$$(selector);
    for (const input of inputs) {
        await input.fill(value);
    }
    return Promise.resolve();
}


async function fillInputFields(page, username, password, email) {
    try {
        const dateNow = new Date().toISOString().split('T')[0];

        // Handle checkboxes and radio buttons
        let checkbox = await page.$('input[type="checkbox"]');
        if (checkbox) await checkbox.click();
        let radio = await page.$('input[type="radio"]');
        if (radio) await radio.click();

        // Fill input fields
        if (username) await fillInputField(page, 'input[type="text"]', username);
        if (email) await fillInputField(page, 'input[type="email"]', email);
        await fillInputField(page, 'input[type="number"]', Date.now().toString());
        await fillInputField(page, 'input[type="date"]', dateNow);
        if (password) await fillInputField(page, 'input[type="password"]', password);
        await fillInputField(page, 'input[name="date"]', dateNow);

        // Handle buttons
        const buttonTypeSubmit = await page.$('button[type="submit"]');
        const buttonTypeButton = await page.$('button[type="button"]');
        const inputTypeSubmit = await page.$('input[type="submit"]');

        if (buttonTypeSubmit) {
            await buttonTypeSubmit.click();
            await page.waitForTimeout(2000);
        } else if (inputTypeSubmit) {
            await inputTypeSubmit.click();
            await page.waitForTimeout(2000);
        } else if (buttonTypeButton) {
            await buttonTypeButton.click();
            await page.waitForTimeout(2000);
        }

        // Handle CAPTCHA (pseudo-implementation)
        const captchaInput = await page.$('input[aria-label*="captcha"], input[name*="captcha"], input[id*="captcha"]');
        if (captchaInput) {
            // Placeholder for captcha solving logic
            const captchaImage = await page.$('img[alt="captcha"], img[src*="captcha"]');
            if (captchaImage) {
                const captchaSrc = await captchaImage.getAttribute('src');
                const captchaSolution = await solveCaptcha(captchaSrc); // External CAPTCHA solving service
                await captchaInput.fill(captchaSolution);
            }
        }

        // Handle Google reCAPTCHA (pseudo-implementation)
        const recaptcha = await page.$('.g-recaptcha');
        if (recaptcha) {
            // You need to use an external service for solving reCAPTCHA
            const recaptchaSolution = await solveRecaptcha(page.url());
            // Implement the logic to fill the reCAPTCHA response token
            await page.evaluate(`document.getElementById('g-recaptcha-response').value='${recaptchaSolution}'`);
        }

    } catch (error) {
        console.error('Error occurred:', error);
    }
}
// async function fillInputFields(page, username, password, email) {
//     try {
//         const dateNow = new Date().toISOString().split('T')[0];
//         const catchanResolver = 'catcha resolver'; // Replace with the desired value

//         // Fill input fields based on type
//         const inputFields = await page.$$eval('input', inputs => inputs.map(input => ({
//             type: input.type,
//             name: input.name,
//             attributes: [...input.attributes].map(attr => [attr.name, attr.value]).reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
//         })));

//         for (const field of inputFields) {
//             const { type, name, attributes } = field;
//             const includesCatchan = Object.values(attributes).some(value => value?.toLowerCase().includes('captcha'));

//             switch (type) {
//                 case 'text':
//                     if (username && !includesCatchan) await fillInputField(page, `input[name="${type}"]`, username);
//                     break;
//                 case 'email':
//                     if (email && !includesCatchan) await fillInputField(page, `input[name="${type}"]`, email);
//                     break;
//                 case 'number':
//                     !includesCatchan && await fillInputField(page, `input[name="${type}"]`, Date.now());
//                     break;
//                 case 'date':
//                     await fillInputField(page, `input[name="${type}"]`, dateNow);
//                     break;
//                 case 'password':
//                     if (password && !includesCatchan) await fillInputField(page, `input[name="${type}"]`, password);
//                     break;
//                 default:
//                     if (includesCatchan) await fillInputField(page, `input[name="${type}"]`, catchanResolver);
//                     break;
//             }
//         }

//         let buttonTypeSubmit = await page.$('button[type="submit"]');
//         let buttonTypeButton = await page.$('button[type="button"]');
//         let inputTypeSubmit = await page.$('input[type="submit"]');
//         if (buttonTypeSubmit) {
//             await buttonTypeSubmit.click();
//         } else if (inputTypeSubmit) {
//             await inputTypeSubmit.click();
//         } else if (buttonTypeButton) {
//             await buttonTypeButton.click();
//         }
//     } catch (error) {
//         console.error('Error occurred:', error);
//     }
// }
async function fillInputFieldsBlackPassword(page) {
    try {
        let username = Math.random().toString(36).substring(7);
        let email = Math.random().toString(36).substring(7) + '@example.com';
        // Fill input fields based on type
        await fillInputField(page, 'input[type="text"]', username);
        await fillInputField(page, 'input[type="email"]', email);
        await fillInputField(page, 'input[type="number"]', Date.now());
        await fillInputField(page, 'input[type="date"]', new Date().toISOString().split('T')[0]);
        await fillInputField(page, 'input[type="password"]', '');
        await fillInputField(page, 'input[name="date"]', new Date().toISOString().split('T')[0]);
        let buttonTypeSubmit = await page.$('button[type="submit"]')
        let buttonTypeButton = await page.$('button[type="button"]')
        let inputTypeSubmit = await page.$('input[type="submit"]')
        if (buttonTypeSubmit) {
            await buttonTypeSubmit.click();
            await page.waitForTimeout(2000);
        }

        else if (inputTypeSubmit) {
            await inputTypeSubmit.click();
            await page.waitForTimeout(2000);
        }

        else if (buttonTypeButton) {
            await buttonTypeButton.click();
            await page.waitForTimeout(2000);
        }


    } catch (error) {
        console.error('Error occurred:', error);
    }
}
async function takeScreenshot(page) {
    const screenshot = await page.screenshot({ fullPage: true });
    return Buffer.from(screenshot).toString('base64');
}
function extractVisibleText(html) {
    const $ = cheerio.load(html);
    return $('body').text();
}
const CronJobVIdeoDelete = async () => {
    // Delete All Videos after 2AM
    const fs = require('fs');
    const path = require('path');
    const dir = path.join(__dirname, '../../videos');
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            // delete old videos lestt then half and hour hours
            if (fs.statSync(filePath).ctime < new Date(Date.now() - 30 * 60 * 1000)) {
                fs.unlinkSync(filePath);
            } else {
                console.log("No Video Found")
            }
        }
        );
    } catch (error) {
        console.log(error);
    }
}
const OtpGenerator = () => {
    return Math.floor(100000 + Math.random() * 900000);
}
const HostnameAppIDGetter = async (origin) => {
    return new Promise(async (resolve, reject) => {
        // Launch browser
        const browser = await chromium.launch({ headless: true });
        try {

            const context = await browser.newContext();
            const page = await context.newPage();
            // Navigate to the page
            await page.goto(origin);
            // Capture values from the client-side script
            const appid = await page.evaluate(() => window.appid);
            const hostname = await page.evaluate(() => window.location.hostname);
            console.log(`App ID: ${appid}, Hostname: ${hostname}`);
            resolve({
                appid: appid,
                hostname: hostname
            })


            // Close browser

        } catch (error) {
            reject(error)
        } finally {
            await browser.close();
        }
    })
}
module.exports = {
    scrapWebsite, extractVisibleText, withRetry, CronJobVIdeoDelete, SSLverifier, OtpGenerator, HostnameAppIDGetter,
    fillInputFields, takeScreenshot, fillInputFieldsBlackPassword, shouldIgnoreURL, containsQueryParams
}