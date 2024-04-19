const { ClientLoagsModel } = require('../../models/ClientLoagsModel');

module.exports={
    sessionData: async (req, res) => {
        try {
          let data = await ClientLoagsModel.aggregate([
            { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
            { $project: { "LogsData": 1 } }
          ]);
          if (data.length === 0) {
            return sendResponse(res, 404, "Records are not found");
          }
    
          return sendResponse(res, 200, "Fetch all domains", data.length > 0 ? data[0]["LogsData"] : {});
        } catch (error) {
          return sendResponse(res, 500, error.message);
    
        }
      },
    }