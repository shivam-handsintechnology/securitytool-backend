window.SecurityTool = {
    validateSecurityConfiguration: () => {
        let appid = window.appid;
        if (!appid) {
            return false;
        } else if (appid) {
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
    getAllSessionStorageData: async () => {
        const SessionStorageData = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);
            SessionStorageData[key] = value;
        }
        if (Object.keys(SessionStorageData).length === 0) {
            return null;
        } else {
            return SessionStorageData;
        }
    },
    sendToApi: async (url, data, sessionStoragedata) => {
        try {

            let obj = {
                data: data, appid: window.appid, subdomain: window.location.hostname
            }
            if (sessionStoragedata) {
                obj["sessionStoragedata"] = sessionStoragedata
            }
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
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
        let sessionStoragedata = await window.SecurityTool.getAllSessionStorageData()
        if (data !== null) {
            let url = 'https://securitytool.handsintechnology.in/api/client/protection';
            window.SecurityTool.sendToApi(url, data, sessionStoragedata).then(res => res).catch(err => err);
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


class CustomXMLHttpRequest extends XMLHttpRequest {
    constructor() {
        super();

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
            try {
                let validate = window.SecurityTool.validateSecurityConfiguration();
                if (!validate) {
                    console.log("Provide valid data according to Docs")
                    throw new Error("Provide valid data according to Docs");
                }

                const urlParams = new URLSearchParams(window.location.search);
                const queries = Object.fromEntries(urlParams.entries());
                let duplicateQueries = window.SecurityTool.hasDuplicateParameters(queries);
                if (duplicateQueries) {
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
                    let validate = window.SecurityTool.validateSecurityConfiguration();

                    if (!validate) {
                        throw new Error("Provide valid data according to Docs");
                    } else {
                        window.SecurityTool.CallSensitivedataLocalStorage().then(res => res).catch(err => err);
                    }

                }
            };

            this.addEventListener('readystatechange', onReadyStateChange);

            // Call the original send method
            originalSend.apply(this, arguments);
        };
    }
}

// Override the global XMLHttpRequest
// Override the global XMLHttpRequest
window.XMLHttpRequest = CustomXMLHttpRequest;
window.CustomXMLHttpRequest = CustomXMLHttpRequest; // Store a reference to prevent redeclaration

window.SecurityTool && window.SecurityTool.CallSensitivedataLocalStorage();




