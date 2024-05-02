const fs=require('fs');
const path=require('path');
let dir=process.cwd();
const { promisify } = require('util')
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const nodeModulesPath = path.resolve(process.cwd(), 'node_modules');
async function scanDirectory(directoryPath, result = []) {
    try {
      // Read the content of the directory asynchronously
      const files = await readdirAsync(directoryPath);
  
      // Iterate through each file in the directory
      for (const file of files) {
        // Exclude specific files and folders
        if (file === '.env' || file === 'node_modules'  || file.includes('.git') || file.includes('.env') || file.includes('.lock') || file.includes('.log') || file.includes('.json')) {
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
          let dir = directoryPath.replace(process.cwd(), "")
          if (fileExtension !== '.txt' || fileName === 'robots') {
            result.push({
              name: fileName,
              type: 'file',
              extension: fileExtension,
              content: fileContent,
              directoryPath: dir.replace(/\\/g, '/')
            });
          }
        }
      }
  
      return result
    } catch (error) {
      console.error('Error scanning directory:', error);
      throw error;
    }
  }
  const checkAllowedMethods = async (response) => {
    return new Promise(async (resolve, reject) => {
      try {
        const standardMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
        let results = [];
  
        // Iterate through the data and process each item
        response.forEach(async (item) => {
          try {
            const allowedMethodsRegex = /\.(header|setHeader)\("Access-Control-Allow-Methods"\s*,\s*"([^"]+)"/i;
            const match = item.content.match(allowedMethodsRegex);
             
            if (match && match[2]) {
              const allowedMethods = match[2].split(',').map(method => method.trim().toUpperCase());
              console.log({allowedMethods})
              const missingMethods = allowedMethods.filter(method => !standardMethods.includes(method));
            
  
              if (missingMethods.length > 0) {
                results.push({
                  filename: item.name,
                  missingMethods: missingMethods
                });
              }
            }
          } catch (error) {
            console.error("Error processing file content:", error);
            reject(error); // Handle error if necessary
          }
        });
  
        // Resolve results
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  };
(async()=>{
    let data=await scanDirectory(process.cwd())
   
    let result=await checkAllowedMethods(data)
    console.log(result)
    
})()








// Output: