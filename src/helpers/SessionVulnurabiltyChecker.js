const { response } = require("express");

// Controller for checking session expiry on browser close
const sessionExpireOnClose = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            // Iterate through the data and process each item
            response.data.data.forEach(async (item) => {
                try {
                    // Replace double quotes with single quotes for consistency
                    let modifiedContent = item.content.replace(/"/g, "'");

                    // Regular expression to match session configuration pattern for cookie
                    const cookieRegex = /cookie:\s*{\s*[\s\S]*?\s*}/;

                    // Check if session configuration includes a cookie
                    const cookieMatch = modifiedContent.match(cookieRegex);
                    if (cookieMatch) {
                        // Extract cookie configuration object
                        const sessionConfig = cookieMatch[0].trim().replace("cookie:", "");
                        const cookieObject = eval(`(${sessionConfig})`);

                        // Check if maxAge or expires is not set in the cookie
                        if (cookieObject["maxage"] === null || cookieObject["expires"] === null) {
                            // Session does not expire on closing the browser
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        }
                    }
                    const maxAgeRegex = /req\.session\.cookie\.maxAge\s*=\s*(\d+)/g;
                    const sessionMaxAgeRegex = /req\.session\.maxAge\s*=\s*(\d+)/g;
                    const maxAgeMatch = maxAgeRegex.exec(modifiedContent);
                    if (maxAgeMatch) {
                        // Extract maxAge value and push it to results
                        if (maxAgeMatch[1] === null) {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        }
                    }
                    // Check if req.session.cookie.maxAge is set
                    const sessionExpireRegex = /req\.session\.expires\s*=\s*(\d+)/g;
                    const expireMatch = sessionExpireRegex.exec(modifiedContent);
                    if (expireMatch) {
                        if (expireMatch[1] === null) {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        }
                    }
                    // Check if req.session.maxAge is set
                    const sessionMaxAgeMatch = sessionMaxAgeRegex.exec(modifiedContent);
                    if (sessionMaxAgeMatch) {
                        // Extract sessionMaxAge value and push it to results
                        if (sessionMaxAgeMatch[1] === null) {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        }
                    } 

                } catch (error) {
                    console.error("Error processing file content:", error);
                    reject(error)
                    // Handle error if necessary
                }
            });

            // Resolve results
            resolve(results);




        } catch (error) {
            reject(error)
        }
    })
};

