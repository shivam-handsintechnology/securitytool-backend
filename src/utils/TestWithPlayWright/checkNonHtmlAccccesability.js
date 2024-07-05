const { chromium } = require('playwright');

const { authenticatedRoutes, hints404, directoryListingPatterns } = require("../../data/json/ApplicationTestingData.json");
const { extractVisibleText, takeScreenshot } = require('..');

let lowerCasehitn404 = hints404.map((item) => item.toLowerCase())


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

module.exports = { checkNonHTMLContentAccessibility };