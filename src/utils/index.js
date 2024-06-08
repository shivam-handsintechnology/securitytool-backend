const { chromium } = require('playwright');
const cheerio = require('cheerio');
const moment = require('moment')
const tls = require('tls');
const MYSQLCSVDATA = require("../data/json/mysqldata.json");
const { ignorePatterns } = require("../data/json/ApplicationTestingData.json");
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
    if (visited.has(url)) {
        return visited;
    }

    const startTime = new Date();

    sendEvent({ message: `Scanning ${url}`, time: Date.now() }, res);
    visited.add(url);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
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
    sendEvent({ message: `Scanning ${url} complete. Time elapsed: ${timeElapsed} seconds`, time: Date.now() }, res);

    // Recursively scrap each unique link
    for (const link of uniqueLinks) {
        if (!link.includes("#") && !link.includes("mailto") && !link.includes("tel") && !link.includes("javascript") && !link.includes("pdf") && !link.includes("jpg") && !link.includes("png") && !link.includes("jpeg") && !link.includes("doc") && !link.includes("docx") && !link.includes("xls") && !link.includes("xlsx") && !link.includes("ppt") && !link.includes("pptx") && !link.includes("csv") && !link.includes("xml") && !link.includes("json") && !link.includes("zip") && !link.includes("rar") && !link.includes("tar") && !link.includes("gz") && !link.includes("7z") && !link.includes("mp3") && !link.includes("mp4") && !link.includes("avi") && !link.includes("mov") && !link.includes("wmv") && !link.includes("flv") && !link.includes("ogg") && !link.includes("webm") && !link.includes("wav") && !link.includes("wma") && !link.includes("aac") && !link.includes("flac") && !link.includes("alac") && !link.includes("aiff") && !link.includes("ape") && !link.includes("m4a") && !link.includes("mid") && !link.includes("midi") && !link.includes("amr") && !link.includes("mka") && !link.includes("opus") && !link.includes("ra") && !link.includes("rm") && !link.includes("vqf") && !link.includes("wv") && !link.includes("webp") && !link.includes("svg") && !link.includes("gif") && !link.includes("bmp") && !link.includes("ico") && !link.includes("tiff") && !link.includes("psd") && !link.includes("eps") && !link.includes("ai") && !link.includes("indd") && !link.includes("raw") && !link.includes("cr2") && !link.includes("nef") && !link.includes("orf") && !link.includes("sr2") && !link.includes("pef") && !link.includes("dng") && !link.includes("x3f") && !link.includes("arw") && !link.includes("rw2") && !link.includes("rwl")) {
            await scrapWebsite(link, res, sendEvent, visited, false);
        }

    }

    return visited;
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



        // Fill input fields based on type
        username && await fillInputField(page, 'input[type="text"]', username);
        email && await fillInputField(page, 'input[type="email"]', email);
        await fillInputField(page, 'input[type="number"]', Date.now());
        await fillInputField(page, 'input[type="date"]', dateNow);
        password && await fillInputField(page, 'input[type="password"]', password);
        await fillInputField(page, 'input[name="date"]', dateNow);
        let buttonTypeSubmit = await page.$('button[type="submit"]')
        let buttonTypeButton = await page.$('button[type="button"]')
        let inputTypeSubmit = await page.$('input[type="submit"]')
        if (buttonTypeSubmit) {
            await buttonTypeSubmit.click();
        }

        else if (inputTypeSubmit) {
            await inputTypeSubmit.click();
        }

        else if (buttonTypeButton) {
            await buttonTypeButton.click();
        }

    } catch (error) {
        console.error('Error occurred:', error);
    }
}
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
async function scanSQLvulnerability(hostname, res, sendEvent,) {
    return new Promise(async (resolve, reject) => {
        const numRequests = MYSQLCSVDATA.length;
        const averageResponseTime = 0.5; // Assuming 0.5 seconds average response time per request in a batch
        const estimatedTime = numRequests * averageResponseTime;
        console.log(`Estimated time to complete: ${estimatedTime} seconds`);

        sendEvent({ numRequests: numRequests, estimatedTime, message: `Total Number of SQL Injection Tests: ${numRequests}`, time: Date.now() }, res);

        let count = 0;
        try {


            for (let batchIndex = 0; batchIndex < numRequests; batchIndex++) {
                try {
                    let data = MYSQLCSVDATA[batchIndex];
                    const response = await fetch(hostname, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    count++;
                    let percentageCompleted = ((count / numRequests) * 100).toFixed(2);
                    percentageCompleted = Math.round(percentageCompleted)
                    if (response.status === 200 || response.status === 201 || response.status === 202 || response.status === 204 || response.status === 304 || response.status === 404) {
                        sendEvent({ count, percentageCompleted, message: `Sql Injection Detected with this query: ${data.Query}`, time: Date.now() }, res);
                    } else if (response.status > 400 && response.status < 500 && response.status !== 404) {
                        // Handle client-side errors


                        sendEvent({ count, percentageCompleted, time: Date.now() }, res);
                    } else {
                        // Handle other statuses if needed
                        sendEvent({ count, percentageCompleted, time: Date.now() }, res);
                    }

                    // Calculate percentage completed


                } catch (error) {
                    count++;
                    let percentageCompleted = ((count / numRequests) * 100).toFixed(2);
                    percentageCompleted = Math.round(percentageCompleted)
                    sendEvent({ count, percentageCompleted, time: Date.now() }, res);
                    console.error("Error occurred during request:", error);
                }
            }
            count++;

            sendEvent({ count: numRequests, complete: true, percentageCompleted: 100, message: "Sql Injection Test Completed", time: Date.now() }, res);
            resolve({ message: "Sql Injection Test Completed" });
        } catch (error) {
            count++;

            sendEvent({ count, time: Date.now() }, res);
            reject(error);
        }
    });
}
module.exports = {
    scrapWebsite, extractVisibleText, withRetry, CronJobVIdeoDelete, SSLverifier, scanSQLvulnerability,
    fillInputFields, takeScreenshot, fillInputFieldsBlackPassword, shouldIgnoreURL
}