// Controller for checking session timeout
const sessionTimeout = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []

            // Iterate through the data and process each item
            response.data.data.forEach(async (item) => {
                try {
                    const sevenDays = 86400000 * 7;
                    const oneMinute = 60000;

                    let sessionTimeout;
                    // Replace double quotes with single quotes for consistency
                    let modifiedContent = item.content.replace(/"/g, "'");

                    // Regular expressions to match session configuration patterns
                    const cookieRegex = /cookie:\s*{\s*[\s\S]*?\s*}/;
                    const maxAgeRegex = /req\.session\.cookie\.maxAge\s*=\s*(\d+)/g;
                    const sessionMaxAgeRegex = /req\.session\.maxAge\s*=\s*(\d+)/g;

                    // Check if session configuration includes a cookie
                    const cookieMatch = modifiedContent.match(cookieRegex);
                    if (cookieMatch) {
                        // Extract cookie configuration object
                        const sessionConfig = cookieMatch[0].trim().replace("cookie:", "");
                        const cookieObject = eval(`(${sessionConfig})`);

                        // Check if maxAge is set in the cookie
                        if (cookieObject["maxage"] !== undefined || cookieObject["expires"] !== undefined) {

                            // Determine session timeout based on maxAge or expires value
                            if (
                                cookieObject["maxage"] === null ||
                                cookieObject["expires"] === null
                            ) {
                                sessionTimeout = "Infinite";
                            } else if (
                                cookieObject["maxage"] > sevenDays ||
                                cookieObject["expires"] > sevenDays
                            ) {
                                sessionTimeout = "High";
                            } else if (
                                cookieObject["maxage"] < oneMinute ||
                                cookieObject["expires"] < oneMinute
                            ) {
                                sessionTimeout = "Low";
                            } else {
                                sessionTimeout = "Normal";
                            }

                            // Push session timeout info along with file name to results
                            results.push(`Session timout set ${sessionTimeout} in ${item.name}`);
                        }
                    }

                    // Check if req.session.cookie.maxAge is set
                    const maxAgeMatch = maxAgeRegex.exec(modifiedContent);
                    if (maxAgeMatch) {
                        // Extract maxAge value and push it to results

                        if (
                            maxAgeMatch[1] === null
                        ) {
                            sessionTimeout = "Infinite";
                        } else if (
                            maxAgeMatch[1] > sevenDays
                        ) {
                            sessionTimeout = "High";
                        } else if (
                            maxAgeMatch[1] < oneMinute
                        ) {
                            sessionTimeout = "Low";
                        } else {
                            sessionTimeout = "Normal";
                        }
                        results.push(`Session timout set ${sessionTimeout} in ${item.name}`);
                    }
                    // Check if req.session.cookie.maxAge is set
                    const sessionExpireRegex = /req\.session\.expires\s*=\s*(\d+)/g;
                    const expireMatch = sessionExpireRegex.exec(modifiedContent);
                    if (expireMatch) {
                        // Extract maxAge value and push it to results
                        if (
                            expireMatch[1] === null
                        ) {
                            sessionTimeout = "Infinite";
                        } else if (
                            expireMatch[1] > sevenDays
                        ) {
                            sessionTimeout = "High";
                        } else if (
                            expireMatch[1] < oneMinute
                        ) {
                            sessionTimeout = "Low";
                        } else {
                            sessionTimeout = "Normal";
                        }
                        results.push(`Session timout set ${sessionTimeout} in ${item.name}`);
                    }

                    // Check if req.session.maxAge is set
                    const sessionMaxAgeMatch = sessionMaxAgeRegex.exec(modifiedContent);
                    if (sessionMaxAgeMatch) {
                        if (
                            sessionMaxAgeMatch[1] === null
                        ) {
                            sessionTimeout = "Infinite";
                        } else if (
                            sessionMaxAgeMatch[1] > sevenDays
                        ) {
                            sessionTimeout = "High";
                        } else if (
                            sessionMaxAgeMatch[1] < oneMinute
                        ) {
                            sessionTimeout = "Low";
                        } else {
                            sessionTimeout = "Normal";
                        }

                        results.push(`Session timout set ${sessionTimeout} in ${item.name}`);
                    }
                } catch (error) {
                    console.error("Error processing file content:", error);
                    reject(error)
                    // Handle error if necessary
                }
            });

            // Resolve results
            resolve(results);


        } catch (error) {
            reject(error)
        }
    })
};

// Controller for checking session token being passed in other areas apart from cookie
const sessionToken = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            response.data.data.forEach(async (item) => {
                let modifiedcontent = item.content.replace(/"/g, "'")
                // Regular expression to match patterns indicative of jwt.verify and jwt.sign usage
                const jwtFunctionsRegex = /jwt\.(verify|sign)\s*\(/g;
                const matches = modifiedcontent.match(jwtFunctionsRegex);
                if (matches && matches.length > 0) {
                    results.push(`token used in in ${item.name}`)
                }
                resolve(results)
            })
        } catch (error) {
            reject(error)
        }
    })
};

