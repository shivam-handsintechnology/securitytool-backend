
const fs=require("fs")
const path=require("path")
// Middleware function to check directory listing
// Function to check if directory listing is enabled for a given directory URL
async function checkDirectoryListingEnabled(directoryUrl) {
    try {
        // Send a GET request to the directory URL
        const response = await axios.get(directoryUrl);
        // If the response status is 200, directory listing is enabled
        return response.status === 200;
    } catch (error) {
        // If an error occurs (e.g., directory does not exist or access is denied), directory listing is disabled
        return false;
    }
}
// Function to get URLs of all directories within a given directory (including subdirectories), excluding 'node_modules' and '.git'
async function getDirectoryUrls(directory) {
    try {
        let directoryUrls = [];

        // Read the contents of the directory asynchronously
        const files = await fs.promises.readdir(directory);

        // Iterate through each file/directory
        for (const file of files) {
            const filePath = path.join(directory, file);
            // Check if it's a directory
            const fileStats = await fs.promises.stat(filePath);
            if (fileStats.isDirectory()) {
                // Skip 'node_modules' and '.git' directories
                if (file !== 'node_modules' && file !== '.git') {
                    // Add the URL of the directory
                    const url = filePath.replace(__dirname, '').replace(/\\/g, '/');
                    directoryUrls.push(url);
                    // Recursively get URLs of directories within this directory
                    const subDirectoryUrls = await getDirectoryUrls(filePath);
                    directoryUrls = directoryUrls.concat(subDirectoryUrls);
                }
            }
        }

        return directoryUrls;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

// Example usage:
const directory = process.cwd(); // Replace with the path to your directory

// Get all directory URLs
getDirectoryUrls(directory)
    .then(async directoryUrls => {
        console.log('Directory URLs:', directoryUrls);

        // Check if directory listing is enabled for each directory URL
        for (const directoryUrl of directoryUrls) {
            const isDirectoryListingEnabled = await checkDirectoryListingEnabled(directoryUrl);
            console.log(`${directoryUrl} - Directory listing enabled:`, isDirectoryListingEnabled);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
