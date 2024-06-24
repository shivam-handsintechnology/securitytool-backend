const { sendResponse } = require('../utils/dataHandler');
const { errorHandler } = require('../utils/errorHandler');
const SEO = require('../models/SEO.Model'); // Adjust the path as needed

// Create (C)
async function createSEO(req, res) {
    try {
        const data = { ...req.query, ...req.body }
        const newSEO = new SEO(data);
        await newSEO.save();
        return sendResponse(res, 200, "Created")
    } catch (error) {
        console.error('Error creating SEO:', error);
        return errorHandler(res, 500, error.message)
    }
}

// Read (R)
async function getSEOByUrl(req, res) {
    try {

        let data = await SEO.findOne({ url: req.query.url });
        return sendResponse(res, 200, "data", data)
    } catch (error) {
        console.error('Error getting SEO:', error);
        return errorHandler(res, 500, error.message)
    }
}

// Update (U)
async function updateSEO(req, res) {
    const { url, } = req.query
    try {
        let data = await SEO.findOne({ url: req.query.url });
        if (!data) {
            return errorHandler(res, 400, "Url Does Not exist")
        }
        await SEO.findOneAndUpdate({ url }, req.body, { new: true, runValidators: true, });
        return sendResponse(res, 200, "Updated Successfully")
    } catch (error) {
        console.error('Error updating SEO:', error);
        return errorHandler(res, 500, error.message)
    }
}

// Delete (D)
async function deleteSEO(req, res) {
    try {
        await SEO.findOneAndDelete({ url: req.query.url });
        return sendResponse(res, 200, "Deleted Successfully")
    } catch (error) {
        console.error('Error deleting SEO:', error);
        return errorHandler(res, 500, error.message)
    }
}

module.exports = {
    createSEO,
    getSEOByUrl,
    updateSEO,
    deleteSEO
};