const { chromium } = require('playwright');
const { takeScreenshot, extractVisibleText } = require('..');
const { authenticatedRoutes, hints404, possibleLoginTexts, TwoStepVerificationCodes, directoryListingPatterns } = require("../../data/json/ApplicationTestingData.json");
let lowerCasehitn404 = hints404.map((item) => item.toLowerCase())


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

module.exports = { SecondFactorAuthBypassed };