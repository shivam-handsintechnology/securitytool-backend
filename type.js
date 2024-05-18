const axios = require('axios');
const cheerio = require('cheerio');


async function crawl(url) {
    return new Promise(async (resolve, reject) => {
        const baseURL = 'https://example.com';  // Replace with your website's base URL
        const visitedUrls = new Set();
        const sitemapUrls = new Set();
        if (visitedUrls.has(url) || !url.startsWith(baseURL)) return;

        try {
            visitedUrls.add(url);

            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            $('a[href]').each((_, element) => {
                const link = $(element).attr('href');
                const absoluteLink = new URL(link, baseURL).href;
                if (!visitedUrls.has(absoluteLink) && absoluteLink.startsWith(baseURL)) {
                    crawl(absoluteLink);
                }
            });

            let response = sitemapUrls.add(url);
            resolve(response)

        } catch (error) {
            console.error(`Error crawling ${url}: ${error.message}`);
            reject(error)
        }
    })
}
let test = async () => {
    await crawl('https://www.udemy.com/').then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log("error ", err)
    })
}
test()
