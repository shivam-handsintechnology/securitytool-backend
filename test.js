const puppeteer = require('puppeteer');

async function checkAutoComplete(url) {
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
        // Find input fields within a specific section of the page
        const iframes = await page.$$eval('iframe', iframes => iframes.map(iframe => iframe.outerHTML));
  
        if (iframes.length > 0) {
          console.log('The page contains iframes which may be indicative of clickjacking vulnerability.');
          iframes.forEach(iframe => console.log(iframe));
        } else {
          console.log('The page does not contain any iframes.');
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


// Example usage
// checkAutoComplete('https://timesofindia.indiatimes.com').catch(error => console.error(error));

const url = require('url');

async function scrapWebsite(url, visited = new Set(), isFirstPage = true) {
  if (visited.has(url)) {
      // console.log(`Skipping already visited link: ${url}`);
      return visited;
  }

  const startTime = new Date();

  console.log(`Scanning ${url}...`);
  visited.add(url);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const uniqueLinks = new Set();
  const baseUrl = new URL(url);

  const hrefs = await page.$$eval('a[href]', links => links.map(link => link.getAttribute('href')));

  hrefs.forEach(href => {
      if (href && href.trim().length > 0) {
          const parsedUrl = new URL(href, baseUrl);
          if (parsedUrl.hostname === baseUrl.hostname && !(isFirstPage && parsedUrl.pathname === '/')) {
              if(!parsedUrl.href.includes("#") && !parsedUrl.href.includes("mailto") && !parsedUrl.href.includes("tel") && !parsedUrl.href.includes("javascript") && !parsedUrl.href.includes("pdf") && !parsedUrl.href.includes("jpg") && !parsedUrl.href.includes("png") && !parsedUrl.href.includes("jpeg") && !parsedUrl.href.includes("doc") && !parsedUrl.href.includes("docx") && !parsedUrl.href.includes("xls") && !parsedUrl.href.includes("xlsx") && !parsedUrl.href.includes("ppt") && !parsedUrl.href.includes("pptx") && !parsedUrl.href.includes("csv") && !parsedUrl.href.includes("xml") && !parsedUrl.href.includes("json") && !parsedUrl.href.includes("zip") && !parsedUrl.href.includes("rar") && !parsedUrl.href.includes("tar") && !parsedUrl.href.includes("gz") && !parsedUrl.href.includes("7z") && !parsedUrl.href.includes("mp3") && !parsedUrl.href.includes("mp4") && !parsedUrl.href.includes("avi") && !parsedUrl.href.includes("mov") && !parsedUrl.href.includes("wmv") && !parsedUrl.href.includes("flv") && !parsedUrl.href.includes("ogg") && !parsedUrl.href.includes("webm") && !parsedUrl.href.includes("wav") && !parsedUrl.href.includes("wma") && !parsedUrl.href.includes("aac") && !parsedUrl.href.includes("flac") && !parsedUrl.href.includes("alac") && !parsedUrl.href.includes("aiff") && !parsedUrl.href.includes("ape") && !parsedUrl.href.includes("m4a") && !parsedUrl.href.includes("mid") && !parsedUrl.href.includes("midi") && !parsedUrl.href.includes("amr") && !parsedUrl.href.includes("mka") && !parsedUrl.href.includes("opus") && !parsedUrl.href.includes("ra") && !parsedUrl.href.includes("rm") && !parsedUrl.href.includes("vqf") && !parsedUrl.href.includes("wv") && !parsedUrl.href.includes("webp") && !parsedUrl.href.includes("svg") && !parsedUrl.href.includes("gif") && !parsedUrl.href.includes("bmp") && !parsedUrl.href.includes("ico") && !parsedUrl.href.includes("tiff") && !parsedUrl.href.includes("psd") && !parsedUrl.href.includes("eps") && !parsedUrl.href.includes("ai") && !parsedUrl.href.includes("indd") && !parsedUrl.href.includes("raw") && !parsedUrl.href.includes("cr2") && !parsedUrl.href.includes("nef") && !parsedUrl.href.includes("orf") && !parsedUrl.href.includes("sr2") && !parsedUrl.href.includes("pef") && !parsedUrl.href.includes("dng") && !parsedUrl.href.includes("x3f") && !parsedUrl.href.includes("arw") && !parsedUrl.href.includes("rw2") && !parsedUrl.href.includes("rwl") ){
              uniqueLinks.add(parsedUrl.href);
              }
          }
      }
  });

  await browser.close();

  const endTime = new Date();
  const timeElapsed = (endTime - startTime) / 1000;
  console.log(`Scanning ${url} complete. Time elapsed: ${timeElapsed} seconds`);

  // Recursively scrap each unique link
  for (const link of uniqueLinks) {
      if(!link.includes("#") && !link.includes("mailto") && !link.includes("tel") && !link.includes("javascript") && !link.includes("pdf") && !link.includes("jpg") && !link.includes("png") && !link.includes("jpeg") && !link.includes("doc") && !link.includes("docx") && !link.includes("xls") && !link.includes("xlsx") && !link.includes("ppt") && !link.includes("pptx") && !link.includes("csv") && !link.includes("xml") && !link.includes("json") && !link.includes("zip") && !link.includes("rar") && !link.includes("tar") && !link.includes("gz") && !link.includes("7z") && !link.includes("mp3") && !link.includes("mp4") && !link.includes("avi") && !link.includes("mov") && !link.includes("wmv") && !link.includes("flv") && !link.includes("ogg") && !link.includes("webm") && !link.includes("wav") && !link.includes("wma") && !link.includes("aac") && !link.includes("flac") && !link.includes("alac") && !link.includes("aiff") && !link.includes("ape") && !link.includes("m4a") && !link.includes("mid") && !link.includes("midi") && !link.includes("amr") && !link.includes("mka") && !link.includes("opus") && !link.includes("ra") && !link.includes("rm") && !link.includes("vqf") && !link.includes("wv") && !link.includes("webp") && !link.includes("svg") && !link.includes("gif") && !link.includes("bmp") && !link.includes("ico") && !link.includes("tiff") && !link.includes("psd") && !link.includes("eps") && !link.includes("ai") && !link.includes("indd") && !link.includes("raw") && !link.includes("cr2") && !link.includes("nef") && !link.includes("orf") && !link.includes("sr2") && !link.includes("pef") && !link.includes("dng") && !link.includes("x3f") && !link.includes("arw") && !link.includes("rw2") && !link.includes("rwl") ){
        await scrapWebsite(link, visited, false);
      }
     
  }

  return visited;
}
const websiteUrl = 'https://lmpfrontend.handsintechnology.in';
scrapWebsite(websiteUrl)
  .then(visitedLinks => {
    let links=Array.from(visitedLinks);
    links.forEach(link => {
checkAutoComplete(link).catch(error => console.error(error));
}
    );
      console.log('Total visited links:', visitedLinks.size,
          '\nList of visited links:',Array.from(visitedLinks)  );
  })
  .catch(error => {
      console.error('Error:', error);
  });
// Example usage

// Example usage

// 
