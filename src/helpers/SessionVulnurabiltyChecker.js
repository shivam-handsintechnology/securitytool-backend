
const { findJwtToken } = require("../utils");
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
    analyzeSessionCookie
}

