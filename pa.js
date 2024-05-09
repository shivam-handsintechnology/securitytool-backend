fetch('https://example.com', {
  redirect: 'manual'
})
  .then(response => {
    const headers = response.headers;

    // Iterate over the headers and check for private IP addresses
    for (const [key, value] of headers.entries()) {
      if (isPrivateIPAddress(value)) {
        console.log(`Private IP address found in ${key} header: ${value}`);
      }
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

  function isPrivateIPAddress(value) {
    const privateIPRegex = /^(::ffff:)?((10\.\d{1,3}\.\d{1,3}\.\d{1,3})|(172\.((1[6-9])|(2\d)|(3[01]))\.\d{1,3}\.\d{1,3})|(192\.168\.\d{1,3}\.\d{1,3})|(127\.\d{1,3}\.\d{1,3}\.\d{1,3}))$/;
    return privateIPRegex.test(value);
  }
 
// Usage example
const domainToCheck = 'handsintechnology.in';
const { exec } = require('child_process');

function findMailServer(command) {

  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      const mailServers = stdout.trim().split('\n').map(line => line.split(' ').pop());
      resolve(mailServers);
    });
  });
}

// Usage example
findMailServer(`nslookup -q=mx ${domainToCheck}`)
  .then(mailServers => console.log(`Mail servers for example.com:`, mailServers))
  .catch(error => console.error(`Error: ${error}`));

  // Usage example
  findMailServer(`dig ${domainToCheck} mx +short`)
    .then(mailServers => console.log(`Mail servers for example.com:`, mailServers))
    .catch(error => console.error(`Error: ${error}`));