const puppeteer = require('puppeteer');

async function scrapeFrameworks(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const frameworks = await page.evaluate(() => {
    const frameworksUsed = {
      frontend: [],
      backend: []
    };

    // Check for frontend JavaScript frameworks
    const scriptTags = document.querySelectorAll('script[src]');
    scriptTags.forEach(script => {
      const src = script.getAttribute('src');
      console.log("src",src)
      if (src.includes('angular') || src.includes('react') || src.includes('vue')) {
        frameworksUsed.frontend.push(src);
      }
    });

    // Check for backend frameworks in HTML comments or other indicators
    const comments = document.querySelectorAll('body *');
    comments.forEach(element => {
      if (element.nodeType === 8) { // Comment node
        const commentText = element.nodeValue.trim();
        if (commentText.includes('Express') || commentText.includes('Django') || commentText.includes('Rails')) {
          frameworksUsed.backend.push(commentText);
        }
      }
    });

    return frameworksUsed;
  });

  await browser.close();
  return frameworks;
}

const domain = 'https://www.c3xpress.com/'; // Replace with the domain you want to scrape
scrapeFrameworks(domain)
  .then(frameworks => {
    console.log('JavaScript frameworks used in the frontend:', frameworks.frontend);
    console.log('Backend frameworks used:', frameworks.backend);
  })
  .catch(err => {
    console.error('Error:', err);
  });
