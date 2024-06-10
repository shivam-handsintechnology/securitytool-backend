const { PlaywrightCrawler } = require('crawlee');

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
    // Use the requestHandler to process each of the crawled pages.
    async requestHandler({ request, page, enqueueLinks, log }) {
        const title = await page.title();
        log.info(`Title of ${request.loadedUrl} is '${title}'`);

        // Add the URL to the succeededUrls array
        succeededUrls.push(request.loadedUrl);

        // Extract links from the current page
        // and add them to the crawling queue.
        await enqueueLinks();
    },
    // Uncomment this option to see the browser window.
    // headless: false,
});

// Add first URL to the queue and start the crawl.
const succeededUrls = [];
(async () => {
    await crawler.run(['https://mlsadmin.sblcorp.com/']);
    console.log('Succeeded URLs:', succeededUrls);
})();