const { chromium } = require('playwright');

async function checkSecondFactorAuthentication() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://mlsdev.sblcorp.com/phone-login'); // Replace with your login page URL

    // Array to store XHR responses
    const xhrResponses = [];

    // Listen for response events
    page.on('response', async response => {
        if (response.request().resourceType() === 'xhr') {
            const status = response.status();
            const url = response.url();
            xhrResponses.push({ url, status });
            console.log(`XHR Response: ${url} - Status: ${status}`);
        }
    });

    // Find input field with placeholder or aria-label containing "Phone" or "phone"
    const phoneInput = await page.locator('input[placeholder*="Phone"], input[placeholder*="phone"], input[aria-label*="Phone"], input[aria-label*="phone"]');

    if (await phoneInput.count() > 0) {
        await phoneInput.first().fill('1234567890'); // Fill with a 10 digit phone number

        // Find and click the submit button
        const submitButton = await page.locator('button:has-text("Submit"), button:has-text("Verify"), button:has-text("Continue"), button:has-text("Confirm"), button:has-text("Login"), button:has-text("Sign in"), button:has-text("Next"), button:has-text("Send"), button:has-text("OTP")');
        if (await submitButton.count() > 0) {
            await submitButton.first().click();
        } else {
            console.log('Submit button not found.');
        }
        
        // Wait for navigation after submitting the phone number
        await page.waitForNavigation({ timeout: 5000 });

        // Check if there's an OTP input field on the new page
        const otpInput = await page.locator('input[placeholder*="OTP"], input[placeholder*="otp"], input[aria-label*="OTP"], input[aria-label*="otp"]');
        if (await otpInput.count() > 0) {
            await otpInput.first().fill('123456'); // Replace with your OTP value

            // Find and click the submit button
            const otpSubmitButton = await page.locator('button:has-text("Submit"), button:has-text("Verify"), button:has-text("Continue"), button:has-text("Confirm"), button:has-text("Login"), button:has-text("Sign in"), button:has-text("Next"), button:has-text("Send"), button:has-text("OTP")');
            if (await otpSubmitButton.count() > 0) {
                await otpSubmitButton.first().click();
            } else {
                console.log('OTP submit button not found.');
            }
        } else {
            console.log('OTP input field not found.');
        }
    } else {
        console.log('Phone input field not found.');
    }

    // Wait a bit to ensure all XHR requests are captured
    await page.waitForTimeout(5000);

    await browser.close();

    // Log all captured XHR responses
    console.log('Captured XHR Responses:');
    xhrResponses.forEach(response => {
        console.log(`URL: ${response.url}, Status: ${response.status}`);
    });
}

checkSecondFactorAuthentication();
