async function CheckAllSensitiveData(data) {
    try {

        const result = [];

        // Recursive function to check for sensitive data in nested objects or arrays
        function checkForSensitiveData(obj) {
            if (Array.isArray(obj)) {
                obj.forEach(item => {
                    if (typeof item === 'object' && item !== null) {
                        // Check if the item is an object with a 'value' property
                        if (item.hasOwnProperty('value')) {
                            checkValue(item);
                        } else {
                            checkForSensitiveData(item); // Recursive call for nested objects or arrays
                        }
                    }
                });
            } else if (typeof obj === 'object' && obj !== null) {
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        const value = obj[key];
                        if (typeof value === 'object' && value !== null) {
                            checkForSensitiveData(value); // Recursive call for nested objects or arrays
                        } else if (typeof value === 'string') {
                            checkValue({ key, value });
                        }
                    }
                }
            }
            return result;
        }

        // Helper function to check the value for sensitive data
        function checkValue(item) {
            let { key, value } = item;

            const sensitiveData = { Email: false, "JSON Web Token": false, ObjectId: false, PassportNumber: false, CreditCard: false, Password: false, PhoneNumber: false, UUID: false };
            if (typeof value === 'string') {
                // Remove leading and trailing quotes

                value = value.replace(/^"|"$/g, '')
                value = value.replace(/^'|'$/g, '')
                // Check if the value is a stringified JSON object
                if (isJsonString(value)) {
                    const parsedValue = JSON.parse(value);
                    checkForSensitiveData(parsedValue);
                } else {
                    // Check if the value is a string containing sensitive data
                    if (validator.isEmail(value)) {
                        sensitiveData.Email = true;
                    }
                    else if (validator.isJWT(value)) {
                        sensitiveData["JSON Web Token"] = true;
                    }
                    else if (validator.isMongoId(value)) {
                        sensitiveData.ObjectId = true;
                    }
                    else if (validator.isCreditCard(value)) {
                        sensitiveData.CreditCard = true;
                    }
                    else if (validator.isStrongPassword(value)) {
                        sensitiveData.Password = true;
                    }
                    else if (validator.isMobilePhone(value)) {
                        sensitiveData.PhoneNumber = true;
                    }
                    else if (validator.isUUID(value)) {
                        sensitiveData.UUID = true
                    }


                }
            }

            result.push({ key, value: sensitiveData });
        }

        // Helper function to check if a string is a valid JSON string
        function isJsonString(str) {
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        // Start checking for sensitive data
        return checkForSensitiveData(data);
    } catch (error) {
        console.log("Error in CheckAllSensitiveData", error)
        throw new Error(error.message);
    }
}
function decodeJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }

    const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

    return { header, payload };
}

function decodeBase64(base64String) {
    try {
        return atob(base64String.replace(/-/g, '+').replace(/_/g, '/'));
    } catch (e) {
        return null;
    }
}

function decodeExpressSessionToken(token) {
    const parts = token.split('.');
    if (parts.length !== 2) {
        throw new Error('Invalid Express session token format');
    }

    const sessionId = parts[0].split(':')[1];
    const signature = parts[1];

    return { sessionId, signature };
}

function convertSecondsToLocalTime(seconds) {
    var date = new Date(seconds * 1000);
    return date.toLocaleTimeString();
}

// Example usage:
const token = "s:cRq5hrwHfJr_V696h9AwBiorh00GZnYU.9qiSYNIiByzOOdaYYOXcWlbWYuRCoZB4CC3Q2NWi/Ts";

let decoded;
try {
    decoded = decodeJWT(token);
    console.log("JWT decoded:", decoded);
} catch (e) {
    console.log("Not a valid JWT. Attempting to decode as Express session token.");
    try {
        decoded = decodeExpressSessionToken(token);
        console.log("Express session token decoded:", decoded);
    } catch (e) {
        console.log("Failed to decode token:", e.message);
    }
}

