const https = require('https')
const _ = require('lodash')
const moment = require('moment')
const tls = require('tls');


const SSLverifier = async (hostname) => {
  return new Promise((resolve, reject) => {
    try {
      const result = {};
      const options = {
        host: hostname,
        port: 443,
        rejectUnauthorized: false,
      };

      const socket = tls.connect(options, () => {
        const certificate = socket.getPeerCertificate();
        const negotiatedProtocol = socket.getProtocol();

        if (!certificate || !certificate.subject || !certificate.issuer) {
          const { authorized, authorizationError } = socket;
          if (!authorized && authorizationError) {
            reject({ message: `Authorization error: ${authorizationError}` });
          } else {
            reject({ message: "Certificate information is incomplete" });
          }
          socket.end();
          return;
        }

        const { subject, issuer, valid_from: validFrom, valid_to: validTo, fingerprint, serialNumber, subjectaltname: subjectAltName } = certificate;
        const valid = moment(validTo, 'MMM DD HH:mm:ss YYYY GMT');
        const currentDate = moment();

        try {
          const s = JSON.stringify(subject);
          const i = JSON.stringify(issuer);
          if (s === i) {
            result.self = 'Self-signed certificate detected';
          } else {
            result.self = 'Certificate is not self-signed';
          }
        } catch (error) {
          resolve({ message: "Invalid JSON" });
          socket.end();
          return;
        }

        if (valid.isBefore(currentDate)) {
          result.valid = 'Certificate is not valid';
          result.expired = 'Certificate has expired';
        } else {
          result.valid = 'Certificate is valid';
          result.expired = 'Certificate expires on ' + validTo;
        }

        if (negotiatedProtocol === 'TLSv1' || negotiatedProtocol === 'SSLv3') {
          result.negotiatedProtocol = 'Obsolete SSL/TLS protocol detected';
        } else {
          result.negotiatedProtocol = 'No obsolete SSL/TLS protocol detected';
        }

        fetch(`https://${hostname}`).then((res) => {
          const setCookieHeader = res.headers.get('set-cookie');
          if (setCookieHeader && !setCookieHeader.includes('Secure')) {
            result.cookieSecureFlag = 'SSL Cookie without secure flag set';
          } else {
            result.cookieSecureFlag = 'SSL Cookie secure flag is set';
          }
          resolve(result);
          socket.end();
        }).catch((error) => {
          reject(error);
          socket.end();
        });
      });

      socket.on('error', (error) => {
        if (error.code === 'ENOTFOUND') {
          reject({ message: "Domain Not Found" });
        }
        reject(error);
        socket.end();
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { SSLverifier }

// Start the application
//   startMonitoring();