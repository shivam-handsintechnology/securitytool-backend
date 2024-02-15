const https=require('https')
const _=require('lodash')
const moment =require('moment')
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
      console.log(`${website.name} is available. Response Time: ${responseTime}ms`)
    } catch (error) {
      // Handle error response
      if(error.code === 'CERT_HAS_EXPIRED'){
        console.log(`${website.name} is down. Error: ${error.message}`);
      }
  
      // Send email alert
      sendEmailAlert(website.name, 'Website is down');
    }
  }
  
  // Send email alert
  function sendEmailAlert(websiteName, alertMessage) {
    const nodemailer=require('nodemailer')
    const transporter = nodemailer.createTransport(emailConfig);
    const mailOptions = {
      from: 'shivam@handsintechnology.com',
      to: 'dev@handsintechnology.com',
      subject: `${websiteName} Alert`,
      text: `The website ${websiteName} has the following alert: ${alertMessage}. Please take necessary actions.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
  
  
  // sendEmailAlert("dev","test")
  // Send email alert
  
  // Start monitoring loop
  function startMonitoring() {
    console.log('Monitoring started...');
    // setInterval(() => {
      // websites.forEach((website) => {
      //   checkWebsiteAvailability(website);
      // });
    // }, 5000); // Check every 5 seconds
  }
  const SSLverifier = async (url) => {
    return new Promise((resolve, reject) => {
     try {
      const result = {};
      const options = {
        hostname: url,
        port: 443,
        rejectUnauthorized: false,
      };
      const startTime = performance.now(); // Start measuring response time
      const req = https.request(options, (res) => {
        const endTime = performance.now(); // Stop measuring response time
        const responseTime = endTime - startTime;
        
        const serverType = res.headers['server'];
        const serverVersion = res.headers['x-powered-by'];
        console.log({ serverType, serverVersion,responseTime })
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
        // Compare the issuer and subject fields
        var s = JSON.stringify(certificate.subject);
        var i = JSON.stringify(certificate.issuer);
        s = JSON.parse(s);
        i = JSON.parse(i);
        if (_.isEqual(s, i)) {
          result.self = 'Self-signed certificate detected';
        } else {
          result.self = 'Certificate is not self-signed';
        }
        if (valid.isBefore(currentDate)) {
          result.valid = 'Certificate is not valid';
          result.expired = 'Certificate has expired';
        } else {
          result.valid = 'Certificate is valid';
          result.expired = 'Certificate is expired on the ' + validTo;
        }
        if (negotiatedProtocol === 'TLSv1' || negotiatedProtocol === 'SSLv3') {
          result.negotiatedProtocol = 'Obsolete SSL/TLS protocol detected';
        } else {
          result.negotiatedProtocol = 'No obsolete SSL/TLS protocol detected';
        }
        resolve(result);
      });
  
      req.on('error', (error) => {
        reject(error.message);
      });
  
      req.end();
     } catch (error) {
      reject(error.message);
     }
    });
  };
  module.exports={SSLverifier}
  
  // Start the application
//   startMonitoring();