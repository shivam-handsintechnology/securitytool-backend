const { chromium } = require('playwright');
const LoginPages=[
  'login',
  'signin',
  'authenticate',
  'auth',
 
]
async function scrapWebsite( url, socket, visited = new Set(), isFirstPage = true) {
    if (visited.has(url)) {
      return visited;
    }
  
     console.log(`Scanning ${url}...`);
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
        await scrapWebsite(event, link, socket, visited, false);
      }
  
    }
  
    return visited;
  }
async function checkLoginPage(Login) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Navigate to the login page
        await page.goto(`https://mlsdev.sblcorp.com/${Login}`);
        await page.waitForLoadState('domcontentloaded');

        // Get the initial text content
        const initialTextContent = await page.evaluate(() => {
            return document.body.textContent.trim();
        });

        // Wait for the form to load with increased timeout
        const form = await page.$('form');
        if (!form) {
            throw new Error('Form not found');
        }
        if (form) {
            console.log("Form is available");
            // Call the function to fill input fields
            await fillInputFields(page);
        }

        // Listen for network requests
        const requests = [];
        page.on('request', request => {
            // Check if it's an XHR or Fetch request
            if (request.resourceType() === 'xhr' || (request.resourceType() === 'fetch' && request.method() === 'POST')) {
                requests.push(request);
            }
        });

        // Wait for all requests to finish
        await Promise.all(requests.map(request => request.response()));

        // Get the final text content after all requests
        const finalTextContent = await page.evaluate(() => {
            return document.body.textContent.trim();
        });

        // Extract and display changed text content
        const changedLines = getChangedLines(finalTextContent, initialTextContent);
        if (changedLines.length > 0) {
            console.log('Changed text content after all requests:');
            changedLines.forEach(line => console.log(line));
        } else {
            console.log('No changes detected in text content after all requests.');
        }

    } catch (error) {
        console.error('Error occurred:', error.message);
    } finally {
        // Close the browser
        await browser.close();
    }
}

async function fillInputFields(page) {
    try {
        // Fill input fields based on type
        await fillInputField(page, 'input[type="text"]', '');
        await fillInputField(page, 'input[type="email"]', '');
        await fillInputField(page, 'input[type="number"]', '');
        await fillInputField(page, 'input[type="date"]', '');
        await fillInputField(page, 'input[type="password"]', '');
        await fillInputField(page, 'input[name="date"]', '');
        // Click the submit button
        await page.click('button[type="submit"]');
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

async function fillInputField(page, selector, value) {
    try {
        const input = await page.$(selector);
        if (input) {
            await input.fill(value);
        } else {
            console.log(`Skipping input field: ${selector} (not found)`);
        }
    } catch (error) {
        console.error(`Error filling input field ${selector}:`, error);
    }
}

// Helper function to get the changed lines in text content
function getChangedLines(newText, oldText) {
    const newLines = newText.split('\n');
    const oldLines = oldText.split('\n');
    const changedLines = newLines.filter(line => !oldLines.includes(line));
    return changedLines;
}

async function scrapWebsite(event, url, res, visited = new Set(), isFirstPage = true) {
  if (visited.has(url)) {
    return visited;
  }

  res.write(JSON.stringify({ message: `Scanning ${url}...` }))
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
      await scrapWebsite(event, link, res, visited, false);
    }

  }

  return visited;
}

const BlackPasswordValidation = async (websiteUrl, res) => {
  try {
    const visitedLinks = await scrapWebsite("'non-html-content-accessibility'", websiteUrl, res);
    let links = await Array.from(visitedLinks);
    console.log('Visited links:', visitedLinks);

    links.forEach(async link => {
      LoginPages.some(async page => {
        if (link.includes(page)) {
          await checkLoginPage(page, res).catch(error => console.error(error))
        }
      })
    
    }
    )

  } catch (error) {
    console.log("error", error)
  }
}

  module.exports = {BlackPasswordValidation};

