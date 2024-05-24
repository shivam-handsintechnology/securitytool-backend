const { chromium } = require('playwright');
const cheerio = require('cheerio');
const authenticatedRoutes = require("../../../data/json/ApplicationTestingData.json").authenticatedRoutes;
const hints404 = require("../../../data/json/ApplicationTestingData.json").hints404
const possibleLoginTexts = require("../../../data/json/ApplicationTestingData.json").possibleLoginTexts
const TwoStepVerificationCodes = require("../../../data/json/ApplicationTestingData.json").TwoStepVerificationCodes;
let lowerCasehitn404 = hints404.map((item) => item.toLowerCase())
const directoryListingPatterns = [
    '<title>Index of',
    'Parent Directory',
    '<h1>Index of',
];
async function takeScreenshot(page) {
    const screenshot = await page.screenshot({ fullPage: true });
    return Buffer.from(screenshot).toString('base64');
}
function extractVisibleText(html) {
    const $ = cheerio.load(html);
    return $('body').text();
}


async function CheckLoginForm(url, res, SerEnventData) {
    let data = "Scan Completed Two Factor Authentication or OTP Not Found";
    return new Promise(async (resolve, reject) => {
        try {
            if (!url) {
                throw new Error('Url not provided. Please provide a valid URL');
            }

            const browser = await chromium.launch();
            const context = await browser.newContext();
            const page = await context.newPage();

            await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
            await page.waitForLoadState('networkidle', { timeout: 60000 });




            for (const loginText of possibleLoginTexts) {
                const loginTextElement = await page.$(`text=${loginText}`);
                if (loginTextElement) {
                    await loginTextElement.click();
                    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const pageContent = await page.evaluate(() => {
                        return document.body.innerText;
                    });

                    const pageContentLowerCase = pageContent.toLowerCase();

                    const otpOrVerificationMentioned = TwoStepVerificationCodes.some(keyword => pageContentLowerCase.includes(keyword));

                    if (otpOrVerificationMentioned) {
                        console.log('The website uses two-factor authentication or OTP.');
                        SerEnventData({ error: false, message: `The website uses two-factor authentication or OTP.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        data = "The website uses two-factor authentication or OTP.";
                        break;
                    }
                } else if (!loginText) {
                    SerEnventData({ error: false, message: `No login text found on the home page.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                    data = "No login text found on the home page.";

                }
            }

            if (data === "Scan Completed Two Factor Authentication or OTP Not Found") {
                SerEnventData({ error: false, message: `The website does not use two-factor authentication or OTP.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                throw new Error('The website does not use two-factor authentication or OTP.');
            }

            resolve(data);
        } catch (error) {
            reject(error);
        } finally {
            await browser.close();
        }
    });
}
const scanSecondFactorAuthBypassed = async (url, res, SerEnventData) => {
    try {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        let navigationSuccessful = false;
        let attempts = 0;
        while (!navigationSuccessful && attempts < 3) {
            try {
                await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
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
                    SerEnventData({ error: false, message: `Second factor authentication could be bypassed: No  (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
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
                        // SerEnventData({ message: `Page Not Found: ${url}`, time: Date.now() , screenshot: await takeScreenshot(page)}, res);
                    } else {
                        const isDirectoryListing = directoryListingPatterns.some(pattern => pageContent.includes(pattern));
                        if (isDirectoryListing) {
                            SerEnventData({ error: true, message: `directory listing is enable on this page ${currentUrl.pathname} Please disable It`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        } else {
                            SerEnventData({ error: true, message: `Second factor authentication could be bypassed:Yes (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
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
            SerEnventData({ error: true, message: `Second factor authentication could be bypassed: No`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        }
        await page.close();
        await browser.close();
        return { success: true, message: `Scan Completed` };
    } catch (error) {
        console.log('Error:', error);
        SerEnventData({ message: `Second factor authentication could be bypassed Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        return { success: false, message: `Second factor authentication could be bypassed Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) };
    }
};




const SecondFactorAuthBypassed = async (websiteUrl, res, SerEnventData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isLoginForm = await CheckLoginForm(websiteUrl, res, SerEnventData).then(data => data)
            if (isLoginForm) {
                SerEnventData({ error: false, message: isLoginForm, time: Date.now() }, res);
                for (const link of authenticatedRoutes) {
                    const response = await scanSecondFactorAuthBypassed(websiteUrl + link, res, SerEnventData);
                    console.log(response)
                    // You can handle the response here if needed before moving to the next iteration
                }
            } else {
                SerEnventData({ error: false, message: isLoginForm, time: Date.now() }, res);

            }

            resolve("Completed");
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { SecondFactorAuthBypassed, takeScreenshot };