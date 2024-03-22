const fs = require('fs');
const path = require('path');
const { minify } = require('uglify-js');

// Function to recursively get all files in a directory excluding node_modules
function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules') {
                getAllFiles(filePath, fileList);
            }
        } else {
            fileList.push(filePath);
        }
    });
    return fileList;
}

// Function to minify a file and write minified code to a specific folder
function minifyFile(file) {
    const code = fs.readFileSync(file, 'utf8');
    const minified = minify(code);
    const relativePath = path.relative(process.cwd(), file);
    const outputPath = path.join('minified', relativePath);
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputPath, minified.code, 'utf8');
}

// Get current working directory
const currentDir = process.cwd();

// Get all JavaScript files in the current directory and its subdirectories
const files = getAllFiles(currentDir).filter(file => path.extname(file) === '.js');
files.forEach(minifyFile);
