
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

module.exports = {
    checkDirectoryListing: function(req, res) {
      const isDirectoryListingEnabled = checkDirectoryListingEnabled(req);
      res.json({ directoryListingEnabled: isDirectoryListingEnabled });
    },
  
    checkDirectoryTraversal: function(req, res) {
      const isDirectoryTraversalDetected = checkDirectoryTraversal(req);
      res.json({ directoryTraversalDetected: isDirectoryTraversalDetected });
    },
  
    checkParameterPollution: function(req, res) {
      const isParameterPollutionDetected = checkParameterPollution(req);
      res.json({ parameterPollutionDetected: isParameterPollutionDetected });
    },
  
    checkRobotsTxt: function(req, res) {
      const hasRobotsTxt = checkRobotsTxt(req);
      res.json({ robotsTxtFound: hasRobotsTxt });
    }
  };
//  
  
  // Function to check for directory traversal attack
  function checkDirectoryTraversal(req) {
    // Get the requested URL
    const requestedUrl = url.parse(req.url);
    const requestedPath = path.join(__dirname, requestedUrl.pathname);
  
    // Check if the requested path contains '..' indicating directory traversal attempt
    return requestedPath.includes('..');
  }
  
  // Function to check for HTTP parameter pollution
  function checkParameterPollution(req) {
    // Check if there are multiple values for any query parameter
    const queryParameters = req.query || req.params;
    for (const param in queryParameters) {
      if (Array.isArray(queryParameters[param])) {
        return true; // Parameter pollution detected if any query parameter has multiple values
      }
    }
    return false;
  }
  
  // Function to check if 'robots.txt' file exists
  function checkRobotsTxt(req) {
    // Get the URL of the remote server
    const remoteServerUrl = req.headers.host;
  
    // Check if 'robots.txt' exists by attempting to fetch it
    try {
      const robotsTxtPath = path.join(process.cwd(), 'robots.txt');
      fs.accessSync(robotsTxtPath, fs.constants.F_OK);
      return true; // 'robots.txt' file exists
    } catch (error) {
      return false; // 'robots.txt' file does not exist
    }
  }