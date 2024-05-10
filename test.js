const {chromium} = require('playwright');

const checkNonHTMLContentAccessibility = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  let isRedirected = false;
  const urls = [
      'https://securitytool-front.handsintechnology.in/dashboard',
      'https://securitytool-front.handsintechnology.in/profile',
      'https://securitytool-front.handsintechnology.in/admin',
      'https://securitytool-front.handsintechnology.in/master',
  ];

  for (const url of urls) {
      try {
          // Open a new page for each URL
          const page = await context.newPage();

          // Navigate to the page
          await page.goto(url, { timeout: 60000 }); // Increase the timeout to 60 seconds

          // Wait for the page to load completely
          await page.waitForLoadState('networkidle', { timeout: 60000 }); // Increase the timeout to 60 seconds

          // Check if the page contains text related to "404 Not Found"
          let pageContent = await page.content();
          pageContent = pageContent.replace(/\s/g, ''); // Remove all white spaces
          pageContent = pageContent.toLowerCase(); // Convert the content to lower case
      
              // Get the final URL after any redirects
              const finalUrl = page.url();

              if (finalUrl!==url) {
                  console.log(`Page "${url}" is not redirected.`);
                  isRedirected = true;
              } 
          
         
          // Close the page
          await page.close();
          return isRedirected;
      } catch (error) {
          console.error(`Error occurred while testing page "${url}":`, error);
      }
  }

  // Close the browser
  await browser.close();
}
checkNonHTMLContentAccessibility().then((isRedirected) => {
    if (isRedirected) {
        console.log('Some pages are redirected.');
    } else {
        console.log('No pages are redirected.');
    }
    });
    



const Blank = async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    let url = 'https://autotest.handsintechnology.in/sign-up';

    try {
        // Open a new page for each URL
        const page = await context.newPage();

        // Enable request interception
        await page.route('**', route => {
            if (route.request().url().includes('https://securitytool.handsintechnology.in/api/client/protection')) {
                // Bypass the interception for this URL
                route.continue();
            } else {
                if (route.request().method() === 'POST') {
                    console.log('Request URL:', route.request().url());
                }
                route.continue();
            }
        });

        // Navigate to the page
        await page.goto(url, { timeout: 60000 });

        // Wait for the page to load completely
        await page.waitForLoadState('networkidle', { timeout: 60000 });

        // Capture initial page state
        const initialText = await page.evaluate(() => document.body.innerText);

        let getEmailInput = await page.$('input[type="email"]');
        let usernameInput = await page.$('input[type="text"]');
        let getPasswordInput = await page.$('input[type="password"]');


        if (getEmailInput) {
            await getEmailInput.fill('input[type="email"]', 'shivam@example.com')
        }
        if (usernameInput) {
            await usernameInput.fill('input[type="text"]', 'shivam')
        }
        if (getPasswordInput) {
            await getPasswordInput.fill('input[type="password"]', '')
        }

        // Get all buttons on the page
        const buttons = await page.$$('button, input[type="submit"]');

        // Define the possible button text variations
        const buttonVariations = ['Sign Up', 'Create Account', 'Register', 'Submit'];

        // Find the button with one of the possible text variations
        let submitButton = null;
        for (const button of buttons) {
            for (const text of buttonVariations) {
                const buttonText = await button.textContent();
                if (buttonText.includes(text)) {
                    submitButton = button;
                    break;
                }
            }
            if (submitButton) break;
        }

        if (submitButton) {
            await Promise.all([
                submitButton.click(),
                page.waitForNavigation({ waitUntil: 'load', timeout: 60000 }) // Increase timeout to 60 seconds
            ]);
        } else {
            console.error('Submit button not found.');
        }

        // Wait for some time for the next action or page to load
        // await page.waitForTimeout(2000);

        // Capture page state after login
        const changedText = await page.evaluate(() => document.body.innerText);
        // Split the text content into an array of lines
        const initialLines = initialText.split('\n');
        const changedLines = changedText.split('\n');

        // Identify and log the changed text content
        changedLines.forEach((line, index) => {
            if (line !== initialLines[index]) {
                console.log('Changed content:', line);
            }
        });

        // Close the page
        await page.close();
    } catch (error) {
        console.error(`Error occurred while testing page "${url}":`, error);
    }

    // Close the browser
    await browser.close();
};

Blank()



