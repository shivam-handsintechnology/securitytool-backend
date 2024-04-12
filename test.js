var os = require('os');
if (os.platform() == 'win32') {  
    if (os.arch() == 'ia32') {
        var chilkat = require('@chilkat/ck-node21-win-ia32');
    } else {
        var chilkat = require('@chilkat/ck-node21-win64'); 
    }
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('@chilkat/ck-node21-arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('@chilkat/ck-node21-linux32');
    } else {
        var chilkat = require('@chilkat/ck-node21-linux64');
    }
} else if (os.platform() == 'darwin') {
    if (os.arch() == 'arm64') {
        var chilkat = require('@chilkat/ck-node21-mac-m1');
    } else {
        var chilkat = require('@chilkat/ck-node21-macosx');
    }
}

function chilkatExample() {

    // This example requires the Chilkat API to have been previously unlocked.
    // See Global Unlock Sample for sample code.

    var socket = new chilkat.Socket();

    var ssl = true;
    var maxWaitMillisec = 20000;

    // The SSL server hostname may be an IP address, a domain name,
    // or "localhost". 
    var sslServerHost;
    sslServerHost = "www.paypal.com";
    var sslServerPort = 443;

    // Connect to the SSL server:
    var success = socket.Connect(sslServerHost,sslServerPort,ssl,maxWaitMillisec);
    if (success !== true) {
        console.log(socket.LastErrorText);
        return;
    }

    // cert: Cert
    var cert;

    var bExpired;
    var bRevoked;
    var bSignatureVerified;
    var bTrustedRoot;

    cert = socket.GetSslServerCert();
    if (socket.LastMethodSuccess !== false) {

        console.log("Server Certificate:");
        console.log("Distinguished Name: " + cert.SubjectDN);
        console.log("Common Name: " + cert.SubjectCN);
        console.log("Issuer Distinguished Name: " + cert.IssuerDN);
        console.log("Issuer Common Name: " + cert.IssuerCN);

        bExpired = cert.Expired;
        bRevoked = cert.Revoked;
        bSignatureVerified = cert.SignatureVerified;
        bTrustedRoot = cert.TrustedRoot;

        console.log("Expired: " + bExpired);
        console.log("Revoked: " + bRevoked);
        console.log("Signature Verified: " + bSignatureVerified);
        console.log("Trusted Root: " + bTrustedRoot);

    }

    // Close the connection with the server
    // Wait a max of 20 seconds (20000 millsec)
    success = socket.Close(20000);

}

chilkatExample();