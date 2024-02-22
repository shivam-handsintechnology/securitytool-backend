const { hasRobotsTxt } = require("./src/utils/functions");

(async () => {
  const axios = require('axios');

  try {
    const response = await axios.get('http://lmpapi.handsintechnology.in/');
    console.log(response.request.protocol.replace(':', ""));
    console.log(response.request.res.httpVersion);
  } catch (error) {
    console.log(error.request.protocol.replace(':', ""));
    console.log(error.request.res.httpVersion);
    console.log('Error:', error.message);
  }
});
const { exec } = require('child_process');
const fs = require('fs');
const dir = process.cwd();
const apiKey = 'd2b0ae05-bf38-4b27-ab5d-731c64762b19'; // Replace with your actual API key

exec(`snyk auth ${apiKey}`, (authError, authStdout, authStderr) => {
  if (authError) {
    console.error(`Error running 'snyk auth': ${authError}`);
    return;
  }
  if (authStdout.length > 0) {
    // The authentication was successful, proceed to the next command
    console.log("authStdout", authStdout)
    exec(`snyk code test --json `, (testError, testStdout, testStderr) => {
      if (testError) {
        console.error(`Error running 'snyk test': ${testError}`);
        return;
      }

      // The 'test' command completed successfully
      console.log('Snyk test completed successfully.');

      // Log the output to a file
      fs.writeFileSync('snyk_output.txt', testStdout);

      // Optionally, you can log the error output as well
      if (testStderr) {
        fs.writeFileSync('snyk_error_output.txt', testStderr);
      }
    });
  }


});
