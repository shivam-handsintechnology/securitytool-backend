const { chromium } = require('playwright');
const path = require('path');
const fs = require("fs");

const { scrapWebsite, takeScreenshot, extractVisibleText, containsQueryParams, fillInputFields, withRetry, fillInputFieldsBlackPassword } = require('..');
const { authenticatedRoutes, hints404, possibleLoginTexts, TwoStepVerificationCodes, directoryListingPatterns, possibleauthapiTexts } = require("../../data/json/ApplicationTestingData.json");

const MYSQLCSVDATA = require('../../data/json/mysqldata.json');
let lowerCasehitn404 = hints404.map((item) => item.toLowerCase())
const BlackPasswordValidation = async (websiteUrl, res, SendEvent, fullurl) => {
    let url = websiteUrl;
    let data = "Scan Login Page for Black Password and Username";
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Specify the directory to save the video recordings
            size: { width: 1280, height: 720 } // Set the desired video resolution
        }
    });
    const page = await context.newPage();
    return new Promise(async (resolve, reject) => {
        try {
            if (!url) {
                throw new Error('Url not provided. Please provide a valid URL');
            }



            await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
            await page.waitForLoadState('networkidle', { timeout: 60000 });
            for (const loginText of possibleLoginTexts) {
                const loginTextElement = await page.$(`text=${loginText}`);
                if (loginTextElement) {
                    await loginTextElement.click();
                    await page.waitForLoadState('networkidle', { timeout: 90000 });
                    await fillInputFieldsBlackPassword(page);
                    // Listen for network requests
                    const requests = [];
                    page.on('request', request => {
                        // Check if it's an XHR or Fetch request
                        if (request.resourceType() === 'xhr' || (request.resourceType() === 'fetch' && request.method() === 'POST')) {
                            requests.push(request);
                        }
                    });

                    // Wait for all requests to finish
                    await Promise.all(requests.map(request => request.response()));




                } else if (!loginText) {
                    SendEvent({ error: false, message: `No login text found on the home page.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                    data = "No login text found on the home page.";

                }
            }
            const videoPath = await page.video().path();
            const absolutePath = path.resolve(videoPath)

            console.log('Video recording saved:', absolutePath);
            // get extension of the video and that extension file name
            const ext = path.extname(absolutePath);
            const fileName = path.basename(absolutePath, ext);
            console.log('File Name:', fileName);
            // Send the base64-encoded video data to the client
            if (fileName && ext) {
                SendEvent({
                    message: "Video stream", time: Date.now(), video: fullurl + fileName + ext
                }, res);
            } else if (!fileName && !ext) {
                SendEvent({ message: "No Video Found", time: Date.now(), video: null }, res);
            }


            // Delete the temporary video file
            // await fs.unlink(videoPath);
            resolve(data);
        } catch (error) {
            if (error.message.includes('Timeout')) {
                SendEvent({ error: true, message: `Timeout Error`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
            } else {

                reject(error);
            }
        } finally {
            await browser.close();
        }
    });

}



const scanNonHTMLContentAccessibility = async (url, res, SendEvent) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    try {

        let navigationSuccessful = false;
        let attempts = 0;
        while (!navigationSuccessful && attempts < 3) {
            try {
                await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });

                await page.waitForLoadState('networkidle');

                const finalUrl = new URL(page.url());
                console.log("initial url", url, "final url", finalUrl);

                // Remove trailing slash from pathname if present
                if (finalUrl.pathname.endsWith('/')) {
                    finalUrl.pathname = finalUrl.pathname.slice(0, -1);
                }

                const currentUrl = new URL(url);
                console.log("initial url", url, "final url", finalUrl);

                // Remove trailing slash from pathname if present
                if (currentUrl.pathname.endsWith('/')) {
                    finalUrl.pathname = finalUrl.pathname.slice(0, -1);
                }



                if (finalUrl.pathname !== currentUrl.pathname) {
                    SendEvent({ error: false, message: `Non-HTML Content Accessibility: No  (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                    navigationSuccessful = true;
                } else if (finalUrl.pathname == currentUrl.pathname) {

                    let pageContent = await page.content();
                    pageContent = extractVisibleText(pageContent);
                    console.log("Visible text:", pageContent);
                    const found404 = hints404.some(hint => pageContent.includes(hint));
                    const lowerCasefound404 = lowerCasehitn404.some(hint => pageContent.includes(hint));
                    const pageTitle = await page.title();
                    console.log("Page title", pageTitle);

                    if (found404 || lowerCasefound404 || pageTitle.includes("404") || pageTitle.includes("Not Found")) {
                        console.log(`Page Not Found: ${url}`);
                        // SendEvent({ message: `Page Not Found: ${url}`, time: Date.now() , screenshot: await takeScreenshot(page)}, res);
                    } else {
                        const isDirectoryListing = directoryListingPatterns.some(pattern => pageContent.includes(pattern));
                        if (isDirectoryListing) {
                            SendEvent({ error: true, message: `directory listing is enable on this page ${currentUrl.pathname} Please disable It`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        } else {
                            SendEvent({ error: true, message: `Non-HTML Content Accessibility:Yes (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        }
                    }
                    attempts++;
                    navigationSuccessful = true;
                }
            } catch (error) {
                console.error(`Error occurred while testing page "${url}":`, error);
                attempts++;
            }
        }
        if (!navigationSuccessful) {
            SendEvent({ error: true, message: `Non-HTML Content Accessibility: No`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        }
        await page.close();
        await browser.close();
        return { success: true, message: `Scan Completed` };
    } catch (error) {
        console.log('Error:', error);
        SendEvent({ message: `Non-HTML Content Accessibility Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        return { success: false, message: `Non-HTML Content Accessibility Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) };
    }
};

const checkNonHTMLContentAccessibility = async (websiteUrl, res, SendEvent) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (const link of authenticatedRoutes) {
                const response = await scanNonHTMLContentAccessibility(websiteUrl + link, res, SendEvent);
                console.log(response)
                // You can handle the response here if needed before moving to the next iteration
            }
            resolve("Completed");
        } catch (error) {
            reject(error);
        }
    });
};


const DefaultUserNamePasswordTest = async (websiteUrl, username, password, email, res, SendEvent, fullurl) => {
    let url = websiteUrl;
    let data = "Scan Login Page for Black Password and Username";
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Specify the directory to save the video recordings
            size: { width: 1280, height: 720 } // Set the desired video resolution
        }
    });
    const page = await context.newPage();
    return new Promise(async (resolve, reject) => {
        try {
            if (!url) {
                throw new Error('Url not provided. Please provide a valid URL');
            }



            await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
            await page.waitForLoadState('networkidle', { timeout: 60000 });




            for (const loginText of possibleLoginTexts) {
                const loginTextElement = await page.$(`text=${loginText}`);
                if (loginTextElement) {

                    await loginTextElement.click();
                    await page.waitForLoadState('networkidle', { timeout: 90000 });
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await fillInputFields(page, username, password, email);
                    // Listen for network requests
                    const requests = [];
                    page.on('request', request => {
                        // Check if it's an XHR or Fetch request
                        if (request.resourceType() === 'xhr' || (request.resourceType() === 'fetch' && request.method() === 'POST')) {
                            requests.push(request);
                        }
                    });

                    // Wait for all requests to finish
                    await Promise.all(requests.map(request => request.response()));

                } else if (!loginText) {
                    SendEvent({ error: false, message: `No login text found on the home page.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                    data = "No login text found on the home page.";

                }
            }
            const videoPath = await page.video().path();
            const absolutePath = path.resolve(videoPath)

            console.log('Video recording saved:', absolutePath);
            // get extension of the video and that extension file name
            const ext = path.extname(absolutePath);
            const fileName = path.basename(absolutePath, ext);
            console.log('File Name:', fileName);
            // Send the base64-encoded video data to the client
            if (fileName && ext) {
                SendEvent({
                    message: "Video stream", time: Date.now(), video: fullurl + fileName + ext
                }, res);
            } else if (!fileName && !ext) {
                SendEvent({ message: "No Video Found", time: Date.now(), video: null }, res);
            }


            // Delete the temporary video file
            // await fs.unlink(videoPath);
            resolve(data);
        } catch (error) {
            reject(error);
        } finally {
            await browser.close();
        }
    });

}

let requestabort = async (page) => {
    await page.route('**', (route) => {
        const requestUrl = route.request().url();
        console.log(requestUrl);
        if (requestUrl.includes("api/client/protection")) {
            return route.abort();
        } else {
            return route.continue();
        }
    });
}
const TestLockoutFeatureTest = async (url, SendEvent, res, fullurl, attempt, duration) => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
            size: { width: 1280, height: 720 }
        }
    });
    const page = await context.newPage();
    requestabort(page)
    await withRetry(async () => {
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
    });

    await withRetry(async () => {
        await page.waitForLoadState('networkidle', { timeout: 60000 });
    });

    const username = "dsdasdsad";
    const password = "dsadsadsa";
    const email = "sadsadasd@example.com";
    let message = "Test Lockout Feature";
    let status = null;
    let data = { message: message, time: Date.now() };

    return new Promise(async (resolve, reject) => {
        try {
            if (!url) {
                throw new Error('Url not provided. Please provide a valid URL');
            }

            await page.waitForLoadState('networkidle', { timeout: 90000 });
            page.on("response", async (response) => {
                if (response.url().includes("protection")) {
                    return;
                }
                console.log("method", response.request().method())
                if (response.request().method() == "POST") {

                    status = await response.status();
                }
            });



            // Perform the lockout simulation based on attempt and duration
            let lockoutAttemptsPromise = async () => {
                for (let i = 0; i < attempt; i++) {
                    await fillInputFields(page, username, password, email);

                }
            }
            await Promise.all([lockoutAttemptsPromise(), page.waitForTimeout(1000)]);
            console.log("status", status)
            await page.waitForTimeout(1000); // Wait for the lockout duration
            const videoPath = await page.video().path();
            const absolutePath = path.resolve(videoPath);

            console.log('Video recording saved:', absolutePath);
            const ext = path.extname(absolutePath);
            const fileName = path.basename(absolutePath, ext);
            console.log('File Name:', fileName);

            const { size } = fs.statSync(path.join(process.cwd(), "videos", fileName + ext));
            console.log("size", size)

            if (fileName && ext) {
                SendEvent({
                    message: `Lockout Feature Is ${status && status === 429 ? 'Enable' : 'Disable'}`, time: Date.now(), video: fullurl + fileName + ext
                }, res);
            } else if (!fileName && !ext) {
                SendEvent({ message: "No Video Found", time: Date.now(), video: null }, res);
            }

            data = { message: message, time: Date.now(), status: status };
            resolve(data);
        } catch (error) {
            reject(error);
        } finally {
            await context.close();
            await browser.close();
        }
    });
};
let TestLockoutFeature = async (url, res, SendEvent, fullurl, attempt, duration) => {
    try {

        const visitedLinks = await scrapWebsite(url, res, SendEvent)
        let links = Array.from(visitedLinks);

        if (links.length > 0) {
            for (const link of links) {
                let replacesometextRegx = new RegExp("(_)|(-_)|(-)|(_-)( )", "g")
                let lowercaselink = link.replace(replacesometextRegx, "")
                let isAuth = possibleauthapiTexts.some((text) => lowercaselink.includes(text))
                if (isAuth) {
                    await TestLockoutFeatureTest(link, SendEvent, res, fullurl, attempt, duration)
                }
            }
        }
    } catch (error) {
        console.log("error", error)

    }
}


// Auto-complete is enabled for sensitive fields
async function testAutoComplete(url, SendEvent, res) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await withRetry(async () => {
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
    });

    await withRetry(async () => {
        await page.waitForLoadState('networkidle', { timeout: 60000 });
    });
    return new Promise(async (resolve, reject) => {
        try {

            // Locate form submission elements
            const forms = await page.$$('form');
            const sensitiveFields = [];

            // Submit a test form
            if (forms.length > 0) {
                for (const form of forms) {
                    // Get all input fields within each form
                    const inputFields = await form.$$eval('input', inputs => inputs.map(input => input.outerHTML));

                    if (inputFields.length > 0) {



                        for (const field of inputFields) {
                            // Check if the field is a sensitive field (e.g., password, credit card)
                            const isSensitiveField = /type="(password)"|name="(password|creditcard)"/i.test(field);

                            if (isSensitiveField) {
                                // Check if auto-complete is enabled for the sensitive field
                                const autoCompleteEnabled = !/autocomplete="off"/i.test(field);

                                if (autoCompleteEnabled) {
                                    sensitiveFields.push(field);
                                    SendEvent({ error: false, message: `Auto-complete is enabled for the sensitive field ${field} on the Page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                                }
                            }
                        }


                    }

                }
            }

            resolve({
                sensitiveFields: sensitiveFields.length > 0 ? sensitiveFields : [],
                pageName: url,
            })
        } catch (error) {
            reject(error);
        } finally {
            await context.close();
            await browser.close();
        }

    });
}
// Captcha is not implemented for publicly available forms
const testCaptchElements = async (url, SendEvent, res) => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Specify the directory to save the video recordings
            size: { width: 1280, height: 720 } // Set the desired video resolution
        }
    });
    const page = await context.newPage();

    await withRetry(async () => {
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
    });

    await withRetry(async () => {
        await page.waitForLoadState('networkidle', { timeout: 60000 });
    });
    return new Promise(async (resolve, reject) => {
        try {
            await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
            await page.waitForLoadState('networkidle', { timeout: 60000 });
            let cathctexts = [
                "captcha",
                "recaptcha",
                "google captcha",
                "h-captcha",
                "hcaptcha",

            ]
            let capycharesponse = null
            for (const cathctext of cathctexts) {
                const captchaElements = await page.$$(`text=${cathctext}`);
                if (captchaElements.length > 0) {
                    capycharesponse = {
                        error: false, message: `CAPTCHA is implemented for publicly available forms on page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page)
                    }
                    SendEvent({ error: false, message: `CAPTCHA is implemented for publicly available forms on page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                }
            }
            resolve(capycharesponse)
        } catch (error) {
            reject(error);
        } finally {
            await context.close();
            await browser.close();
        }
    });
}
// The page contains iframes which may be indicative of clickjacking vulnerability
const testclickjacking = async (url, SendEvent, res) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await withRetry(async () => {
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
    });

    await withRetry(async () => {
        await page.waitForLoadState('networkidle', { timeout: 60000 });
    });
    return new Promise(async (resolve, reject) => {
        try {
            const iframes = await page.$$('iframe');
            if (iframes.length > 0) {
                iframes.forEach(async iframe => SendEvent({ error: false, message: `The page ${url} contains iframes which may be indicative of clickjacking vulnerability.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res));
            }
            resolve({
                iframes: iframes.length > 0 ? iframes : [],
                pageName: url,
            })
        } catch (error) {
            reject(error);
        } finally {
            await context.close();
            await browser.close();
        }
    });
}
//Application accepts special characters as user inputs
const TestSpecialCharaters = async (url, SendEvent, res, fullurl) => {
    const browser = await chromium.launch();

    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Specify the directory to save the video recordings
            size: { width: 1280, height: 720 } // Set the desired video resolution
        }
    });
    const page = await context.newPage();
    requestabort(page)
    await withRetry(async () => {
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
    });

    await withRetry(async () => {
        await page.waitForLoadState('networkidle', { timeout: 60000 });
    });
    const username = "Test", password = "Test", email = "Test@example.com"
    let data = "Scan Login Page for Black Password and Username";

    return new Promise(async (resolve, reject) => {
        try {

            if (!url) {
                throw new Error('Url not provided. Please provide a valid URL');
            }



            await page.waitForLoadState('networkidle', { timeout: 90000 });
            await fillInputFields(page, username, password, email);
            // Listen for network requests
            await page.waitForTimeout(1000); // Wait for the lockout duration
            const videoPath = await page.video().path();
            const absolutePath = path.resolve(videoPath)

            console.log('Video recording saved:', absolutePath);
            // get extension of the video and that extension file name
            const ext = path.extname(absolutePath);
            const fileName = path.basename(absolutePath, ext);
            console.log('File Name:', fileName);
            // Send the base64-encoded video data to the client
            if (fileName && ext) {
                SendEvent({
                    message: "Application accepts special characters as user inputs", time: Date.now(), video: fullurl + fileName + ext
                }, res);
            } else if (!fileName && !ext) {
                SendEvent({ message: "No Video Found", time: Date.now(), video: null }, res);
            }
            resolve(data);
        } catch (error) {
            reject(error);
        } finally {
            await context.close();
            await browser.close();
        }
    });

}
let getInoutypepasswordpage = async (link) => {
    let browser = await chromium.launch();
    let context = await browser.newContext();
    let page = await context.newPage();
    try {
        await page.goto(link, { timeout: 60000, waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle', { timeout: 60000 });

        const inputFields = await page.$('input[type="password"]');
        if (inputFields) {
            return true
        }
    } catch (error) {
        return false
    }

}
let MiscellaneousAttacks = async (url, res, SendEvent, fullurl) => {
    try {

        const visitedLinks = await scrapWebsite(url, res, SendEvent)
        let links = Array.from(visitedLinks);
        if (links.length > 0) {
            for (const link of links) {
                let isAUthPage = await getInoutypepasswordpage(link)
                isAUthPage && await TestSpecialCharaters(link, SendEvent, res, fullurl)
                await testCaptchElements(link, SendEvent, res, fullurl)
                await testAutoComplete(link, SendEvent, res, fullurl)
                await testclickjacking(link, SendEvent, res, fullurl)
            }
        }
    } catch (error) {
        console.log("error", error)
    }
}


// Define the base URL and endpoints to test
async function test(url, res, SendEvent, fullurl) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Specify the directory to save the video recordings
            size: { width: 1280, height: 720 } // Set the desired video resolution
        }
    });
    const page = await context.newPage();

    try {
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle', { timeout: 60000 });

        // Find the input tag with a search-related placeholder or name attribute

        page.on("response", async (response) => {
            let reponseurl = response.url();

            if (containsQueryParams(reponseurl)) {
                const contentType = response.headers()["content-type"];
                if (contentType.includes("application/json")) {
                    await response.json();


                } else if (contentType.includes("text/html")) {
                    const text = await response.text();
                    let isJsonString = false;
                    try {
                        JSON.parse(text);

                        isJsonString = true;
                    } catch (error) {
                        isJsonString = false;
                    }
                    if (isJsonString) {
                        JSON.parse(text);

                    }
                }
            }
        });


        // Wait for the response and check if it includes the payload
        await page.waitForLoadState('networkidle', { timeout: 60000 });
        await page.waitForTimeout(2000); // Wait for the lockout duration

    } catch (error) {
        console.log(`Error navigating to: ${error}`);
        await context.close();
        await browser.close();
    } finally {
        await context.close();
        await browser.close();
    }
}
// Run the test testSqlWildcardDos(url);
async function PasswordChangeTest(url, res, SendEvent, fullurl) {
    await test(url, res, SendEvent, fullurl);
    let visited = await scrapWebsite(url, res, SendEvent)
    let links = Array.from(visited)
    let changePassword = links.filter(link => link.includes("change"))
    console.log(links)
    for (const link of changePassword) {
        await test(link, res, SendEvent, fullurl);
    }


}



async function CheckLoginForm(url, res, SendEvent) {
    let data = "Scan Completed Two Factor Authentication or OTP Not Found";
    const browser = await chromium.launch();

    return new Promise(async (resolve, reject) => {
        try {
            if (!url) {
                throw new Error('Url not provided. Please provide a valid URL');
            }

            const context = await browser.newContext();
            const page = await context.newPage();

            await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
            await page.waitForLoadState('networkidle', { timeout: 60000 });




            for (const loginText of possibleLoginTexts) {
                const loginTextElement = await page.$(`text=${loginText}`);
                if (loginTextElement) {
                    await loginTextElement.click();
                    await page.waitForLoadState('networkidle', { timeout: 90000 });
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const pageContent = await page.evaluate(() => {
                        return document.body.innerText;
                    });

                    const pageContentLowerCase = pageContent.toLowerCase();

                    const otpOrVerificationMentioned = TwoStepVerificationCodes.some(keyword => pageContentLowerCase.includes(keyword));

                    if (otpOrVerificationMentioned) {
                        console.log('The website uses two-factor authentication or OTP.');
                        SendEvent({ error: false, message: `The website uses two-factor authentication or OTP.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        data = "The website uses two-factor authentication or OTP.";
                        break;
                    }
                } else if (!loginText) {
                    SendEvent({ error: false, message: `No login text found on the home page.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                    data = "No login text found on the home page.";

                }
            }

            if (data === "Scan Completed Two Factor Authentication or OTP Not Found") {
                SendEvent({ error: true, message: `The website does not use two-factor authentication or OTP.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
            }

            resolve(data);
        } catch (error) {
            reject(error);
        } finally {
            await browser.close();
        }
    });
}
const scanSecondFactorAuthBypassed = async (url, res, SendEvent) => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    try {


        let navigationSuccessful = false;
        let attempts = 0;
        while (!navigationSuccessful && attempts < 3) {
            try {
                await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
                await page.waitForLoadState('networkidle', { timeout: 60000 });
                const finalUrl = new URL(page.url());
                console.log("initial url", url, "final url", finalUrl);

                // Remove trailing slash from pathname if present
                if (finalUrl.pathname.endsWith('/')) {
                    finalUrl.pathname = finalUrl.pathname.slice(0, -1);
                }

                const currentUrl = new URL(url);
                console.log("initial url", url, "final url", finalUrl);

                // Remove trailing slash from pathname if present
                if (currentUrl.pathname.endsWith('/')) {
                    finalUrl.pathname = finalUrl.pathname.slice(0, -1);
                }



                if (finalUrl.pathname !== currentUrl.pathname) {
                    SendEvent({ error: false, message: `Second factor authentication could be bypassed: No  (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                    navigationSuccessful = true;
                } else if (finalUrl.pathname == currentUrl.pathname) {

                    let pageContent = await page.content();
                    pageContent = extractVisibleText(pageContent);
                    console.log("Visible text:", pageContent);
                    const found404 = hints404.some(hint => pageContent.includes(hint));
                    const lowerCasefound404 = lowerCasehitn404.some(hint => pageContent.includes(hint));
                    const pageTitle = await page.title();
                    console.log("Page title", pageTitle);

                    if (found404 || lowerCasefound404 || pageTitle.includes("404") || pageTitle.includes("Not Found")) {
                        console.log(`Page Not Found: ${url}`);
                        // SendEvent({ message: `Page Not Found: ${url}`, time: Date.now() , screenshot: await takeScreenshot(page)}, res);
                    } else {
                        const isDirectoryListing = directoryListingPatterns.some(pattern => pageContent.includes(pattern));
                        if (isDirectoryListing) {
                            SendEvent({ error: true, message: `directory listing is enable on this page ${currentUrl.pathname} Please disable It`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        } else {
                            SendEvent({ error: true, message: `Second factor authentication could be bypassed:Yes (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        }
                    }
                    attempts++;
                    navigationSuccessful = true;
                }
            } catch (error) {
                console.error(`Error occurred while testing page "${url}":`, error);
                attempts++;
            }
        }
        if (!navigationSuccessful) {
            SendEvent({ error: true, message: `Second factor authentication could be bypassed: No`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        }

        return { success: true, message: `Scan Completed` };
    } catch (error) {
        console.log('Error:', error);
        SendEvent({ message: `Second factor authentication could be bypassed Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        return { success: false, message: `Second factor authentication could be bypassed Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) };
    } finally {
        await page.close();
        await browser.close();
    }
};
const SecondFactorAuthBypassed = async (websiteUrl, res, SendEvent) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isLoginForm = await CheckLoginForm(websiteUrl, res, SendEvent).then(data => data)
            if (isLoginForm) {
                SendEvent({ error: false, message: isLoginForm, time: Date.now() }, res);
                for (const link of authenticatedRoutes) {
                    const response = await scanSecondFactorAuthBypassed(websiteUrl + link, res, SendEvent);
                    console.log(response)
                    // You can handle the response here if needed before moving to the next iteration
                }
            } else {
                SendEvent({ error: false, message: isLoginForm, time: Date.now() }, res);

            }

            resolve("Completed");
        } catch (error) {
            reject(error);
        }
    });
};

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

// Define the base URL and endpoints to test
let findArrayinJson = async function (json) {
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const element = json[key];
            if (Array.isArray(element)) {
                return element;
            } else if (typeof element === 'object') {
                findArrayinJson(element);
            }
        }
    }
    return null;
}
async function test(url, res, SendEvent) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Specify the directory to save the video recordings
            size: { width: 1280, height: 720 } // Set the desired video resolution
        }
    });
    const page = await context.newPage();

    try {
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle', { timeout: 60000 });

        // Find the input tag with a search-related placeholder or name attribute
        const inputSelector = 'input';
        const Searchinputs = await page.$$(inputSelector);

        page.on("response", async (response) => {
            let reponseurl = response.url();
            const responseTime = response.timing().responseEnd - response.timing().requestStart;
            if (containsQueryParams(reponseurl)) {
                const contentType = response.headers()["content-type"];
                if (contentType.includes("application/json")) {
                    const json = await response.json();
                    let array = await findArrayinJson(json);

                    if (array && array.length > 0 && array.length <= 10) {
                        console.log(`Response time: ${responseTime} ms`);
                        SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are low", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                    } else if (array && array.length > 10) {
                        SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are high", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                    } else if (!array) {
                        SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are low", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                    }

                } else if (contentType.includes("text/html")) {
                    const text = await response.text();
                    let isJsonString = false;
                    try {
                        JSON.parse(text);

                        isJsonString = true;
                    } catch (error) {
                        if (error) {

                            isJsonString = false;
                        }
                    }
                    if (isJsonString) {
                        const json = JSON.parse(text);
                        let array = await findArrayinJson(json);
                        if (array && array.length > 0 && array.length <= 10) {
                            const responseTime = response.timing().responseEnd - response.timing().requestStart;
                            console.log(`Response time: ${responseTime} ms`);
                            SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are low", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                        } else if (array && array.length > 10) {
                            SendEvent({ error: true, message: "DDOS Sql Wildcards Attack chances are high", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                        } else if (!array) {
                            SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are low", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                        }
                    }
                }
            }
        });

        let searchInput;
        for (const input of Searchinputs) {
            const allAttributes = await input.evaluate(node => {
                const attributes = {};
                for (let i = 0; i < node.attributes.length; i++) {
                    const attr = node.attributes[i];
                    attributes[attr.name] = attr.value;
                }
                return attributes;
            });

            for (const [attrName, attrValue] of Object.entries(allAttributes)) {
                if (attrValue.toLowerCase().includes('search')) {
                    searchInput = input;
                    break;
                }
            }

            if (searchInput) {
                break;
            }
        }

        if (!searchInput) {
            console.log('No search input found.');
            SendEvent({ error: false, message: `No search input found.  ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        }

        searchInput && SendEvent({ error: false, message: `search input found.  ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);

        // Click on the button where any attribute includes 'search'
        let searchButton;
        const inputs = await page.$$('input[type="submit"]');
        for (const button of inputs) {
            const attributes = await button.evaluate(node => node.getAttributeNames());
            if (attributes.some(attribute => attribute.toLowerCase().includes('search'))) {
                searchButton = button;
                break;
            }
        }

        if (!searchButton) {
            const buttons = await page.$$('button');
            for (const button of buttons) {
                const attributes = await button.evaluate(node => node.getAttributeNames());
                if (attributes.some(attribute => attribute.toLowerCase().includes('search'))) {
                    searchButton = button;
                    break;
                }
            }
        }

        // Ensure the search input is still attached to the DOM
        await page.waitForSelector(inputSelector, { visible: true, interactable: true, timeout: 120000 }); // Increase the timeout to 120 seconds


        let searchInputChanged = false;
        if (searchInput) {
            await searchInput.fill('payload', { timeout: 60000 }); // Increase the timeout to 60 seconds

            // Add event listener to monitor changes in the HTML text
            const observeHtmlChanges = async () => {
                const initialHtml = await page.content();

                const htmlChangeListener = async () => {
                    const currentHtml = await page.content();
                    if (currentHtml !== initialHtml) {
                        searchInputChanged = true;
                        page.off('domcontentloaded', htmlChangeListener); // Remove the listener
                        console.log('HTML text changed after search input modification');
                        // Perform any additional actions here if needed
                    }
                };

                page.on('domcontentloaded', htmlChangeListener);
            };

            // Call the observeHtmlChanges function before filling the search input
            await observeHtmlChanges();
            if (searchButton) {
                await searchButton.click();
                //  waitUntil: 'domcontentloaded'
                SendEvent({ error: false, message: `submit found and click.  ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                await page.waitForLoadState('networkidle', { timeout: 60000, waitUntil: 'domcontentloaded' });
            } else {
                console.log("submit but not found");
                // Enter keyword
                await page.keyboard.press('Enter');
            }

        }

        // Wait for the response and check if it includes the payload
        await page.waitForLoadState('networkidle', { timeout: 60000 });
        await page.waitForTimeout(2000); // Wait for the lockout duration

    } catch (error) {
        console.log(`Error navigating to: ${error}`);
        await context.close();
        await browser.close();
    } finally {
        await context.close();
        await browser.close();
    }
}
// Run the test testSqlWildcardDos(url);
async function testSqlWildcardDos(url, res, SendEvent, fullurl) {
    await test(url, res, SendEvent, fullurl);
    let visited = await scrapWebsite(url, res, SendEvent)
    return visited;


}

module.exports = { BlackPasswordValidation, SecondFactorAuthBypassed, checkNonHTMLContentAccessibility, testSqlWildcardDos, TestLockoutFeature, MiscellaneousAttacks, PasswordChangeTest, DefaultUserNamePasswordTest, scanSQLvulnerability };