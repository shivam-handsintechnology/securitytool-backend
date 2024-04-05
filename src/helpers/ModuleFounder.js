const fs = require('fs');
const path = require('path');

// Resolve the path to the node_modules directory of your project
const nodeModulesPath = path.resolve(process.cwd(), 'node_modules');

// Function to check if -related modules are installed
async function checkForModules(name) {
    try {
        // Check if node_modules directory exists
        if (fs.existsSync(nodeModulesPath)) {
            // Read the content of the node_modules directory
            const nodeModules = fs.readdirSync(nodeModulesPath);
            
            // Check if any of the -related modules are present
            const Modules = nodeModules.filter(module => module.startsWith(name) );

            if (Modules.length > 0) {
              return true
            } else {
               return false
            }
        } else {
           return false
        }
    } catch (err) {
        return false
    }
}
module.exports=checkForModules

