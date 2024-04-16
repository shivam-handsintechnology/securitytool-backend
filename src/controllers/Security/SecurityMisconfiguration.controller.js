const { ClientLoagsModel } = require("../../models/ClientLoagsModel")
const mongoose = require("mongoose")
const { sendResponse } = require("../../utils/dataHandler")
const { AllowedDomainsModel } = require("../../models/AllowedDomainsModel")
const { default: axios } = require("axios")
const { ScanDangerousMethods, getLatestNodeVersion,ScanArbitaryMethods,scanDirectoryOptionMethod } = require("../../utils/scanClientData")
const { PasswordHashingDataModel } = require("../../models/Security/SecurityMisconfiguration.model")
const { errorHandler } = require("../../utils/errorHandler")
const EndpointsModel = require("../../models/Security/Endpoints.model")
const ObjectId = mongoose.Types.ObjectId
module.exports = {
    arbitraryMethods: async (req, res) => {
       try {
        let domain = req.query.domain
        let url = `http://${domain}/fileContent`;
        let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
        if (isExistDomain) {
            // let response = await axios.get(url)
            let response = await axios.get('http://localhost:20000/fileContent')
            if (response.status === 200) {
                let data = await ScanArbitaryMethods(response).then((data) => {
                    return data
                }
                )
              return  sendResponse(res, 200, "success", data)
            } else {
              return  sendResponse(res, 200, "success", [])
            }
            console.log("response", response.data)
        } else {
            return sendResponse(res, 500, "Domain is Not Find");
        }
       } catch (error) {
        console.log("error",error)
        return errorHandler(res,500,error.message)
       }
    },
    DangerousHttpMethodsEnabled: async (req, res) => {
     try {
        let domain = req.query.domain
        let url = `http://${domain}/fileContent`;
        let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
        // if (isExistDomain) {
       // let response = await axios.get(url)
       let response = await axios.get('http://localhost:20000/fileContent')
            if (response.status === 200) {
             
                let data = await ScanDangerousMethods(response).then((data) => {
                    return data
                })
               return sendResponse(res, 200, "success", data)
            } else {
              return  sendResponse(res, 200, "success", [])
            }
            console.log("response", response.data)
        // } 
        // else {
        //     return sendResponse(res, 500, "Domain is Not Find");
        // }
     } catch (error) {
        console.log(error)
        return errorHandler(res,500,error.message)
     }
    },
    OptionsMethodsEnabled: async (req, res) => {
      try {
        let domain = req.query.domain
        let url = `http://${domain}/fileContent`;
        let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
        // if (isExistDomain) {
       // let response = await axios.get(url)
       let response = await axios.get('http://localhost:20000/fileContent')
            if (response.status === 200) {
             
                let data = await scanDirectoryOptionMethod(response).then((data) => {
                    return data
                })
               return sendResponse(res, 200, "success", data)
            } else {
              return  sendResponse(res, 200, "success", [])
            }
            console.log("response", response.data)
        // } 
        // else {
        //     return sendResponse(res, 500, "Domain is Not Find");
        // }
      } catch (error) {
        return errorHandler(res,500,error.message)
      }
    },
    passwordsInsecure: async (req, res) => {
        try {
            const passwordTestHashes = await PasswordHashingDataModel.aggregate([
                { $match: {} }
            ]);
            let domain = req.query.domain
            let url = `http://${domain}/passwords-insecure`;
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                let response = await axios.get(url)
                if (response.status === 200) {
                    console.log(response.data)
                    let obj = "Password is not hashed"
                    for (const item of passwordTestHashes) {
                        const regexPattern = new RegExp(eval(item.regex));
                        if (regexPattern.test(response.data.data.password)) {
                            obj = `password found with ${item.name} algorithm`;
                            break; // Once a match is found, exit the loop
                        }
                    }

                    if (!obj) {
                        return sendResponse(res, 200, "success", "Password is not hashed");
                    }

                    return sendResponse(res, 200, "success", obj);
                } else {
                    return  sendResponse(res, 200, "success", "Data Not found")
                }
            } else {
                throw new Error("Domain Is Not exist ")
            }
        } catch (error) {
            console.log(":error", error)
            return errorHandler(res, 500, "success", error.message)
        }
    },
    WealALgorithmPassword: async (req, res) => {
        try {
            const WeeakPasswordAlgorith=[
                {name:"MD5"},
                {name:"SHA-1"},
                {name:"SHA-256"},
                {name:"SHA-512"},
            ]
            const passwordTestHashes = await PasswordHashingDataModel.aggregate([
                { $match: {} }
            ]);
            let domain = req.query.domain
            let url = `http://${domain}/passwords-insecure`;
            let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
            if (isExistDomain) {
                let response = await axios.get(url)
                if (response.status === 200) {
                    console.log(response.data)
                    let obj = "Password is not hashed"
                    for (const item of passwordTestHashes) {
                        const regexPattern = new RegExp(eval(item.regex));
                        if (regexPattern.test(response.data.data.password)) {
                            let weekPassword=WeeakPasswordAlgorith.find((obj)=>obj.name===item.name)
                            obj = weekPassword?`password found with ${item.name} algorithm`:"Password is not hashed";

                            break; // Once a match is found, exit the loop
                        }
                    }

                    if (!obj) {
                        return sendResponse(res, 200, "success", "Password is not hashed");
                    }

                    return sendResponse(res, 200, "success", obj);
                } else {
                    return  sendResponse(res, 200, "success", "Data Not found")
                }
            } else {
                throw new Error("Domain Is Not exist ")
            }
        } catch (error) {
            console.log(":error", error)
            return errorHandler(res, 500, "success", error.message)
        }
    },
    supportoldnodejsversion: async (req, res) => {
       try {
        let domain = req.query.domain
        let url = `http://${domain}/support-oldnodejs=version`;
        let isExistDomain = await AllowedDomainsModel.findOne({ domain: domain, user: req.user.id });
        if (isExistDomain) {
            let response = await axios.get(url)
            if (response.status === 200) {
                
                if (!response.data.data && !response.data.data.version) {
                    throw new Error("Version not found")
                }

                let data = await getLatestNodeVersion(response.data.data.version)
                return sendResponse(res, 200, "success", data)

            } else {
                return sendResponse(res, 200, "success", [])
            }
        } else {
            return sendResponse(res, 500, "Domain is Not Find");
        }
       } catch (error) {
        return errorHandler(res, 500, "success", error.message) 
       }
    },
    endpoints: async (req, res) => {
       try {
         const {endpoints,hostname,appid} = req.body
         let response
            if(!endpoints) throw new Error('Endpoints is required')
            if(!hostname) throw new Error('Hostname is required')
            if(!appid) throw new Error('App ID is required')
            let data = {
                domain: hostname,
                appid: appid,
            }
            let isExist = await EndpointsModel.findOne(data).select("_id")
            if(!isExist){
                data["endpoints"] = endpoints
                response=  await EndpointsModel.create(data)
            }else if (isExist ){
                data["endpoints"] = endpoints
                response=   await EndpointsModel.findOneAndUpdate({domain:hostname,appid:appid},{domain:hostname,appid:appid,endpoints:endpoints},{new:true,upsert:true})
            }
            return sendResponse(res, 200, "success", response)

       } catch (error) {
        return errorHandler(res, 500, "success", error.message) 
       }
    },
}