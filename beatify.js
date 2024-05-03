const axios = require('axios');
const cheerio = require('cheerio');
const jsbeautify = require('js-beautify').js;

async function hasReactPatternsInScripts(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;

        const $ = cheerio.load(html);

        // Find all script tags with a src attribute
        const scriptTagsWithSrc = $('script[src]');

        // Array to store promises for fetching script content
        const fetchPromises = [];

        // Iterate over each script tag and fetch its content
        scriptTagsWithSrc.each((index, element) => {
            const scriptSrc = $(element).attr('src');
            fetchPromises.push(axios.get(scriptSrc));
        });

        // Wait for all script content to be fetched
        const scriptResponses = await Promise.all(fetchPromises);

        // Check each script content for React patterns
        for (const response of scriptResponses) {
            const scriptContent = response.data;
            if (/React/.test(scriptContent) || /ReactDOM/.test(scriptContent) || /@babel\/react/.test(scriptContent)) {
                return jsbeautify(scriptContent, { indent_size: 2 }); // Return beautified script content
            }
        }

        // If no script contains React patterns
        return null;
    } catch (error) {
        console.error('Error fetching URL:', error);
        return null;
    }
}

// Example usage
const url = 'https://lmpfrontend.handsintechnology.in/'; 
hasReactPatternsInScripts(url)
    .then(reactScriptContent => {
        if (reactScriptContent) {
            console.log('The page contains React patterns in one of its scripts.');
            console.log('Beautified JavaScript content:');
            console.log(reactScriptContent);
            // Proceed to further analysis if needed
        } else {
            console.log('The page does not contain React patterns in its scripts.');
        }
    });


