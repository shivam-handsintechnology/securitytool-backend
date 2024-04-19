const https = require('https')
const _ = require('lodash')
const moment = require('moment')
// Websites to monitor
const websites = [
  { name: 'Example', url: 'https://example.com' },
  { name: 'expired.badssl', url: 'https://expired.badssl.com/' },
  // Add more websites as needed
];

// Email configuration
const emailConfig = {
  service: 'gmail',
  port: 587,
  auth: {
    user: 'dev@handsintechnology.com',
    pass: 'Hitdev@2022',
  },
};

// Check website availability
async function checkWebsiteAvailability(website) {
  try {
    const startTime = new Date().getTime();
    const response = await axios.get(website.url);
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;
    // Handle success response
    if (response.status === 200) {
      sendEmailAlert(website.name, 'Website is up and running');
    }
  } catch (error) {
    // Handle error response
    if (error.code === 'CERT_HAS_EXPIRED') {
      sendEmailAlert(website.name, 'Website has an expired SSL certificate');
    }
    // Send email alert
    sendEmailAlert(website.name, 'Website is down');
  }
}

// Send email alert
function sendEmailAlert(websiteName, alertMessage) {
  const nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport(emailConfig);
  const mailOptions = {
    from: 'shivam@handsintechnology.com',
    to: 'dev@handsintechnology.com',
    subject: `${websiteName} Alert`,
    text: `The website ${websiteName} has the following alert: ${alertMessage}. Please take necessary actions.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return `Email not sent: ${error.message}`
    } else {
      return `Email sent: ${info.response}`
    }
  });
}


// sendEmailAlert("dev","test")
// Send email alert

// Start monitoring loop
function startMonitoring() {
  console.log('Monitoring started...');
  setInterval(() => {
  websites.forEach((website) => {
    checkWebsiteAvailability(website);
  });
  }, 5000); 
}
const SSLverifier = async (hostname) => {
  return new Promise((resolve, reject) => {
    try {
      const result = {};
      const options = {
        hostname: hostname,
        port: 443,
        rejectUnauthorized: false,
      };
      const req = https.request(options, (res) => {
        const certificate = res.socket.getPeerCertificate();
        const negotiatedProtocol = res.socket.getProtocol();
        const {
          subject,
          issuer,
          valid_from: validFrom,
          valid_to: validTo,
          fingerprint,
          serialNumber,
          subjectaltname: subjectAltName,
        } = certificate;

        const valid = moment(validTo, 'MMM DD HH:mm:ss YYYY GMT');
        const currentDate = moment();

       try{
        // Check for self-signed certificate
        let s = JSON.stringify(certificate.subject);
        let i = JSON.stringify(certificate.issuer);
        s = JSON.parse(s);
        i = JSON.parse(i);
        if (_.isEqual(s, i)) {
          result.self = 'Self-signed certificate detected';
        } else {
          result.self = 'Certificate is not self-signed';
        }}
        catch(error){
        reject({ message: "Something is Wrong" });
        }

        // Check for expired certificate
        if (valid.isBefore(currentDate)) {
          result.valid = 'Certificate is not valid';
          result.expired = 'Certificate has expired';
        } else {
          result.valid = 'Certificate is valid';
          result.expired = 'Certificate is expired on the ' + validTo;
        }

        // Check for obsolete SSL/TLS protocol
        if (negotiatedProtocol === 'TLSv1' || negotiatedProtocol === 'SSLv3') {
          result.negotiatedProtocol = 'Obsolete SSL/TLS protocol detected';
        } else {
          result.negotiatedProtocol = 'No obsolete SSL/TLS protocol detected';
        }

        // Check for SSL Cookie without secure flag set
        const setCookieHeader = res.headers['set-cookie'];
        if (setCookieHeader && !setCookieHeader.includes('Secure')) {
          result.cookieSecureFlag = 'SSL Cookie without secure flag set';
        } else {
          result.cookieSecureFlag = 'SSL Cookie secure flag is set';
        }

        resolve(result);
      });

      req.on('error', (error) => {
        if (error.code === 'ENOTFOUND') {
          reject({ message: "Domain Not Found" });
        }
        reject(error);
      });

      req.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { SSLverifier }

// Start the application
//   startMonitoring();