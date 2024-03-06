const fs = require('fs');
const path = require('path');
console.log("Current Working Directory:", __filename);
function scanDirectory(directoryPath) {
    let result = [];

    // Read the content of the directory
    const files = fs.readdirSync(directoryPath);

    // Iterate through each file in the directory
    files.forEach(file => {
        // Exclude specific files and folders
        if (file === '.env' || file === 'package.json' || file === 'node_modules' || file === '.git' || file === '.gitignore' || file === __filename || file === 'package-lock.json' || file === 'yarn.lock' || file === "directory.json") {
            return;
        }

        const filePath = path.join(directoryPath, file);

        // Check if it's a directory
        if (fs.statSync(filePath).isDirectory()) {
            // Recursively scan subdirectories
            const subdirectoryContent = scanDirectory(filePath);
            result.push({
                name: file,
                type: 'folder',
                content: subdirectoryContent,
            });
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
    });

    return result;
}

// Specify the directory path you want to scan
const directoryPath = process.cwd();

// Call the function to scan the directory
const jsonData = scanDirectory(directoryPath);

// Convert the result to JSON
const jsonString = JSON.stringify({ data: jsonData }, null, 2);

// Print the JSON data
fs.writeFileSync('directory.json', jsonString, 'utf-8');
