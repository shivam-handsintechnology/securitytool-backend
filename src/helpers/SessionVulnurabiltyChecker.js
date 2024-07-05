const { response } = require("express");
const { findJwtToken, decodeJWT } = require("../utils");

// Controller for checking session expiry on browser close
const sessionExpireOnClose = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            // Iterate through the data and process each item
            response.forEach(async (item) => {
                try {
                    // Replace double quotes with single quotes for consistency
                    let modifiedContent = item.content.replace(/"/g, "'");
                    // Regular expression to match patterns indicative of jwt.verify usage

                    // const jwtVerifyRegex = /jwt\.sign\s*\([^)]*\)/g;
                    // const matches = modifiedContent.match(jwtVerifyRegex);

                    // if (matches && matches.length > 0) {
                    //     // Extract configuration used in jwt.verify
                    //     matches.forEach(match => {
                    //         console.log("match",match)
                    //         // Regular expression to extract configuration object inside jwt.verify
                    //         const configRegex = /\{[^{}]*\}/;
                    //         const configMatch = match.match(configRegex);
                    //         if (configMatch) {
                    //             // Parse the configuration object to JSON
                    //             const config = JSON.parse(configMatch[0]);
                    //             // Push configuration along with file name to results
                    //             results.push({ fileName: item.name, config: config });
                    //         }
                    //     });
                    // }
                    // Regular expression to match patterns indicative of jwt.verify usage
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
                    // expiresin  is value null regex
                    const expiresInRegex = /expiresIn:\s*['"](null|Infinity|\d+[smhd]{1})['"]/g;
                    let findtime = modifiedContent.match(expiresInRegex)
                    console.log(findtime)
                    if (findtime) {
                        const value = findtime[0].split(":")[1].trim().replace(/['"]/, '')
                        if (value === 'null') {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        } else if (value === 'Infinity') {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        } else if (value === '0') {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        } else if (value === 'undefined') {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        }
                        else if (value === 'NaN') {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        }
                        else if (value === 'false') {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        }
                        else if (value === 'true') {
                            results.push(`session_does_not_expire on closing browser in ${item.name}`);
                        }
                    }







                } catch (error) {

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
            response.forEach(async (item) => {
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
                    //    find expiresIn: '1d' in the file or expiresIn: 86400 Or expiresIn: 1m
                    const expiresInRegex = /expiresIn:\s*['"](\d+[smhd]{1})['"]/g;
                    let findtime = modifiedContent.match(expiresInRegex)
                    if (findtime) {
                        let time = findtime[0].replace("expiresIn:", "").replace(/'/g, "").trim()
                        if (time.includes('d')) {
                            let totalDays = time.replace('d', '')
                            let totalHours = totalDays * 24
                            let totalMinutes = totalHours * 60
                            let totalSeconds = totalMinutes * 60
                            if (totalSeconds > sevenDays) {
                                sessionTimeout = "High";
                            } else if (totalSeconds < oneMinute) {
                                sessionTimeout = "Low";
                            } else {
                                sessionTimeout = "Normal";
                            }


                        } else if (time.includes('m')) {
                            let totalMinutes = time.replace('m', '')
                            let totalSeconds = totalMinutes * 60
                            if (totalSeconds > sevenDays) {
                                sessionTimeout = "High";
                            } else if (totalSeconds < oneMinute) {
                                sessionTimeout = "Low";
                            } else {
                                sessionTimeout = "Normal";
                            }

                        }
                        else if (time.includes('s')) {
                            let totalSeconds = time.replace('s', '')
                            if (totalSeconds > sevenDays) {
                                sessionTimeout = "High";
                            } else if (totalSeconds < oneMinute) {
                                sessionTimeout = "Low";
                            } else {
                                sessionTimeout = "Normal";
                            }
                        }

                    }
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
const sessionTimeoutWithObject = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            let string = 'Session timout in'
            results.push({ [string]: "High" });
            // Iterate through the data and process each item
            response.forEach(async (item) => {
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
                    //    find expiresIn: '1d' in the file or expiresIn: 86400 Or expiresIn: 1m
                    const expiresInRegex = /expiresIn:\s*['"](\d+[smhd]{1})['"]/g;
                    let findtime = modifiedContent.match(expiresInRegex)
                    if (findtime) {
                        let time = findtime[0].replace("expiresIn:", "").replace(/'/g, "").trim()
                        if (time.includes('d')) {
                            let totalDays = time.replace('d', '')
                            let totalHours = totalDays * 24
                            let totalMinutes = totalHours * 60
                            let totalSeconds = totalMinutes * 60
                            if (totalSeconds > sevenDays) {
                                sessionTimeout = "High";
                            } else if (totalSeconds < oneMinute) {
                                sessionTimeout = "Low";
                            } else {
                                sessionTimeout = "Normal";
                            }


                        } else if (time.includes('m')) {
                            let totalMinutes = time.replace('m', '')
                            let totalSeconds = totalMinutes * 60
                            if (totalSeconds > sevenDays) {
                                sessionTimeout = "High";
                            } else if (totalSeconds < oneMinute) {
                                sessionTimeout = "Low";
                            } else {
                                sessionTimeout = "Normal";
                            }

                        }
                        else if (time.includes('s')) {
                            let totalSeconds = time.replace('s', '')
                            if (totalSeconds > sevenDays) {
                                sessionTimeout = "High";
                            } else if (totalSeconds < oneMinute) {
                                sessionTimeout = "Low";
                            } else {
                                sessionTimeout = "Normal";
                            }
                        }

                    }

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
                            let string = 'Session timout in' + item.name
                            results.push({ [string]: sessionTimeout });
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
                        let string = 'Session timout in' + item.name
                        results.push({ [string]: sessionTimeout });
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
                        let string = 'Session timout in' + item.name
                        results.push({ [string]: sessionTimeout });
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

                        let string = 'Session timout in' + item.name
                        results.push({ [string]: sessionTimeout });
                    }
                } catch (error) {

                    reject(error)
                    // Handle error if necessary
                }
            });

            // Resolve results
            resolve(results);


        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
};

// Controller for checking session token being passed in other areas apart from cookie
const sessionToken = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            response.forEach(async (item) => {
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
const sessionTokenWithObject = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            response.forEach(async (item) => {
                let modifiedcontent = item.content.replace(/"/g, "'")
                // Regular expression to match patterns indicative of jwt.verify and jwt.sign usage
                const jwtFunctionsRegex = /jwt\.(verify|sign)\s*\(/g;
                const matches = modifiedcontent.match(jwtFunctionsRegex);
                if (matches && matches.length > 0) {
                    results.push({ 'Session token Passed in': item.name });

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
            response.forEach(async (item) => {
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
const sessionFixationWithobject = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            // Iterate through the data and process each item
            response.forEach(async (item) => {
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
                            results.push({ 'session fixation is possible  in': item.name });
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
                                results.push({ 'session fixation is possible  in': item.name });
                            });
                        } else {
                            // If res.cookie is used but httpOnly is not set to true
                            results.push({ 'session fixation is possible  in': item.name });
                        }
                    }
                } catch (error) {

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
            response.forEach(async (item) => {
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
const sessionHijackingWithObject = async (response) => {
    return new Promise(async (resolve, reject) => {
        try {
            let results = []
            // Iterate through the data and process each item
            response.forEach(async (item) => {
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
                            results.push({ 'session hijacking is possible': item.name });
                        }
                    }
                    if (modifiedContent.includes("res.cookie")) {
                        // Regular expression to match setting a cookie with httpOnly: true
                        const cookiePattern = /res\.cookie\(['"]([^'"]+?)['"],\s*['"]([^'"]+?)['"],\s*{\s*httpOnly:\s*true\s*}/g;

                        // Check if session configuration includes setting a cookie with httpOnly: true
                        const rescookieMatch = modifiedContent.match(cookiePattern);
                        if (rescookieMatch) {
                            // Push session fixation possible result along with cookie name and value
                            results.push({ 'session hijacking is possible': item.name });
                        } else {
                            // If res.cookie is used but httpOnly is not set to true
                            results.push({ 'session hijacking is possible': item.name });
                        }
                    }
                } catch (error) {

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
// jwt token find and decode


const analyzeSessionCookie = (sessionCookie, localdata, sessiondata) => {

    return new Promise(async (resolve, reject) => {
        try {

            let sessionCookieobj = sessionCookie && sessionCookie.sessionData ? sessionCookie.sessionData : null
            let sessionCookiesdata = sessionCookie && sessionCookie.Cookiesdata ? sessionCookie.Cookiesdata : null
            let cookietoken = await findJwtToken(sessionCookiesdata).then((data) => data).catch((error) => null)
            let localstoragetoken = await findJwtToken(localdata).then((data) => data).catch((error) => null)
            let sessionstoragetoken = await findJwtToken(sessiondata).then((data) => data).catch((error) => null)
            console.log("token", cookietoken)
            console.log("localstoragetoken", localstoragetoken)
            console.log("sessionstoragetoken", sessionstoragetoken)
            let sessionExpiretotaltime = cookietoken || localstoragetoken || sessionstoragetoken
            console.log("sessionExpiretotaltime", sessionExpiretotaltime)

            let possibilities = {};
            let sessionNotFound = sessionCookieobj ? sessionCookieobj : null
            // Check if session token is being passed in other areas apart from cookies
            console.log("sessionNotFound", sessionNotFound)
            // Check if session token is being passed in other areas apart from cookies
            possibilities["Session Token Being Passed In Other Areas Apart From Cookies"] =
                (localdata && localdata.containsJWT) || (sessiondata && sessiondata.containsJWT) ? "Yes" : "No"

            // Check if session expires on closing the browser
            possibilities["Session Does Not Expire On Closing The Browser"] =
                (sessionNotFound?.originalMaxAge || sessionExpiretotaltime === null) ? "NO" : "Yes"

            // Check session timeout
            if (sessionNotFound?.originalMaxAge || sessionExpiretotaltime === null) {
                possibilities["Session Time-Out Is High (Or) Not Implemented"] = "Not Implemented"
            } else {
                const maxAge = sessionNotFound?.originalMaxAge || sessionExpiretotaltime;
                if (maxAge === null) {
                    possibilities["Session Time-Out Is High (Or) Not Implemented"] = "High (No timeout set)"
                } else {
                    // Convert maxAge to hours for easier interpretation
                    //convert maxage to days
                    const maxAgeHours = Math.floor(maxAge / 3600000);
                    console.log("maxAgeHours", maxAgeHours)
                    possibilities["Session Time-Out Is High (Or) Not Implemented"] =
                        maxAgeHours > 1 ? `High (${maxAgeHours} days)` : `Normal (${maxAgeHours} days)`
                }
            }

            // Check for session fixation vulnerability
            possibilities["An Adversary Can Hijack User Sessions By Session Fixation"] =
                !sessionNotFound ? "No" : !sessionNotFound.httpOnly ? "Yes" : "No"

            // Check for session hijacking vulnerability
            possibilities["Application Is Vulnerable To Session Hijacking Attack"] =
                !sessionNotFound ? "No" : !sessionNotFound.secure || sessionNotFound.sameSite === null ? "Yes" : "No"

            // Convert possibilities object to array of objects
            let results = Object.keys(possibilities).map(key => ({ [key]: possibilities[key] }));
            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    analyzeSessionCookie,
    sessionExpireOnClose, sessionTimeout, sessionFixation, sessionHijacking, sessionToken, sessionTimeoutWithObject, SessionVulnurability, sessionTokenWithObject, sessionFixationWithobject, sessionHijackingWithObject
}

