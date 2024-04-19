const { errorHandler } = require("../utils/errorHandler")
const axios = require("axios")
module.exports = async (req, res, next) => {
        try {
            let payload = { ...req.body, ...req.query, ...req.params }
            let domain =payload.domain
            let response = await axios.get(`http://${domain}/fileContent`).then(response => response).catch(error => error.response)
          
            if (response.status == 200) {
                req.body.fileContent = response.data.data
            }
            if (response.status >= 400) {
                throw new Error("Access Denied")
            }
            next()
        } catch (error) {
            return errorHandler(res, 500, error.message)
        }
    }
