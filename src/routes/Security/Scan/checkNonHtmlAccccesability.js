const { chromium } = require('playwright');
const cheerio = require('cheerio');

const authenticatedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/account',
  '/orders',
  '/cart',
  '/checkout',
  '/billing',
  '/subscriptions',
  '/messages',
  '/notifications',
  '/admin',
  '/analytics',
  '/reports',
  '/projects',
  '/tasks',
  '/team',
  '/documents',
  '/files',
  '/uploads',
  '/downloads',
  '/bookmarks',
  '/favorites',
  '/galleries',
  '/playlists',
  '/campaigns',
  '/leads',
  '/contacts',
  '/calendar',
  '/appointments',
  '/schedule',
  '/timesheet',
  '/payroll',
  '/invoices',
  '/expenses',
  '/budgets',
  '/finance',
  '/tax',
  '/compliance',
  '/support',
  '/tickets',
  '/knowledgebase',
  '/forums',
  '/blogs',
  '/articles',
  '/comments',
  '/reviews',
  '/ratings',
  '/votes',
  '/polls',
  '/surveys',
  '/feedback',
  '/suggestions',
  '/ideas',
  '/roadmap',
  '/changelog',
  '/updates',
  '/releases',
  '/versions',
  '/contributors',
  '/members',
  '/followers',
  '/ress',
  '/friends',
  '/groups',
  '/communities',
  '/channels',
  '/streams',
  '/broadcasts',
  '/livestreams',
  '/webinars',
  '/workshops',
  '/courses',
  '/lessons',
  '/modules',
  '/quizzes',
  '/exams',
  '/certifications',
  '/badges',
  '/achievements',
  '/leaderboards',
  '/scorecards',
  '/metrics',
  '/insights',
  '/reports',
  '/audits',
  '/logs',
  '/monitoring',
  '/alerts',
  '/incidents',
  '/outages',
  '/maintenance',
  '/backups',
  '/restores',
  '/migrations',
  '/upgrades',
  '/installations',
  '/deployments',
  '/integrations',
  '/apis',
  '/webhooks',
  '/plugins',
  '/extensions',
  '/addons',
  '/customizations',
  '/preferences',
  '/configurations',
  '/settings',
  '/security',
  '/permissions',
  '/roles',
  '/access',
  '/authorization',
  '/authentication',
  '/sessions',
  '/passwords',
  '/reset',
  '/verify',
  '/activate',
  '/deactivate',
  '/suspend',
  '/terminate',
  '/delete',
  '/archive',
  '/restore',
  '/import',
  '/export',
  '/backup',
  '/migrate',
  '/transfer',
  '/convert',
  '/transform',
  '/translate',
  '/localize',
  '/internationalize'
];
const hints404 = [
  "Not Found",
  "404 Not Found",
  "Page Not Found",
  "404 Error",
  "The page you requested could not be found",
  "We couldn't find the page you were looking for",
  "The requested URL was not found on this server",
  "Oops! 404",
  "Error 404",
  "The page you are looking for might have been removed",
  "The URL you requested does not exist",
  "The page you're trying to access cannot be found",
  "Sorry, the page you're looking for is not found",
  "Whoops, looks like this page is missing",
  "This page doesn't exist or has been removed",
  "The content you're seeking could not be found",
  "Apologies, but the page you requested was not found",
  "We're unable to locate the page you're searching for",
  "Unfortunately, the requested page is nowhere to be found",
  "The page you're looking for seems to be lost in cyberspace",
  "This URL doesn't lead anywhere, it's a dead end"
];
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
const scanNonHTMLContentAccessibility = async (url, res, SerEnventData) => {
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    let navigationSuccessful = false;
    let attempts = 0;
    while (!navigationSuccessful && attempts < 3) {
      try {
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });

        const response = await page.waitForLoadState('networkidle');

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
          SerEnventData({ error: false, message: `Non-HTML Content Accessibility: No  (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
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
              SerEnventData({ error: true, message: `Non-HTML Content Accessibility:Yes (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
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
      SerEnventData({ error: true, message: `Non-HTML Content Accessibility: No`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
    }
    await page.close();
    await browser.close();
    return { success: true, message: `Scan Completed` };
  } catch (error) {
    console.log('Error:', error);
    SerEnventData({ message: `Non-HTML Content Accessibility Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
    return { success: false, message: `Non-HTML Content Accessibility Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) };
  }
};




const checkNonHTMLContentAccessibility = async (websiteUrl, res, SerEnventData) => {
  return new Promise(async (resolve, reject) => {
    try {
      for (const link of authenticatedRoutes) {
        const response = await scanNonHTMLContentAccessibility(websiteUrl + link, res, SerEnventData);
        console.log(response)
        // You can handle the response here if needed before moving to the next iteration
      }
      resolve("Completed");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { checkNonHTMLContentAccessibility, directoryListingPatterns };