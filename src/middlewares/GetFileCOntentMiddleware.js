const { errorHandler } = require("../utils/errorHandler")
const axios = require("axios")
module.exports = async (req, res, next) => {
        try {
            let payload = { ...req.body, ...req.query, ...req.params }
            let domain =payload.domain
            let response = await axios.get(`http://${domain}/fileContent`,{
                headers: {
                    'origin': "https://securitytool.handsintechnology.in",
                }
            }).then(response => response).catch(error => error.response)
            console.log({response:response.status})
            if (response.status == 200) {
                if(Array.isArray(response.data.data)){
                    req.body.fileContent = response.data.data
                }
                if(!Array.isArray(response.data.data)){
                    throw new Error("Invalid File Content")
                }
                
            }else if(response.status===502){
                throw new Error("Bad Gateway")
            }else if (response.status >= 400) {
                throw new Error("Access Denied")
            }
            next()
        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    }
