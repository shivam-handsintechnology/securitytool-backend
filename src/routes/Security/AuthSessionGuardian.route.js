
const axios = require("axios");
const router = require("express").Router()
const { errorHandler } = require("../../utils/errorHandler");
const { sendResponse } = require("../../utils/dataHandler");
const { sessionExpireOnClose, sessionTimeout, sessionFixation, sessionHijacking, sessionToken, SessionVulnurability } = require("../../helpers/SessionVulnurabiltyChecker");
// session Liabraries



// module.exports={
//     SessionManagement:async(req,res)=>{
//     try {
//         let data=await Scanner(req.query.domain).then(res=>res)
//         sendResponse(res,200,"sucess",data)
//     } catch (error) {
//         console.log(error)
//         return errorHandler(res,500,error.message,{})
//     }
//     }
// }
router.get("/session-vulnurability", async (req, res) => {
    try {
        // Call the respective controller function
        const response = await axios.get(`http://${req.query.domain}/fileContent`)
        const data = await SessionVulnurability(response);
        // Initialize an object to store all possibilities
        const possibilities = {};

        // Check if session expires on closing the browser
        possibilities["Session Does Not Expire On Closing The Browser"] = data.sessionExpireOnClose_data.length > 0 ? "Yes" : "No";

        // Check if session timeout is high or not implemented
        const sessionTimeoutImplemented = data.sessionTimeout_data.length > 0;
        possibilities["Session Time-Out Is High (Or) Not Implemented"] = !sessionTimeoutImplemented ? "Not IMplemented" :data.sessionTimeout_data.toString();

        // Check if session token is passed in areas other than cookies
        possibilities["Session Token Being Passed In Other Areas Apart From Cookies"] = data.sessionToken_data.length > 0 ?data.sessionToken_data.toString() : "No";

        // Check if an adversary can hijack user sessions by session fixation
        const sessionFixationPossible = data.sessionFixation_data.length>0
        possibilities["An Adversary Can Hijack User Sessions By Session Fixation"] = sessionFixationPossible ? data.sessionFixation_data.toString() : "No";

        // Check if the application is vulnerable to session hijacking attack
        const sessionHijackingPossible = data.sessionHijacking_data.length>0
        possibilities["Application Is Vulnerable To Session Hijacking Attack"] = sessionHijackingPossible ? data.sessionHijacking_data.toString() : "No";

        console.log(possibilities);
        let results=[]
        if(Object.keys(possibilities).length>0){
           results= Object.keys(possibilities).map((key) => {
            return {
                [key]: possibilities[key]
            }
           })
        }
        return sendResponse(res,200,"fetch",results)
     
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

router.get("/session-expire-on-close", async (req, res) => {
    try {
        // Call the respective controller function
        const response = await axios.get(`http://${req.query.domain}/fileContent`)
        const results = await sessionExpireOnClose(response);
        return sendResponse(res,200,"dsad",results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

// Route for checking session timeout
router.get("/session-timeout", async (req, res) => {
    try {
        // Call the respective controller function
        const response = await axios.get(`http://${req.query.domain}/fileContent`)
        const results = await sessionTimeout(response);
        return sendResponse(res,200,"dsad",results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

// Route for checking session token being passed in other areas apart from cookie
router.get("/session-token", async (req, res) => {
    try {
        // Call the respective controller function
        const response = await axios.get(`http://${req.query.domain}/fileContent`)
        const results = await sessionToken(response);
        return sendResponse(res,200,"dsad",results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

// Route for checking session fixation vulnerability
router.get("/session-fixation", async (req, res) => {
    try {
        // Call the respective controller function
        const response = await axios.get(`http://${req.query.domain}/fileContent`)
        const results = await sessionFixation(response);
        return sendResponse(res,200,"dsad",results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

// Route for checking session hijacking vulnerability
router.get("/session-hijacking", async (req, res) => {
    try {
        // Call the respective controller function
        const response = await axios.get(`http://${req.query.domain}/fileContent`)
        const results = await sessionHijacking(response);
        return sendResponse(res,200,"dsad",results)
    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
});

module.exports = router