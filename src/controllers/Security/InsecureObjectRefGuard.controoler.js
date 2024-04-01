
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