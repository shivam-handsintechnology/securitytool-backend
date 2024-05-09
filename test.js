const {chromium} = require('playwright');
const checkNonHTMLContentAccessibility = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

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
         
           url.includes('profile') &&  console.log(pageContent)
           

          if (pageContent.includes("404") && pageContent.includes("not found")) {
              console.log(`Page "${url}" contains 404 Not Found. Skipping redirection check.`);
          } else {
              // Get the final URL after any redirects
              const finalUrl = page.url();

              if (finalUrl === url) {
                  console.log(`Page "${url}" is not redirected.`);
              } else {
                  console.log(`Page "${url}" is redirected to: ${finalUrl}`);
              }
          }

          // Close the page
          await page.close();
      } catch (error) {
          console.error(`Error occurred while testing page "${url}":`, error);
      }
  }

  // Close the browser
  await browser.close();
}


const Blank = async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    let url = 'https://autotest.handsintechnology.in/sign-up';

    try {
        // Open a new page for each URL
        const page = await context.newPage();
   // Enable request interception
   await page.route('**', route => {
    console.log('Request URL:', route.request().url());
    console.log('Request Method:', route.request().method());
    route.continue();
});
        // Navigate to the page
        await page.goto(url, { timeout: 60000 }); // Increase the timeout to 60 seconds

        // Capture initial page state
        const initialText = await page.evaluate(() => document.body.innerText);
        
        let getEmailInput = await page.$('input[type="email"]');
        let usernameInput= await page.$('input[type="text"]')
        let getPasswordInput = await page.$('input[type="password"]');
        let getSubmitButton = await page.$('button:text("Sign Up")');
        const getsubmitInput = await page.$('input[type="submit"]');
        const Submitbutton = await page.$('button:text("Sign Up")');
        
        if (getEmailInput) {
            await getEmailInput.fill('input[type="email"]', 'shivam@example.com')
        }
        if(usernameInput){
            await usernameInput.fill('input[type="text"]', 'shivam')
        }
        if (getPasswordInput) {
            await getPasswordInput.fill('input[type="password"]', '')
        }
        if (getSubmitButton) {
         await Promise.all([
            await getSubmitButton.click(),
           await   page.waitForNavigation({ waitUntil: 'domcontentloaded' })
         ])
        }
        if (!getsubmitInput && getsubmitInput) {
         await Promise.all([
            await getsubmitInput.click(),
           await  page.waitForNavigation({ waitUntil: 'domcontentloaded' })
         ])
        }
        if (!getsubmitInput && !getsubmitInput && Submitbutton) {
        await Promise.all([
            await Submitbutton.click(),
           await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
         ])
        }

        // Wait for some time for the next action or page to load
        // await page.waitForTimeout(2000);
      // Check if any URL is hit

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

// Call the function to execute the automation
Blank();


