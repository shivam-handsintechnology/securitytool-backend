const analyzeSessionCookie = (sessionCookie) => {
    return new Promise((resolve, reject) => {
        try {
            let results = {
                properties: [],
                securityIssues: [],
                recommendations: []
            };

            const properties = [
                'path',
                '_expires',
                'originalMaxAge',
                'httpOnly',
                'secure',
                'domain',
                'sameSite'
            ];

            properties.forEach(prop => {
                let value = sessionCookie[prop];
                value = value !== undefined ? String(value) : 'undefined';

                results.properties.push({ property: prop, value: value });

                switch (prop) {
                    case 'path':
                        if (value !== '/') {
                            results.securityIssues.push('Path is not set to root');
                            results.recommendations.push('Consider setting path to "/" for broader cookie accessibility');
                        }
                        break;
                    case '_expires':
                        if (value === 'null') {
                            results.securityIssues.push('Session has no expiration');
                            results.recommendations.push('Set an expiration time to limit session duration');
                        }
                        break;
                    case 'originalMaxAge':
                        if (value === 'null') {
                            results.securityIssues.push('Session has no maximum age set');
                            results.recommendations.push('Set a maximum age for the session');
                        }
                        break;
                    case 'httpOnly':
                        if (value !== 'true') {
                            results.securityIssues.push('httpOnly flag is not set');
                            results.recommendations.push('Set httpOnly to true to mitigate XSS risks');
                        }
                        break;
                    case 'secure':
                        if (value !== 'true') {
                            results.securityIssues.push('secure flag is not set');
                            results.recommendations.push('Set secure flag to true if using HTTPS');
                        }
                        break;
                    case 'domain':
                        if (value === 'null') {
                            results.recommendations.push('Consider setting a specific domain for added security');
                        }
                        break;
                    case 'sameSite':
                        if (value === 'null') {
                            results.securityIssues.push('sameSite attribute is not set');
                            results.recommendations.push('Set sameSite to "Strict" or "Lax" to prevent CSRF attacks');
                        }
                        break;
                }
            });

            // Check for session expiration
            if (sessionCookie._expires === null && sessionCookie.originalMaxAge === null) {
                results.securityIssues.push('Session does not expire');
                results.recommendations.push('Implement session expiration for security');
            }

            // Check for secure transmission
            if (sessionCookie.secure !== true) {
                results.securityIssues.push('Cookie may be transmitted over insecure channel');
                results.recommendations.push('Ensure secure flag is set to true for HTTPS-only transmission');
            }

            // Check for potential session fixation vulnerability
            if (sessionCookie.httpOnly !== true) {
                results.securityIssues.push('Potential vulnerability to session fixation attacks');
                results.recommendations.push('Set httpOnly flag to true to mitigate session fixation risks');
            }

            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
};

// Example usage
const sessionCookieExample = {
    path: '/',
    _expires: null,
    originalMaxAge: null,
    httpOnly: true,
    secure: null,
    domain: null,
    sameSite: null
};

analyzeSessionCookie(sessionCookieExample)
    .then(results => console.log(JSON.stringify(results, null, 2)))
    .catch(error => console.error('Error:', error));