// Controller for checking session fixation vulnerability
const sessionFixation = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            // Iterate through the data and process each item
            response.data.data.forEach(async (item) => {
                try {
                    // Replace double quotes with single quotes for consistency
                    let modifiedContent = item.content.replace(/"/g, "'");

                    // Regular expression to match session configuration pattern for cookie
                    const cookieRegex = /cookie:\s*{\s*[\s\S]*?\s*}/;

                    // Check if session configuration includes a cookie
                    const cookieMatch = modifiedContent.match(cookieRegex);
                    if (cookieMatch) {
                        // Extract cookie configuration object
                        const sessionConfig = cookieMatch[0].trim().replace("cookie:", "");
                        const cookieObject = eval(`(${sessionConfig})`);

                        // Check if req.sessionID is not based on user-controlled input or predictable values
                        if (!cookieObject.httpOnly) {
                            // Session fixation may be possible
                            results.push(`session fixation is possible  in ${item.name}`);
                        }
                    }
                    if (modifiedContent.includes("res.cookie")) {
                        // Regular expression to match setting a cookie with httpOnly: true
                        const cookiePattern = /res\.cookie\(['"]([^'"]+?)['"],\s*['"]([^'"]+?)['"],\s*{\s*httpOnly:\s*true\s*}/g;

                        // Check if session configuration includes setting a cookie with httpOnly: true
                        const rescookieMatch = modifiedContent.match(cookiePattern);
                        if (rescookieMatch) {
                            // Iterate through each match and extract cookie name and value
                            cookieMatch.forEach(match => {
                                const [_, cookieName, cookieValue] = match.match(cookiePattern);
                                // Push session fixation possible result along with cookie name and value
                                results.push(`session fixation is not possible  in ${item.name}`);
                            });
                        } else {
                            // If res.cookie is used but httpOnly is not set to true
                            results.push(`session fixation is possible  in ${item.name}`);
                        }
                    }
                } catch (error) {
                    console.error("Error processing file content:", error);
                    // Handle error if necessary
                }
            });

            // Resolve results
            resolve(results);
        } catch (error) {
            reject(error)
        }
    })


};

// Controller for checking session hijacking vulnerability

const sessionHijacking = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            // Iterate through the data and process each item
            response.data.data.forEach(async (item) => {
                try {
                    // Replace double quotes with single quotes for consistency
                    let modifiedContent = item.content.replace(/"/g, "'");

                    // Regular expression to match session configuration pattern for cookie
                    const cookieRegex = /cookie:\s*{\s*[\s\S]*?\s*}/;

                    // Check if session configuration includes a cookie
                    const cookieMatch = modifiedContent.match(cookieRegex);
                    if (cookieMatch) {
                        // Extract cookie configuration object
                        const sessionConfig = cookieMatch[0].trim().replace("cookie:", "");
                        const cookieObject = eval(`(${sessionConfig})`);

                        // Check if req.sessionID is not based on user-controlled input or predictable values
                        if (!cookieObject.httpOnly) {
                            // Session fixation may be possible
                            results.push(`session hijacking is possible  in ${item.name}`);
                        }
                    }
                    if (modifiedContent.includes("res.cookie")) {
                        // Regular expression to match setting a cookie with httpOnly: true
                        const cookiePattern = /res\.cookie\(['"]([^'"]+?)['"],\s*['"]([^'"]+?)['"],\s*{\s*httpOnly:\s*true\s*}/g;

                        // Check if session configuration includes setting a cookie with httpOnly: true
                        const rescookieMatch = modifiedContent.match(cookiePattern);
                        if (rescookieMatch) {
                            // Push session fixation possible result along with cookie name and value
                            results.push(`session hijacking is not  possible  in ${item.name}`);
                        } else {
                            // If res.cookie is used but httpOnly is not set to true
                            results.push(`session hijacking is possible  in ${item.name}`);
                        }
                    }
                } catch (error) {
                    console.error("Error processing file content:", error);
                    // Handle error if necessary
                }
            });

            // Resolve results
            resolve(results);
        } catch (error) {
            reject(error)
        }
    })


};
const SessionVulnurability = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sessionExpireOnClose_data = await sessionExpireOnClose(response)
            let sessionTimeout_data = await sessionTimeout(response)
            let sessionFixation_data = await sessionFixation(response)
            let sessionHijacking_data = await sessionHijacking(response)
            let sessionToken_data = await sessionToken(response)
            resolve({
                sessionExpireOnClose_data, sessionTimeout_data, sessionFixation_data, sessionHijacking_data, sessionToken_data
            })

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    sessionExpireOnClose, sessionTimeout, sessionFixation, sessionHijacking, sessionToken, SessionVulnurability
}

