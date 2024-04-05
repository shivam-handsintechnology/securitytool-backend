const axios = require('axios');

function checkDuplicateParams(url) {
    // Regular expression to match placeholders in template literals
    const regex = /\${(\w+)}/g;

    // Extract parameter names from the URL based on the type of URL string
    let paramNames = [];
    if (url.startsWith('`')) {
        // Template literal: Extract parameter names enclosed in ${} placeholders
        let match;
        while ((match = regex.exec(url)) !== null) {
            paramNames.push(match[1]);
        }
    } else {
        // Regular string: Extract parameter names from query string
        const queryString = url.split('?')[1];
        if (queryString) {
            const queryParams = queryString.split('&');
            queryParams.forEach(queryParam => {
                const paramName = queryParam.split('=')[0];
                paramNames.push(paramName);
            });
        }
    }

    // Check for duplicate parameter names
    const duplicateParamNames = paramNames.filter((paramName, index) => paramNames.indexOf(paramName) !== index);

    return duplicateParamNames.length > 0 ? duplicateParamNames : false;
}

async function findAndCheckDuplicateParams(url) {
    try {
        // Fetch the content of the JavaScript file
        const response = await axios.get(url);
        const fileContent = response.data;

        // Use regex to find URLs in the file content
        const urlRegex = /(?:`((?:[^`\\]|\\.)*)`|'(?:[^'\\]|\\.)*'|"((?:[^"\\]|\\.)*)")/g;
        let match;
        const foundUrls = [];

        while ((match = urlRegex.exec(fileContent)) !== null) {
            // Extract the matched URL (removing surrounding quotes if present)
            const url = (match[1] || match[2] || '').replace(/\\(['"`])/g, '$1');
            foundUrls.push(url);
        }

        // Check for duplicate parameter names in each found URL
        const results = foundUrls.map(url => ({
            url,
            duplicateParams: checkDuplicateParams(url)
        }));

        return results.filter(result => result.duplicateParams !== false);
    } catch (error) {
        console.error('Error fetching or parsing the JavaScript file:', error);
        return [];
    }
}

// Example usage:
const jsFileUrl = 'http://localhost:3000/static/js/bundle.js';
findAndCheckDuplicateParams(jsFileUrl)
    .then(duplicateParamsResults => {
        if (duplicateParamsResults.length > 0) {
            duplicateParamsResults.forEach(result => {
                console.log(`Duplicate parameter names found in URL "${result.url}":`, result.duplicateParams);
            });
        } else {
            console.log('No duplicate parameter names found in the JavaScript file.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
