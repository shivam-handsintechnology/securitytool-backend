async function DeleteKeys(domain, appid, type, _id, key, model, arrayField = "sensitivekeys") {
    return new Promise(async (resolve, reject) => {
        try {
            // Log the input parameters
            console.log(`DeleteKeys called with domain: ${domain}, appid: ${appid}, type: ${type}, _id: ${_id}, key: ${key}`);

            // Check if the document exists and the key is present in the array
            const doc = await model.findOne({ user: _id, domain: domain, appid: appid, type: type });
            if (!doc) {
                throw new Error("Document not found.");
            }

            if (!doc[arrayField].includes(key)) {
                throw new Error("Key not found in the array.");
            }

            // Log the current state of the document
            console.log('Current document:', doc);

            // Attempt to update the document
            const result = await model.findOneAndUpdate(
                { user: _id, domain: domain, appid: appid, type: type },
                { $pull: { [arrayField]: key } },
                { new: true } // Return the updated document
            );

            // Log the result of the update operation
            console.log('Update result:', result);
            resolve(result);
        } catch (error) {
            console.error('Error in DeleteKeys:', error);
            reject(error);
        }
    });
}

async function GetPaginatedSensitiveKeys(domain, appid, type, page = 1, limit = 10, _id, model, arrayField = "sensitivekeys") {
    return new Promise(async (resolve, reject) => {
        try {
            try {
                console.log("domain", domain, "appid", appid, "type", type, "page", page, "limit", limit, "_id", _id)
                // Calculate the number of documents to skip based on the current page and limit
                const skip = (page - 1) * limit;

                // Find the document with the matching criteria
                const document = await model.findOne({
                    user: _id,
                    domain,
                    appid,
                    type
                });

                if (!document) {
                    resolve({
                        success: false,
                        message: "No document found.",
                        data: []
                    })

                }

                // Get the sensitivekeys array and apply pagination
                const paginatedKeys = document[arrayField].slice(skip, skip + limit);
                resolve(
                    {
                        success: true,
                        message: "Paginated sensitive keys fetched successfully.",
                        data: paginatedKeys,
                        page,
                        limit,
                        total: document[arrayField].length
                    })
            } catch (error) {
                console.error("Error fetching paginated sensitive keys:", error);
                resolve({
                    success: false,
                    message: "An error occurred while fetching paginated sensitive keys.",
                    data: []
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = { DeleteKeys, GetPaginatedSensitiveKeys }