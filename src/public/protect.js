window.SecurityTool = {
    validateSecurityConfiguration: () => {
        let appid = window.appid;
        let configuration = window.SecurityValidatConfiguration;
        if (!appid) {
            return false;
        } else if (!configuration) {
            return false;
        } else if (Object.keys(configuration).length == 0) {
            return false;
        } else if (appid && configuration && Object.keys(configuration).length > 0) {
            return true;
        }
    },
    getAlllocalStorageData: async () => {
        const localStorageData = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            localStorageData[key] = value;
        }
        if (Object.keys(localStorageData).length === 0) {
            return null;
        } else {
            return localStorageData;
        }
    },
    sendToApi: async (url, data) => {
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: data, appid: window.appid, domain: window.location.hostname }),
            }).then((response) => {
                if (response.ok) {
                    console.log('Data sent successfully');
                } else {
                    console.error('Failed to send data');
                }
            }).catch((error) => {
                console.error('Failed to send data', error);
            });
        } catch (error) {
            console.log("Error in sending data to API", error);
        }
    },
    CallSensitivedataLocalStorage: async () => {
        let data = await window.SecurityTool.getAlllocalStorageData();
        if (data !== null) {
            let url = 'https://securitytool.handsintechnology.in/api/client/protection';
            window.SecurityTool.sendToApi(url, data).then(res => res).catch(err => err);
        }
    },
    hasDuplicateParameters: (params) => {
        const seen = new Set();
        for (const param in params) {
            if (seen.has(param)) {
                return true; // Duplicate parameter found
            }
            seen.add(param);
        }
        return false; // No duplicate parameters found
    },
    hasSqlInjection: function (value) {
        const sqlMeta = new RegExp("(%27)|(--)|([0-9]=[0-9])|([0-9] and [0-9]=[0-9])|([0-9] AND [0-9])|(or [0-9]=[0-9])|(OR [0-9]=[0-9])|(%23)|(#)", "i");
        if (sqlMeta.test(value)) {
            return true;
        }

        const sqlMeta2 = new RegExp("((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))", "i");
        if (sqlMeta2.test(value)) {
            return true;
        }

        const nestedQuery = new RegExp("((%3D)|(=))[^\n]*((%27)|(')|(--)|(%3B)|(;))?[^\n]*((%27)|(')|(--)|(%3B)|(;))[^\n]*((%3D)|(=))", "i");
        if (nestedQuery.test(value)) {
            return true;
        }

        const timeBased = new RegExp("(%3B)|(;)[^\n]*sleep[^\n]*(\d+)[^\n]*", "i");
        if (timeBased.test(value)) {
            return true;
        }

        const booleanBased = new RegExp("((%3D)|(=))[^\n]*[^s]*(%27)|(')|(--)|(%3B)|(;)", "i");
        if (booleanBased.test(value)) {
            return true;
        }

        const typicalSql = new RegExp("w*((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))", "i");
        if (typicalSql.test(value)) {
            return true;
        }

        const sqlUnion = new RegExp("((%27)|('))union", "i");
        if (sqlUnion.test(value)) {
            return true;
        }

        const entireText = new RegExp("\b((select|delete|insert|update|drop|create|alter|order by|and)\b.*)", "i");
        if (entireText.test(value)) {
            return true;
        }

        return false;
    },
    hasCommandLineInjection: function (value) {
        const regexPattern = /(?:\/\*\*\/|\/\*.*?\*\/|\/\/.*?(?=\r?\n)|< !--.*?- ->|(?:&lt;|<)!\-\-.*?\-\-(?:&gt;|>)|\b(?:cat\s*?\/?|grep|system\(\s*?['"`]{0,1}|`\s*?\w+|[|&;`\(\)\s]\s*?\/?(?:bin\/\w+|usr\/\w+|n?cat\s+[\\|;&\(\)\/\w]+?)\s*?[\?&;|`]|(?:;|\?\?|\\\\n|\\\\r\s*\n?)\s*?[\\\;&\|`\(\)\s]?\/\w+\/\w+|['"`&\|`][\s\r\n]|[\?\&][\s\r\n]))|(?:npm\s+(?:install|i|update|uninstall|--version|--help|--force))|(?:yarn\s+(?:add|remove|upgrade|--version|--help|--force))|(?:node\s+[\w\.-]+\.js)|(?:rm\s+-\w*\s*[\w\/\.-]*)|(?:mv\s+[\w\/\.-]+\s+[\w\/\.-]+)|(?:cp\s+[\w\/\.-]+\s+[\w\/\.-]+)|(?:mkdir\s+[\w\/\.-]+)|(?:touch\s+[\w\/\.-]+)|(?:chmod\s+[\w\/\.-]+)|(?:chown\s+[\w\/\.-]+)|(?:ps\s+\w*)|(?:top)|(?:kill\s+-\w*\s*\d+)|(?:pkill\s+\w+)|(?:\(\)\s*\{\s*:;\s*\}\s*;\s*\/\s*\w+(?:\/\s*\w+)?\s*-\w+\s*['"`](?:.*?['"`\?\&]|.*?))/i;

        const commandMeta = new RegExp(regexPattern);

        if (commandMeta.test(value)) {
            return true;
        }

        return false;
    },
    hasHTMLnjection: function (value) {
        const HTML = new RegExp(/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/, "g");
        if (HTML.test(value)) {
            return true;
        }
        return false;
    },
    cssInjectionRegex: /<style[^>]*>|<\/style>|url\s*\((['"]?)javascript:\w*\(\1\)\1\)/gi,
    hasCSSInjection: function (value) {
        if (this.cssInjectionRegex.test(value)) {
            return true;
        }
        return false;
    },
    xssRegex: new RegExp('(<script\\b[^>]*>[\\s\\S]*?<\\/script>|<svg\\b|<object\\b|<embed\\b|<iframe\\b|<link\\b|<video\\b|<audio\\b|<body\\b|<frame\\b|<meta\\b|<title\\b|<head\\b|<html\\b|<base\\b|<blink\\b|<marquee\\b|<expression\\b|\\b(?:alert|confirm|console|dialog|prompt|req|response|showModalDialog|write(?:ln)?|XSS|valueOf)?\\s*?[(\'""/] | (?:\\b|[^\\\\])(?:\\\\\\\\)*/?\\s*(?:--|>|<|%3C|%3E|%00|&#x0[0-9a-f]);?)', 'gi'),
    hasXSSInjection: function (value) {
        if (this.xssRegex.test(value)) {
            return true;
        }
        return false;
    },
    InjectionChecker: function (payload) {
        let containsSql = false,
            validateXss = false,
            validatehtml = false,
            containCommand = false,
            containiframetag = false,
            validateCss = false;
        const value = JSON.stringify(payload)?.toLowerCase();
        if (value.includes("<iframe")) {
            containiframetag = true;
        }
        if (this.hasCSSInjection(value) === true) {
            validateCss = true;
        }
        if (this.hasXSSInjection(value) === true) {
            validateXss = true;
        }
        if (this.hasHTMLnjection(value) === true) {
            validatehtml = true;
        }
        if (this.hasCommandLineInjection(value) === true) {
            containCommand = true;
        }
        if (this.hasSqlInjection(value) === true) {
            containsSql = true;
        }

        return { containsSql, validateXss, validatehtml, containCommand, containiframetag, validateCss };
    },
    CreateuserDetails: async function (type) {
        try {
            const data = {
                page: window.location.pathname,
                referurl: window.location.href,
                type
            };

            await window.SecurityTool.sendToApi("https://securitytool.handsintechnology.in/api/client/createuserdetailsfromclient", data)
                .then(res => res)
                .catch(err => err);
        } catch (error) {
            console.log("error in malicious data create ", error);
        }
    },

};

if (typeof window !== "undefined" && !window.CustomXMLHttpRequest) {
    class CustomXMLHttpRequest extends XMLHttpRequest {
        constructor() {
            super();
            const configuration = window.SecurityValidatConfiguration;

            // Override the open method
            const originalOpen = this.open;
            this.open = function (method, url, async, user, password) {
                this._method = method;
                this._url = url;
                console.log(`Making request to ${url}`);
                // Call the original open method
                originalOpen.apply(this, arguments);
            };

            // Override the send method
            const originalSend = this.send;
            this.send = function (body) {
                console.log('XHR called with method:', this._method);
                console.log('XHR payload:', body);

                try {
                    let validate = window.SecurityTool.validateSecurityConfiguration();
                    if (!validate) {
                        console.log("Provide valid data according to Docs")
                        throw new Error("Provide valid data according to Docs");
                    }

                    const urlParams = new URLSearchParams(window.location.search);
                    const queries = Object.fromEntries(urlParams.entries());
                    console.log("queries", queries);

                    let examplebody = {};
                    let readjson = () => {
                        try {
                            examplebody = JSON.parse(body);
                            examplebody = { body, ...queries };
                        } catch (error) {
                            console.log(error)
                            examplebody = { body: body, ...queries };
                        }
                    };
                    readjson();

                    const injectionFound = window.SecurityTool.InjectionChecker(examplebody);
                    console.log("injectionFound", injectionFound)
                    let duplicateQueries = window.SecurityTool.hasDuplicateParameters(queries);
                    if (injectionFound.validateCss && configuration.css) {
                        alert("CSS detected");
                        window.SecurityTool.CreateuserDetails("css");
                        return; // Stop execution
                    } else if (injectionFound.containCommand && configuration.commandline) {
                        alert("Command detected");
                        window.SecurityTool.CreateuserDetails("commandline");
                        return; // Stop execution
                    } else if (injectionFound.validateXss && configuration.xss) {
                        alert("XSS detected");
                        window.SecurityTool.CreateuserDetails("xss");
                        return; // Stop execution
                    } else if (injectionFound.containiframetag && configuration.iframe) {
                        alert("Iframe detected");
                        window.SecurityTool.CreateuserDetails("iframe");
                        return; // Stop execution
                    } else if (injectionFound.validatehtml && configuration.html) {
                        alert("HTML detected");
                        window.SecurityTool.CreateuserDetails("html");
                        return; // Stop execution
                    } else if (injectionFound.containsSql && configuration.Sql) {
                        alert("SQL detected");
                        window.SecurityTool.CreateuserDetails("sql");
                        return; // Stop execution
                    } else if (duplicateQueries) {
                        alert("Http parameter pollution detected");
                        window.SecurityTool.CreateuserDetails("httpParameterPollution");
                        return; // Stop execution
                    }

                } catch (error) {
                    console.log(error)
                }
                const xhr = this;

                const onReadyStateChange = function () {
                    if (xhr.readyState === 4) { // 4 means the request is done
                        console.log('XHR response data:', xhr.responseText);
                        let validate = window.SecurityTool.validateSecurityConfiguration();
                        setTimeout(async () => {
                            if (!validate) {
                                throw new Error("Provide valid data according to Docs");
                            } else {
                                await window.SecurityTool.CallSensitivedataLocalStorage().then(res => res).catch(err => err);
                            }
                        }, 500);
                    }
                };

                this.addEventListener('readystatechange', onReadyStateChange);

                // Call the original send method
                originalSend.apply(this, arguments);
            };
        }
    }

    // Override the global XMLHttpRequest
    window.XMLHttpRequest = CustomXMLHttpRequest;
    window.CustomXMLHttpRequest = CustomXMLHttpRequest; // Store a reference to prevent redeclaration
}




