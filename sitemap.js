// create generator
let url = "http://mlsadmin.sblcorp.com/"
const { chromium } = require('playwright');
const axios = require('axios');
const cheerio = require('cheerio');

async function crawlLinks(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const links = [];
        $('a').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                links.push(href);
            }
        });

        return links;
    } catch (error) {
        console.error('Error crawling links:', error);
        return [];
    }
}

// Example usage:
const urlToCrawl = 'https://example.com';
crawlLinks(urlToCrawl)
    .then(links => {
        console.log('Links found on', urlToCrawl);
        links.forEach(link => console.log(link));
    })
    .catch(error => {
        console.error('Error crawling links:', error);
    });
0

