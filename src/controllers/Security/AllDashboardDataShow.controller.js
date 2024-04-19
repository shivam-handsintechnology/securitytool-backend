const { getDashboardData } = require("../../utils/scanClientData")

    module.exports = async (req, res) => {
      let data=await getDashboardData(req.body.fileContent)
        return res.status(200).json(data)

    }
