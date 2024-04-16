const axios = require('axios');

// Function to send a request to the server and inspect the response headers
function checkServerFingerprinting(hostname) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            url: `http://${hostname}/`,
        };

        axios(options)
            .then(response => {
                const headers = response.headers;
                const serverFingerprints = [];

                // Check for server-specific headers
                if (headers['server']) {
                    serverFingerprints.push({ server: headers['server'] });
                }

                // Check for other potentially identifying headers
                if (headers['x-powered-by']) {
                    serverFingerprints.push({ "x-powered-by": headers['x-powered-by'] });
                } else {
                    serverFingerprints.push({ "x-powered-by": "Not Found" });
                }

                if (headers['x-aspnet-version']) {
                    serverFingerprints.push({ "x-aspnet-version": headers['x-aspnet-version'] });
                } else {
                    serverFingerprints.push({ "x-aspnet-version": "Not Found" });
                }

                // Add more checks for other potentially identifying headers
                resolve(serverFingerprints);
            })
            .catch(error => {
                if (error.response && error.response.headers) {
                    const headers = error.response.headers;
                    const serverFingerprints = [];

                    // Check for server-specific headers
                    if (headers['server']) {
                        serverFingerprints.push({ server: headers['server'] });
                    }

                    // Check for other potentially identifying headers
                    if (headers['x-powered-by']) {
                        serverFingerprints.push({ "x-powered-by": headers['x-powered-by'] });
                    } else {
                        serverFingerprints.push({ "x-powered-by": "Not Found" });
                    }

                    if (headers['x-aspnet-version']) {
                        serverFingerprints.push({ "x-aspnet-version": headers['x-aspnet-version'] });
                    } else {
                        serverFingerprints.push({ "x-aspnet-version": "Not Found" });
                    }

                    // Add more checks for other potentially identifying headers
                    resolve(serverFingerprints);
                } else {
                    reject(`Problem with request: ${error.message}`);
                }
            });
    });
}
function analyzeResponseForPathDisclosure(response, hostname) {
    return new Promise((resolve, reject) => {
        let isPhysical_path_disclosure = "Not Found";

        if (typeof response === 'object') {
            const jsonString = JSON.stringify(response.data);
            if (jsonString.includes(process.env.HOME)) {
                isPhysical_path_disclosure = `Potential server path disclosure vulnerability found in response: ${jsonString}`;
            }
        } else if (typeof response === 'string') {
            if (response.includes(`/${hostname}/`)) {
                isPhysical_path_disclosure = `Potential server path disclosure vulnerability found in response: ${response}`;
            }
        } else if (Array.isArray(response)) {
            const joinedString = response.join('');
            if (joinedString.includes(`/${hostname}/`)) {
                isPhysical_path_disclosure = `Potential server path disclosure vulnerability found in response: ${joinedString}`;
            }
        } else {
            isPhysical_path_disclosure = "Not Found";
        }

        resolve(isPhysical_path_disclosure);
    });
}

async function Full_Path_Disclosure(hostname) {
    let PathDisclosure
    try {
        const options = {
            method: 'GET',
            url: `http://${hostname}/${Date.now()}`,
        };

        const response = await axios(options);
        PathDisclosure  = await analyzeResponseForPathDisclosure(response, hostname);
        return PathDisclosure;
    } catch (error) {
        if (error.response) {
            const PathDisclosure = await analyzeResponseForPathDisclosure(error.response, hostname);
            return PathDisclosure;
        } else {
           return  PathDisclosure
        }
    }
}

module.exports = {checkServerFingerprinting, Full_Path_Disclosure};