const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
// Promisify fs.readdir and fs.stat functions
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const { consoleColorText } = require("./functions");

async function scanDirectory(directoryPath, result = []) {
    try {
        // Read the content of the directory asynchronously
        const files = await readdirAsync(directoryPath);

        // Iterate through each file in the directory
        for (const file of files) {
            // Exclude specific files and folders
            if (file === '.env' || file === 'node_modules' || file === '.git' || file === '.gitignore' || file === __filename || file === 'package-lock.json' || file === 'yarn.lock' || file === "directory.json" || file === "httpparameterpollution.js" || file === "functions.js" || file === "getEndpoint.js" || file === "auto.js" || file === "README.md" || file === "auto copy.js") {
                continue;
            }

            const filePath = path.join(directoryPath, file);

            // Check if it's a directory
            const fileStats = await statAsync(filePath);
            if (fileStats.isDirectory()) {
                // Recursively scan subdirectories
                await scanDirectory(filePath, result);
            } else {
                // Get file extension and name
                const fileExtension = path.extname(file);
                const fileName = path.basename(file, fileExtension);

                // Read file content
                const fileContent = fs.readFileSync(filePath, 'utf-8');

                // Add file information to the result array
                result.push({
                    name: fileName,
                    type: 'file',
                    extension: fileExtension,
                    content: fileContent,
                });
            }
        }

        return result;
    } catch (error) {
        console.error('Error scanning directory:', error);
        throw error;
    }
}


async function HttpParameterpollutionchecker() {
    try {
        console.log("Please wait ");
        const directoryPath = process.cwd();
        // Call the function to scan the directory
        const jsonData = scanDirectory(directoryPath);
        // Convert the result to JSON
        const fileContent = JSON.stringify({ data: jsonData }, null, 2);

    } catch (error) {
        console.log(JSON.stringify(error));
    }
}
module.exports = {
    HttpParameterpollutionchecker, consoleColorText, scanDirectory
};