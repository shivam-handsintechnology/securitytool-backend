const { chromium } = require('playwright');
const cheerio = require('cheerio');
const moment = require('moment')
const validator = require('validator');
const tls = require('tls');
const dns = require("dns");
const { ignorePatterns, queryParams } = require("../data/json/ApplicationTestingData.json");
const BcryptRegX = /^\$2[ayb]\$.{56}$/i
const checkDomainAvailability = async (domain) => {
    return new Promise((resolve, reject) => {
        dns.lookup(domain, (err, d) => {
            if (err && err.code === "ENOTFOUND") {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}
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

                const { subject, issuer, valid_to: validTo } = certificate;
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
                    resolve({ message: "Invalid JSON", error: error });
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

// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
const extractRootDomain = (url) => {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const parts = hostname.split('.').filter(Boolean); // Split and filter out empty strings
    const length = parts.length;

    // If the length of the parts array is less than 2, return the hostname itself
    if (length < 2) {
        return hostname;
    }

    // Extract the domain and TLD (Top-Level Domain)
    const domain = parts[length - 2];
    const tld = parts[length - 1];
    return `${domain}.${tld}`;
};

function decodeJWT(token) {

    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        // const iat = payload.iat ? new Date(payload.iat * 1000) : null;
        // const exp = payload.exp ? new Date(payload.exp * 1000) : null;
        const totalexpiretime = payload.exp ? payload.exp - payload.iat : null;

        return totalexpiretime

    } catch (error) {
        if (error) return null

    }

}

const findJwtToken = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const findToken = (data) => {
                if (typeof data === 'string') {
                    if (validator.isJWT(data)) {
                        resolve(decodeJWT(data));
                    }
                } else if (Array.isArray(data)) {
                    for (const element of data) {
                        const result = findToken(element);
                        if (result) {
                            resolve(result);
                        }
                    }
                } else if (typeof data === 'object' && data !== null) {
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const result = findToken(data[key]);
                            if (result) {
                                resolve(result);
                            }
                        }
                    }
                }
            };

            const token = findToken(data);
            if (!token) {
                resolve(null); // Resolve with null if no JWT token is found
            }
        } catch (error) {
            reject(error)
        }
    });
};

const validatePassword = async (str = '') => {
    const { length: l } = str;
    const strArr = str.split('');
    if (l < 6 || l > 20) {
        return false;
    };
    const specialCharacters = '!@#$%^&*()-+';
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const checkWith = (char, set) => set.includes(char);
    const containsSpecialCharacter = strArr.some(char => checkWith(char, specialCharacters));
    const containsLowercase = strArr.some(char => checkWith(char, alphabets));
    const containsUppercase = strArr.some(char => checkWith(char, alphabets.toUpperCase()));
    const containsNumber = strArr.some(char => checkWith(char, numbers));

    return { containsSpecialCharacter, containsLowercase, containsUppercase, containsNumber }
};
async function sendEmail(to, subject, text) {
    const nodemailer = require('nodemailer');
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth
            : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw new Error(error)
        } else {
            return "Email Sent" + info.response
        }
    });
}


function checkHashedData(value, isHashedPassword) {
    console.log("bcrypt test", BcryptRegX.test(value))
    console.log("bcrypt test value", value)
    if (validator.isMD5(value)
        || BcryptRegX.test(value)
        || validator.isHash(value)
        || validator.isStrongPassword(value)
    ) {
        isHashedPassword = true;
    }

    return isHashedPassword;
}

