const axios = require('axios');
const cheerio = require('cheerio');
const unpack = require('unpack');
const fs=require("fs")
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
            console.log("scriptSrc",scriptSrc)
           !scriptSrc.includes("http") && fetchPromises.push(axios.get(url+scriptSrc));
        });

        // Wait for all script content to be fetched
        const scriptResponses = await Promise.all(fetchPromises);

        // Check each script content for React patterns
        for (const response of scriptResponses) {
            const scriptContent = response.data;
            if (/React/.test(scriptContent) || /ReactDOM/.test(scriptContent) || /@babel\/react/.test(scriptContent)) {
                 unpack(scriptContent)
                .then(deobfuscatedCode => {
                  console.log(deobfuscatedCode);
                  // You can also write the deobfuscated code to a file
                return deobfuscatedCode
                })
                .catch(error => {
                  console.error('Error deobfuscating bundle:', error);
                });; // Return beautified script content
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
const url = 'https://lmpfrontend.handsintechnology.in'; 
hasReactPatternsInScripts(url)
    .then(reactScriptContent => {
        if (reactScriptContent) {
            console.log('The page contains React patterns in one of its scripts.');
            console.log('Beautified JavaScript content:');
           fs.writeFileSync("react.js",JSON.stringify(reactScriptContent))
         
            // Proceed to further analysis if needed
        } else {
            console.log('The page does not contain React patterns in its scripts.');
        }
    });


