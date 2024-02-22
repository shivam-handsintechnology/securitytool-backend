const { spawn } = require('child_process');
const path = require('path');

const apiKey = 'd2b0ae05-bf38-4b27-ab5d-731c64762b19'; // Replace with your actual API key

// Construct the full path to snyk.cmd
const snykCmdPath = path.join(process.env.APPDATA, 'npm', 'snyk.cmd');

const auth = spawn(snykCmdPath, ['auth', apiKey]);

auth.stdout.on('data', (data) => {
  console.log(data.toString());
});

auth.stderr.on('data', (data) => {
  console.error(data.toString());
});

auth.on('exit', (authCode) => {
  if (authCode === 0) {
    const test = spawn(snykCmdPath, ['test']);

    test.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    test.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    test.on('exit', (testCode) => {
      console.log(`'snyk test' exited with code ${testCode}`);
    });
  } else {
    console.error(`'snyk auth' exited with code ${authCode}`);
  }
});
