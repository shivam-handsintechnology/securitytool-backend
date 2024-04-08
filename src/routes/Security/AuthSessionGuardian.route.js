
const axios = require("axios");
const { errorHandler } = require("../../utils/errorHandler");
const { sendResponse } = require("../../utils/dataHandler");
// session Liabraries
const sessionLibraries = [
    'express-session',
    'cookie-session',
    'express-session-store',
    'connect-session-sequelize',
    'express-mysql-session',
    'express-mongo-session',
    'express-redis-session',
    'express-session-cache-manager',
    'express-nedb-session'
];
const ExpressSessionConfig = async (content) => {
    
    return results
}

const Scanner = async (domain) => {
return new   Promise(async(resolve,reject)=>{
    try {
        const response = await axios.get(`http://${domain}/fileContent`)
        if (response.status === 200) {
            if (response.data && response.data.data) {
    
                if (Array.isArray(response.data.data)) {
                    const packgejson = response.data.data.find((item => item.name == "package"))
                    if (packgejson) {
                        const content = JSON.parse(packgejson.content);
                        // Check for dependencies
                        const dependencies = content.dependencies || {};
                        const devDependencies = content.devDependencies || {};
                        sessionLibraries.forEach(library => {
                            if (dependencies[library] || devDependencies[library]) {
                                console.log(library);
                                response.data.data.forEach(async (item) => {
                                    let modifiedcontent = item.content.replace(/"/g, "'")
                                    if (modifiedcontent.includes(`require('${library}')`) || modifiedcontent.includes(`from '${library}'`)) {
                                        
                                        const results = {
                                            jsonwebtoken: false,
                                            session: false,
                                            session_hijacking: false,
                                            session_timeout: "",
                                            secure_transmission: false,
                                            session_close_on_browser_close: false,
                                        };
                                        const cookieRegex = /cookie:\s*{\s*[\s\S]*?\s*}/;
                                        const cookieRegexmatch = modifiedcontent.match(cookieRegex);
                                        if (cookieRegexmatch) {
                                            const sevenDays = 86400000 * 7;
                                            const oneMinute = 60000;
                                            const sessionConfig = cookieRegexmatch[0].trim();
                                            const cookieString = sessionConfig.replace("cookie:", "");
                                            const cookieObject = eval(`(${cookieString})`);
                                    
                                            const isSecureTransmission = cookieObject.secure;
                                            results.secure_transmission = isSecureTransmission ? "session IDs are securely transmitted over encrypted channels (HTTPS)" : "session IDs are not securely transmitted over encrypted channels (HTTPS)";
                                    
                                            if (cookieObject["maxage"] === false || cookieObject["expires"] === false) {
                                                results.session_close_on_browser_close = true;
                                            } else if (
                                                cookieObject["maxage"] === null ||
                                                cookieObject["expires"] === null
                                            ) {
                                                results.session_timeout = "Infinite";
                                            } else if (
                                                cookieObject["maxage"] > sevenDays ||
                                                cookieObject["expires"] > sevenDays
                                            ) {
                                                results.session_timeout = "High";
                                            } else if (
                                                cookieObject["maxage"] < oneMinute ||
                                                cookieObject["expires"] < oneMinute
                                            ) {
                                                results.session_timeout = "Low";
                                            } else {
                                                results.session_timeout = "Normal";
                                            }
                                        }
                                        resolve(results)
                                    }else{
                                        reject({message:"Sesson Not found"})
                                    }
    
                                })
                            }
                        });
    
    
                    }
                }
            }
        }
    } catch (error) {
        reject(error)
    }
})
}

module.exports={
    SessionManagement:async(req,res)=>{
    try {
        let data=await Scanner(req.query.domain).then(res=>res)
        sendResponse(res,200,"sucess",data)
    } catch (error) {
        console.log(error)
        return errorHandler(res,500,error.message,{})
    }
    }
}