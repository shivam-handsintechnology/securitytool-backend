const fs = require('fs');
const path = require('path');
const terser = require('terser');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Function to recursively get all files in a directory
function getFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            fileList = getFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Function to minify JavaScript files
async function minifyJs(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    const result = await terser.minify(code);
    if (result.error) {
        throw result.error;
    }
    fs.writeFileSync(filePath, result.code, 'utf8');
}

// Function to obfuscate JavaScript files
function obfuscateJs(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true
    }).getObfuscatedCode();
    fs.writeFileSync(filePath, obfuscatedCode, 'utf8');
}

// Function to copy files from source to destination
function copyFiles(srcDir, destDir) {
    const files = getFiles(srcDir);

    files.forEach((file) => {
        const relativePath = path.relative(srcDir, file);
        const destPath = path.join(destDir, relativePath);
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.copyFileSync(file, destPath);
    });
}

// Main function to process files
async function processFiles(srcDir, destDir) {
    // Copy files from srcDir to destDir
    copyFiles(srcDir, destDir);

    // Get all files in the destination directory
    const files = getFiles(destDir);

    // Minify and obfuscate JavaScript files in the destination directory
    for (const file of files) {
        if (path.extname(file) === '.js') {
            await minifyJs(file);
            obfuscateJs(file);
        }
    }
}

// Define source and destination directories
const srcDir = './src';
const destDir = './dist';

// Run the process
processFiles(srcDir, destDir)
    .then(() => console.log('Files processed successfully'))
    .catch((error) => console.error('Error processing files:', error));
