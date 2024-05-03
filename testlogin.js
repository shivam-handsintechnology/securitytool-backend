const puppeteer = require('puppeteer');

async function checkCaptcha(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Set navigation timeout to 30 seconds
    await page.setDefaultNavigationTimeout(30000);

    // Navigate to the web application
    await page.goto(url);

    // Locate form submission elements
    const forms =await page.$$('form');

    // Submit a test form
    if (forms.length > 0) {
        for (const form of forms) {
            // Get all input fields within each form
            const inputFields = await form.$$eval('input', inputs => inputs.map(input => input.outerHTML));
    
            if (inputFields.length > 0) {
                  // Wait for 5 seconds for any CAPTCHA-related changes
      await new Promise(resolve => setTimeout(resolve, 5000));
      const sensitiveFields = [];

      for (const field of inputFields) {
        // Check if the field is a sensitive field (e.g., password, credit card)
        const isSensitiveField = /type="(password|text)"|name="(password|creditcard)"/i.test(field);
  
        if (isSensitiveField) {
          // Check if auto-complete is enabled for the sensitive field
          const autoCompleteEnabled = !/autocomplete="off"/i.test(field);
  
          if (autoCompleteEnabled) {
            sensitiveFields.push(field);
          }
        }
      }
  
      if (sensitiveFields.length > 0) {
        console.log('Auto-complete is enabled for the following sensitive fields:');
        sensitiveFields.forEach(field => console.log(field));
      } else {
        console.log('Auto-complete is disabled for all sensitive fields.');
      }
              console.log(`Input fields within form:`);
              inputFields.forEach(field => console.log(field));
            } else {
              console.log('No input fields found within the form.');
            }
          }

    
        // Find input fields within a specific section of the page
    const iframes = await page.$$eval('iframe', iframes => iframes.map(iframe => iframe.outerHTML));
  
    if (iframes.length > 0) {
      console.log('The page contains iframes which may be indicative of clickjacking vulnerability.');
      iframes.forEach(iframe => console.log(iframe));
    } else {
      console.log('The page does not contain any iframes.');
    }
      // Check for CAPTCHA elements
      const captchaElements = await page.$$('*[class*=captcha]');
      if (captchaElements.length > 0) {
        console.log('CAPTCHA is implemented for publicly available forms.');
      
      } else {
        console.log('CAPTCHA is not implemented for publicly available forms.');
      }
    } else {
      console.log('No form submission elements found.');
    }
    return {
        captchaElements: captchaElements.length > 0,
        sensitiveFields: sensitiveFields.length > 0,
        iframes: iframes.length > 0,

    }
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await browser.close();
  }
}
  checkCaptcha('https://mlsdev.sblcorp.com/login').catch(error => console.error(error)).then(data=>console.log(data))