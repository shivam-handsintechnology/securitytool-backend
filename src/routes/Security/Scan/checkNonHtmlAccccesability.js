const { chromium } = require('playwright');
const playwright = require('playwright');
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
async function scrapWebsite(url, res,SerEnventData, visited = new Set(), isFirstPage = true) {
  if (visited.has(url)) {
    return visited;
  }

  SerEnventData({ message: `Scanning page "${url}"`, time: Date.now() },res);
  visited.add(url);

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setDefaultNavigationTimeout(60000);

  // Navigate to the web application
  await page.goto(url);

  const uniqueLinks = new Set();
  const baseUrl = new URL(url);

  const hrefs = await page.$$eval('a[href]', links => links.map(link => link.getAttribute('href')));

  hrefs.forEach(href => {
    if (href && href.trim().length > 0) {

      const parsedUrl = new URL(href, baseUrl);
      if (parsedUrl.hostname === baseUrl.hostname && !(isFirstPage && parsedUrl.pathname === '/')) {
        if (!parsedUrl.href.includes("#") && !parsedUrl.href.includes("mailto") && !parsedUrl.href.includes("tel") && !parsedUrl.href.includes("javascript") && !parsedUrl.href.includes("pdf") && !parsedUrl.href.includes("jpg") && !parsedUrl.href.includes("png") && !parsedUrl.href.includes("jpeg") && !parsedUrl.href.includes("doc") && !parsedUrl.href.includes("docx") && !parsedUrl.href.includes("xls") && !parsedUrl.href.includes("xlsx") && !parsedUrl.href.includes("ppt") && !parsedUrl.href.includes("pptx") && !parsedUrl.href.includes("csv") && !parsedUrl.href.includes("xml") && !parsedUrl.href.includes("json") && !parsedUrl.href.includes("zip") && !parsedUrl.href.includes("rar") && !parsedUrl.href.includes("tar") && !parsedUrl.href.includes("gz") && !parsedUrl.href.includes("7z") && !parsedUrl.href.includes("mp3") && !parsedUrl.href.includes("mp4") && !parsedUrl.href.includes("avi") && !parsedUrl.href.includes("mov") && !parsedUrl.href.includes("wmv") && !parsedUrl.href.includes("flv") && !parsedUrl.href.includes("ogg") && !parsedUrl.href.includes("webm") && !parsedUrl.href.includes("wav") && !parsedUrl.href.includes("wma") && !parsedUrl.href.includes("aac") && !parsedUrl.href.includes("flac") && !parsedUrl.href.includes("alac") && !parsedUrl.href.includes("aiff") && !parsedUrl.href.includes("ape") && !parsedUrl.href.includes("m4a") && !parsedUrl.href.includes("mid") && !parsedUrl.href.includes("midi") && !parsedUrl.href.includes("amr") && !parsedUrl.href.includes("mka") && !parsedUrl.href.includes("opus") && !parsedUrl.href.includes("ra") && !parsedUrl.href.includes("rm") && !parsedUrl.href.includes("vqf") && !parsedUrl.href.includes("wv") && !parsedUrl.href.includes("webp") && !parsedUrl.href.includes("svg") && !parsedUrl.href.includes("gif") && !parsedUrl.href.includes("bmp") && !parsedUrl.href.includes("ico") && !parsedUrl.href.includes("tiff") && !parsedUrl.href.includes("psd") && !parsedUrl.href.includes("eps") && !parsedUrl.href.includes("ai") && !parsedUrl.href.includes("indd") && !parsedUrl.href.includes("raw") && !parsedUrl.href.includes("cr2") && !parsedUrl.href.includes("nef") && !parsedUrl.href.includes("orf") && !parsedUrl.href.includes("sr2") && !parsedUrl.href.includes("pef") && !parsedUrl.href.includes("dng") && !parsedUrl.href.includes("x3f") && !parsedUrl.href.includes("arw") && !parsedUrl.href.includes("rw2") && !parsedUrl.href.includes("rwl")

        ) {
          uniqueLinks.add(parsedUrl.href);
        }
      }
    }
  });

  await browser.close();


  // Recursively scrap each unique link
  for (const link of uniqueLinks) {
    if (!link.includes("#") && !link.includes("mailto") && !link.includes("tel") && !link.includes("javascript") && !link.includes("pdf") && !link.includes("jpg") && !link.includes("png") && !link.includes("jpeg") && !link.includes("doc") && !link.includes("docx") && !link.includes("xls") && !link.includes("xlsx") && !link.includes("ppt") && !link.includes("pptx") && !link.includes("csv") && !link.includes("xml") && !link.includes("json") && !link.includes("zip") && !link.includes("rar") && !link.includes("tar") && !link.includes("gz") && !link.includes("7z") && !link.includes("mp3") && !link.includes("mp4") && !link.includes("avi") && !link.includes("mov") && !link.includes("wmv") && !link.includes("flv") && !link.includes("ogg") && !link.includes("webm") && !link.includes("wav") && !link.includes("wma") && !link.includes("aac") && !link.includes("flac") && !link.includes("alac") && !link.includes("aiff") && !link.includes("ape") && !link.includes("m4a") && !link.includes("mid") && !link.includes("midi") && !link.includes("amr") && !link.includes("mka") && !link.includes("opus") && !link.includes("ra") && !link.includes("rm") && !link.includes("vqf") && !link.includes("wv") && !link.includes("webp") && !link.includes("svg") && !link.includes("gif") && !link.includes("bmp") && !link.includes("ico") && !link.includes("tiff") && !link.includes("psd") && !link.includes("eps") && !link.includes("ai") && !link.includes("indd") && !link.includes("raw") && !link.includes("cr2") && !link.includes("nef") && !link.includes("orf") && !link.includes("sr2") && !link.includes("pef") && !link.includes("dng") && !link.includes("x3f") && !link.includes("arw") && !link.includes("rw2") && !link.includes("rwl")) {
      await scrapWebsite(link, res,SerEnventData, visited, false);
    }

  }

  return visited;
}
const scanNonHTMLContentAccessibility = async (url, res, SerEnventData) => {
  try {

    const browser = await chromium.launch();
    const context = await browser.newContext();


    // Open a new page for each URL
    const page = await context.newPage();
    let navigationSuccessful = false;
    let attempts = 0;

    while (!navigationSuccessful && attempts < 3) {
      try {
        if (authenticatedRoutes.some(route => url.includes(route))) {
          // Navigate to the page
          await page.goto(url, { timeout: 60000 }); // Increase the timeout to 60 seconds

          // Wait for the page to load completely
          await page.waitForLoadState('networkidle', { timeout: 60000 }); // Increase the timeout to 60 seconds

          // Get the final URL after any redirects
          const finalUrl = page.url();

          if (finalUrl !== url) {
            SerEnventData({message:`Non-HTML Content Accessibility  Failed Page ${url} redirects to ${finalUrl}`},res)
          } else if (finalUrl === url) {
            SerEnventData({message:`Non-HTML Content Accessibility Passed Page ${url} is accessible`},res)
          }
          navigationSuccessful = true;
        }else{
          SerEnventData({message:`Non-HTML Content Accessibility  Failed Page ${url} is not accessible`},res)
        }
      } catch (error) {
        console.error(`Error occurred while testing page "${url}":`, error);
        attempts++;
      }
    }

    if (!navigationSuccessful) {
      SerEnventData({message:`Non-HTML Content Accessibility  Failed Error occurred while testing page ${url}`}, res)
    }

    // Close the page
    await page.close();


    // Close the browser
    await browser.close();
  } catch (error) {
    console.log('Error:', error);
    SerEnventData({message:`Non-HTML Content Accessibility", "Failed", Error occurred while testing page ${url}`},res)
  }
}
const checkNonHTMLContentAccessibility = async (websiteUrl, res, SerEnventData) => {
  try {
    const visitedLinks = await scrapWebsite(websiteUrl, res,SerEnventData);
    let links = await Array.from(visitedLinks);
    console.log('Visited links:', visitedLinks);

    links.forEach(async link => {
      await scanNonHTMLContentAccessibility(link, res, SerEnventData).catch(error => console.error(error))
    }
    )

  } catch (error) {
    console.log("error", error)
  }
}
module.exports = { checkNonHTMLContentAccessibility };