async function checkForSensitiveInfoInBody(data, keysToMatch) {
    try {
        let result = []
        let matchedData = null; // Initialize variable to store matched data
        const recursiveSearch = (currentData) => {
            if (typeof currentData === "object" && currentData !== null) {
                // If the current data is an object, recursively search its properties
                Object.entries(currentData).forEach(([key, value]) => {
                    if (keysToMatch.includes(key) && value) {
                        // If the current key matches one of the keys and the value is not falsy, set it as the matched data
                        matchedData = key;
                        result.push(matchedData)
                    } else {
                        recursiveSearch(value);
                    }
                });
            }
        }

        recursiveSearch(data);
        console.log("result", result)
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}


async function CheckPasswordKeyText(data, keysToMatch) {

    try {
        let isHashedPassword = false; // Initialize variable to store matched data
        let ispassword = false
        const recursiveSearch = (currentData) => {
            if (typeof currentData === "object" && currentData !== null) {
                // If the current data is an object, recursively search its properties
                Object.entries(currentData).forEach(([key, value]) => {
                    if (keysToMatch.includes(key) && value) {
                        ispassword = true
                        isHashedPassword = checkHashedData(value, isHashedPassword)
                    } else {
                        recursiveSearch(value);
                    }
                });
            }
        }
        recursiveSearch(data);
        return { isHashedPassword, ispassword };
    } catch (error) {
        throw new Error(error.message);
    }
}
async function CheckAllDataIsEncrypted(data, keysToMatch) {
    try {
        const matchedData = []; // Initialize array to store matched data
        const recursiveSearch = (currentData) => {
            if (typeof currentData === "object" && currentData !== null) {
                // If the current data is an object, recursively search its properties
                Object.entries(currentData).forEach(([key, value]) => {
                    if (keysToMatch.includes(key) && value) {
                        // If the current key matches one of the keys and the value is not falsy
                        const matchedItem = { key, value, encrypted: false };
                        let encrypted = checkHashedData(value, data = false)
                        matchedItem["encrypted"] = encrypted
                        matchedData.push(matchedItem);

                    }
                    else {
                        recursiveSearch(value);
                    }
                });
            }
        }
        recursiveSearch(data);
        return matchedData;
    } catch (error) {
        throw new Error(error.message);
    }
}
// Define a function to check for CSS injection
const CheckAllSensitiveData = async (data) => {
    try {
        const result = [];

        const checkForSensitiveData = (obj) => {
            if (Array.isArray(obj)) {
                obj.forEach(item => {
                    if (typeof item === 'object' && item !== null) {
                        if (item.hasOwnProperty('value')) {
                            checkValue(item);
                        } else {
                            checkForSensitiveData(item);
                        }
                    }
                });
            } else if (typeof obj === 'object' && obj !== null) {
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        const value = obj[key];
                        if (typeof value === 'object' && value !== null) {
                            checkForSensitiveData(value);
                        } else if (typeof value === 'string') {
                            checkValue({ key, value });
                        }
                    }
                }
            }
            return result;
        };

        const checkValue = (item) => {
            let { key, value } = item;

            const sensitiveData = {
                Email: { id: false, data: value },
                "JSON Web Token": { id: false, data: value },
                ObjectId: { id: false, data: value },
                PassportNumber: { id: false, data: value },
                CreditCard: { id: false, data: value },
                Password: { id: false, data: value },
                PhoneNumber: { id: false, data: value },
                UUID: { id: false, data: value }
            };

            value = value.replace(/^"|"$/g, '').replace(/^'|'$/g, '');

            if (isJsonString(value)) {
                const parsedValue = JSON.parse(value);
                checkForSensitiveData(parsedValue);
            } else {
                if (validator.isEmail(value)) {
                    sensitiveData.Email.id = true;
                } else if (validator.isJWT(value)) {
                    sensitiveData["JSON Web Token"].id = true;
                } else if (validator.isMongoId(value)) {
                    sensitiveData.ObjectId.id = true;
                } else if (validator.isCreditCard(value)) {
                    sensitiveData.CreditCard.id = true;
                } else if (validator.isStrongPassword(value)) {
                    sensitiveData.Password.id = true;
                } else if (validator.isMobilePhone(value)) {
                    sensitiveData.PhoneNumber.id = true;
                } else if (validator.isUUID(value)) {
                    sensitiveData.UUID.id = true;
                }
            }

            result.push({ key, value: sensitiveData });
        };

        const isJsonString = (str) => {
            try {
                JSON.parse(str);
            } catch (e) {
                if (e) return false;
            }
            return true;
        };

        return checkForSensitiveData(data);
    } catch (error) {
        console.log("Error in CheckAllSensitiveData", error);
        throw new Error(error.message);
    }
};
const analyzeSessionCookie = (sessionCookie, localdata, sessiondata) => {

    return new Promise(async (resolve, reject) => {
        try {

            let sessionCookieobj = sessionCookie && sessionCookie.sessionData ? sessionCookie.sessionData : null
            let sessionCookiesdata = sessionCookie && sessionCookie.Cookiesdata ? sessionCookie.Cookiesdata : null
            let cookietoken = await findJwtToken(sessionCookiesdata).then((data) => data).catch((error) => null)
            let localstoragetoken = await findJwtToken(localdata).then((data) => data).catch((error) => null)
            let sessionstoragetoken = await findJwtToken(sessiondata).then((data) => data).catch((error) => null)
            console.log("token", cookietoken)
            console.log("localstoragetoken", localstoragetoken)
            console.log("sessionstoragetoken", sessionstoragetoken)
            let sessionExpiretotaltime = cookietoken || localstoragetoken || sessionstoragetoken
            console.log("sessionExpiretotaltime", sessionExpiretotaltime)

            let possibilities = {};
            let sessionNotFound = sessionCookieobj ? sessionCookieobj : null
            // Check if session token is being passed in other areas apart from cookies
            console.log("sessionNotFound", sessionNotFound)
            // Check if session token is being passed in other areas apart from cookies
            possibilities["Session Token Being Passed In Other Areas Apart From Cookies"] =
                (localdata && localdata.containsJWT) || (sessiondata && sessiondata.containsJWT) ? "Yes" : "No"

            // Check if session expires on closing the browser
            possibilities["Session Does Not Expire On Closing The Browser"] =
                (sessionNotFound?.originalMaxAge || sessionExpiretotaltime === null) ? "NO" : "Yes"

            // Check session timeout
            if (sessionNotFound?.originalMaxAge || sessionExpiretotaltime === null) {
                possibilities["Session Time-Out Is High (Or) Not Implemented"] = "Not Implemented"
            } else {
                const maxAge = sessionNotFound?.originalMaxAge || sessionExpiretotaltime;
                if (maxAge === null) {
                    possibilities["Session Time-Out Is High (Or) Not Implemented"] = "High (No timeout set)"
                } else {
                    // Convert maxAge to hours for easier interpretation
                    //convert maxage to days
                    const maxAgeHours = Math.floor(maxAge / 3600000);
                    console.log("maxAgeHours", maxAgeHours)
                    possibilities["Session Time-Out Is High (Or) Not Implemented"] =
                        maxAgeHours > 1 ? `High (${maxAgeHours} days)` : `Normal (${maxAgeHours} days)`
                }
            }

            // Check for session fixation vulnerability
            possibilities["An Adversary Can Hijack User Sessions By Session Fixation"] =
                !sessionNotFound ? "No" : !sessionNotFound.httpOnly ? "Yes" : "No"

            // Check for session hijacking vulnerability
            possibilities["Application Is Vulnerable To Session Hijacking Attack"] =
                !sessionNotFound ? "No" : !sessionNotFound.secure || sessionNotFound.sameSite === null ? "Yes" : "No"

            // Convert possibilities object to array of objects
            let results = Object.keys(possibilities).map(key => ({ [key]: possibilities[key] }));
            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    checkForSensitiveInfoInBody, CheckAllSensitiveData,
    CheckPasswordKeyText, CheckAllDataIsEncrypted, analyzeSessionCookie,
    findJwtToken, decodeJWT, validatePassword, checkDomainAvailability, sendEmail,
    scrapWebsite, extractVisibleText, withRetry, CronJobVIdeoDelete, SSLverifier, OtpGenerator,
    fillInputFields, takeScreenshot, fillInputFieldsBlackPassword, shouldIgnoreURL, containsQueryParams, extractRootDomain
}