
const { default: axios } = require("axios")
const validator = require("validator")
const { sendResponse } = require("../../utils/dataHandler")
const { AllowedDomainsModel } = require("../../models/AllowedDomainsModel")
const { ScanDangerousMethods, getLatestNodeVersion, ScanArbitaryMethods, scanDirectoryOptionMethod } = require("../../utils/scanClientData")
const { errorHandler } = require("../../utils/errorHandler")
const { DefaultUserNamePasswordTest } = require("../../utils/TestWithPlayWright")

module.exports = {
    arbitraryMethods: async (req, res) => {
        try {
            let domain = req.query.domain
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                // let response = await axios.get(url)
                let response = req.body.fileContent

                let data = await ScanArbitaryMethods(response).then((data) => {
                    return data
                }
                )
                return sendResponse(res, 200, "success", data)

            } else {
                return sendResponse(res, 500, "Domain is Not Find");
            }
        } catch (error) {

            return errorHandler(res, 500, error.message)
        }
    },
    DangerousHttpMethodsEnabled: async (req, res) => {
        try {
            let domain = req.query.domain
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                let response = req.body.fileContent

                let data = await ScanDangerousMethods(response).then((data) => {
                    return data
                })
                return sendResponse(res, 200, "success", data)

            }
            else {
                return sendResponse(res, 500, "Domain is Not Find");
            }
        } catch (error) {

            return errorHandler(res, 500, error.message)
        }
    },
    OptionsMethodsEnabled: async (req, res) => {
        try {
            let response = req.body.fileContent
            let domain = req.query.domain
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                let data = await scanDirectoryOptionMethod(response).then((data) => {
                    return data
                })
                return sendResponse(res, 200, "success", data)

            }
            else {
                return sendResponse(res, 500, "Domain is Not Find");
            }

        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    },
    passwordsInsecure: async (req, res) => {
        try {

            let domain = req.query.domain
            let url = `http://${domain}/passwords-insecure`;
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                let response = await axios.get(url, {
                    headers: {
                        'origin': "https://securitytool.handsintechnology.in",
                    }
                })
                if (response.status === 200) {
                    if (typeof response.data !== 'object') {
                        throw new Error("Password not found")
                    }
                    console.log("password response", response.data.data.password)
                    let hashedPassword = response.data.data.password;
                    if (validator.isMD5(hashedPassword)) {
                        return sendResponse(res, 200, "success", "Password is Md5");
                    }

                    else if (validator.isHash(hashedPassword)) {
                        return sendResponse(res, 200, "success", "Password is Hash But we are not able to verify the algorithm");
                    }
                    else if (validator.isStrongPassword(hashedPassword)) {
                        return sendResponse(res, 200, "success", "Password is Strong But we are not able to verify the algorithm");
                    }

                    else if (!validator.isStrongPassword(hashedPassword)) {
                        return sendResponse(res, 200, "success", "Password is Weak");
                    } else {
                        return sendResponse(res, 200, "success", "Password is Weak");
                    }

                } else {
                    throw new Error("access Denied")
                }
            } else {
                throw new Error("Domain Is Not exist ")
            }
        } catch (error) {

            return errorHandler(res, 500, error.message,)
        }
    },
    WealALgorithmPassword: async (req, res) => {
        try {
            let domain = req.query.domain
            let url = `http://${domain}/passwords-insecure`;
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                let response = await axios.get(url, {
                    headers: {
                        'origin': "https://securitytool.handsintechnology.in",
                    }
                })
                if (response.status === 200) {
                    if (typeof response.data !== 'object') {
                        throw new Error("Password not found")
                    }
                    let hashedPassword = response.data.data.password;
                    if (validator.isStrongPassword(hashedPassword)) {
                        return sendResponse(res, 200, "success", "Password is Strong");
                    }
                    else if (!validator.isStrongPassword(hashedPassword)) {
                        return sendResponse(res, 200, "success", "Password is  Weak");
                    }
                } else {
                    throw new Error("access Denied")
                }
            } else {
                throw new Error("Domain Is Not exist ")
            }
        } catch (error) {

            return errorHandler(res, 500, error.message)
        }
    },
    supportoldnodejsversion: async (req, res) => {
        try {
            let domain = req.query.domain
            let url = `http://${domain}/support-oldnodejs=version`;
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                let response = await axios.get(url, {
                    headers: {
                        'origin': "https://securitytool.handsintechnology.in",
                    }
                })
                if (response.status === 200) {
                    if (typeof response.data !== 'object') {
                        throw new Error("Version not found")
                    }
                    if (!response.data.data && !response.data.data.version) {
                        throw new Error("Version not found")
                    }

                    let data = await getLatestNodeVersion(response.data.data.version)
                    return sendResponse(res, 200, "success", data)

                } else {
                    throw new Error("access Denied")
                }
            } else {
                return sendResponse(res, 500, "Domain is Not Find");
            }
        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    },
    defaultpasswordandusername: async (req, res) => {
        try {

            const domain = req.query.domain
            const headers = {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache'
            };
            const { username, password, email } = req.query
            const fullurl = `${req.protocol}://${req.get('host')}/api/videostream/`
            res.writeHead(200, headers);
            const SendEvent = (data, res = res) => {
                res.write(`data:${JSON.stringify(data)} \n\n`);
            }
            SendEvent({ message: "Scanning started", complete: false, time: Date.now() }, res);
            const results = await DefaultUserNamePasswordTest(`https://${domain}`, username, password, email, res, SendEvent, fullurl);
            console.log('Scanning completed:', results);

            SendEvent({ message: "Scanning completed", time: Date.now(), complete: true }, res);
            res.end(); // End the response after sending all data
        } catch (error) {
            console.error('Error occurred while scanning:', error);
            res.write(`data: ${JSON.stringify({ message: error.message, complete: true })} \n\n`)
            res.end(); // Ensure response is ended in case of error
        }
    }


}