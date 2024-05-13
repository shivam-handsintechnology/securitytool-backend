const { chromium } = require('playwright');





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

// Blank()



async function extractRoutes(url) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let isReact = '';
  // Navigate to the website
  await page.goto(url, { waitUntil: 'networkidle' });

  // Find source files
  const sourceFiles = await page.evaluate(() => {
    const scripts = Array.from(document.getElementsByTagName('script'));
    return scripts
      .map(script => script.src)
      .filter(src => src.endsWith('.js') || src.endsWith('.jsx'));
  });

  await browser.close();
    // Check if any source file includes 'main' or 'index'
    for (const file of sourceFiles) {
      if (file.includes('main') || file.includes('index')) {
        // If a source file contains 'main' or 'index', it's likely a main file of the application
        // You can perform additional checks or actions here
        isReact = await fetch(file)
        .then(response => response.text())
        .catch(error => '');
        break;
      }
    }
    return isReact ;
}

// Usage example
const websiteUrl = 'https://www.muscleblaze.com/';

extractRoutes(websiteUrl)
  .then((data) => {
    // find routes in the react file data where to: is used 
    let routes = data.match(/to:"([^"]+)"/g);
     routes = routes ? routes.map(route => route.replace('to:', '')) : null;
     routes = routes ? routes.map(route => route.replace(/^['"]|['"]$/g, '')) : null;
    //  remove some route which internaly regitered of react
    routes = routes ? routes.filter(route => route.includes("/") ) : null;
    //  remove duplicates 
    routes = routes ? [...new Set(routes)] : null;
    if (routes) {
      routes.forEach((route, index) => {
        console.log(`Route ${index + 1}:`, route);
      });
    } else {
      console.log('No routes found.');
    }

  })
  .catch(error => {
    console.error('Error extracting routes:', error);
  });
extractRoutes(websiteUrl)
  .then((data) => {
    // find routes in the react file data where to: is used 
    let routes = data.match(/href="([^"]+)"/g);
     routes = routes ? routes.map(route => route.replace('href=', '')) : null;
     routes = routes ? routes.map(route => route.replace(/^['"]|['"]$/g, '')) : null;
    //  remove some route which internaly regitered of react
    routes = routes ? routes.filter(route => route.includes("/") ) : null;
    //  remove duplicates 
    routes = routes ? [...new Set(routes)] : null;
    if (routes) {
      routes.forEach((route, index) => {
        console.log(`Route ${index + 1}:`, route);
      });
    } else {
      console.log('No routes found.');
    }

  })
  .catch(error => {
    console.error('Error extracting routes:', error);
  });