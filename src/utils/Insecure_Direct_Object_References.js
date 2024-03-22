// Directory listing is enabled on the server
const axios = require('axios');

// Function to test directory listing for a given path
async function testDirectoryListing(url, path) {
    url = `${url}/${path}`;
    console.log("url", url)

    try {
        const response = await axios.get(url).then((response) => response).catch((error) => error.response || error);

        if (response.status === 200 && response.data.includes('Index of')) {
            console.log(`Directory listing enabled for ${url}`);
            return `Directory listing enabled for ${url}`;
        }
    } catch (err) {
        console.error(`Error accessing ${url}:`, err.message);
        return `Error accessing ${url}: ${err.message}`;
    }
}

// Function to test directory listing for each path
async function testAllPathsDirectoryListing(url) {
    const paths = ['', 'images', 'public', 'protected'];

    try {
        const results = await Promise.all(paths.map(async (path) => {
            return await testDirectoryListing(url, path);
        }));
        return results;
    } catch (error) {
        throw error;
    }
}

//End  Directory listing is enabled on the server
module.exports = {
    testAllPathsDirectoryListing  // Directory listing is enabled on the server  function 
}
