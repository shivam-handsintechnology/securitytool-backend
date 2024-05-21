const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Navigate to the website's home page
    await page.goto('https://www.muscleblaze.com/');
    await page.waitForLoadState('networkidle', { timeout: 60000 });

    // Check if there's a login text on the home page
    const loginText = await page.$('text=Login');

    if (loginText) {
        // Click on the login text
        await loginText.click();

        // Wait for the login page or pop-up to appear
        await page.waitForLoadState('domcontentloaded', { timeout: 10000 });

        // Wait for 1 second to ensure the content is fully loaded
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Extract all visible text content on the page
        const pageContent = await page.evaluate(() => {
            return document.body.innerText;
        });

        // Check the extracted text for OTP or verification mention
        const otpOrVerificationMentioned = pageContent.toLowerCase().includes('otp') || pageContent.toLowerCase().includes('verification');

        if (otpOrVerificationMentioned) {
            console.log('The website uses two-factor authentication or OTP.');
        } else {
            console.log('The website does not use two-factor authentication or OTP.');
        }
    } else {
        console.log('No login text found on the home page.');
    }

    await browser.close();
})();
