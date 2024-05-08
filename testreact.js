const axios = require('axios');
const cheerio = require('cheerio');
const unpack = require('unpack');

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
      console.log("scriptSrc", scriptSrc);
      !scriptSrc.includes("http") && fetchPromises.push(axios.get(url + scriptSrc));
    });

    // Wait for all script content to be fetched
    const scriptResponses = await Promise.all(fetchPromises);

    // Check each script content for React patterns
    for (const response of scriptResponses) {
      const scriptContent = response.data;
      if (/React/.test(scriptContent) || /ReactDOM/.test(scriptContent) || /@babel\/react/.test(scriptContent)) {
        const deobfuscatedCode = unpack(scriptContent);
        extractAxiosCalls(deobfuscatedCode);
        extractFetchCalls(deobfuscatedCode);
        return deobfuscatedCode;
      }
    }

    // If no script contains React patterns
    return null;
  } catch (error) {
    console.error('Error fetching URL:', error);
    return null;
  }
}

async function extractAxiosCalls(bundleContent) {
  try {
    // Find all Axios calls
    const axiosCallRegex = /axios\.(get|post|put|delete)\(('|")(.*?)('|"),\s*(\{[\s\S]*?\})/g;
    const axiosCalls = [];
    let match;

    while ((match = axiosCallRegex.exec(bundleContent)) !== null) {
      const method = match[1];
      const url = match[3];
      const config = match[5];

      axiosCalls.push({
        method,
        url,
        config: JSON.parse(config.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')), // Convert object keys to valid JSON
      });
    }

    console.log('Axios calls found in the script:');
    console.log(axiosCalls);
  } catch (error) {
    console.error('Error extracting Axios calls:', error);
  }
}

function extractFetchCalls(bundleContent) {
  try {
    // Find all fetch calls
    const fetchCallRegex = /fetch\(('|")(.*?)('|")(,\s*(\{[\s\S]*?\}))?/g;
    const fetchCalls = [];
    let match;

    while ((match = fetchCallRegex.exec(bundleContent)) !== null) {
      const url = match[2];
      const config = match[5] || '{}';

      fetchCalls.push({
        url,
        config: JSON.parse(config.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')), // Convert object keys to valid JSON
      });
    }

    console.log('Fetch calls found in the script:');
    console.log(fetchCalls);
  } catch (error) {
    console.error('Error extracting fetch calls:', error);
  }
}

// Example usage
const url = 'https://lmpfrontend.handsintechnology.in';
hasReactPatternsInScripts(url)
  .then(reactScriptContent => {
    if (reactScriptContent) {
      console.log('The page contains React patterns in one of its scripts.');
      console.log('Beautified JavaScript content:');
      // Proceed to further analysis if needed
    } else {
      console.log('The page does not contain React patterns in its scripts.');
    }
  });