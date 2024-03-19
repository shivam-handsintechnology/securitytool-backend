
const { WhitelisttDirectryListingWords } = require("../models/WhitelistWords.model");
module.exports = {
    // Add new word to white list
    addWord: async (req, res) => {
        try {
            const { word } = req.body;
            if (!word) {
                return res.status(400).json({ message: "Word is required" });
            }
            const exist = await WhitelisttDirectryListingWords.findOne({})
            if (!exist) {
                await WhitelisttDirectryListingWords.create({ word: [word] });
                return res.status(201).json({ message: "Word added to white list" });
            }
            if (exist) {
                const isExist = await WhitelisttDirectryListingWords.findOne({ _id: exist._id }, { word: { $elemMatch: { $eq: word } } });
                if (isExist) {
                    return res.status(400).json({ message: "Word already exist" });
                } else if (!isExist) {
                    await WhitelisttDirectryListingWords.findByIdAndUpdate(exist._id, { $push: { word: word } });
                    return res.status(201).json({ message: "Word added to white list" });
                }
            }
            await WhitelisttDirectryListingWords.findOneAndUpdate({}, { $push: { word: word } });
            return res.status(201).json({ message: "Word added to white list" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    addMUltipleWords: async (req, res) => {
        try {
            const { words } = req.files;
            let sampleFile;
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({ message: 'No files were uploaded.' });
            }

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = req.files.wordsFile;
            console.log("sampleFile", sampleFile)
            return false;
            if (!words) {
                return res.status(400).json({ message: "Words are required" });
            }
            const exist = await WhitelisttDirectryListingWords.findOne({})
            if (!exist) {
                await WhitelisttDirectryListingWords.insertMany([...data]);
                return res.status(201).json({ message: "Words added to white list" });
            }
            if (exist) {
                const isExist = await WhitelisttDirectryListingWords.findOne({ _id: exist._id }, { word: { $elemMatch: { $eq: words } } });
                if (isExist) {
                    return res.status(400).json({ message: "Words already exist" });
                } else if (!isExist) {
                    await WhitelisttDirectryListingWords.findByIdAndUpdate(exist._id, { $push: { word: words } });
                    return res.status(201).json({ message: "Words added to white list" });
                }
            }
            await WhitelisttDirectryListingWords.findOneAndUpdate({}, { $push: { word: words } });
            return res.status(201).json({ message: "Words added to white list" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Get all words from white list
    getAllWords: async (req, res) => {
        try {

            const words = await WhitelisttDirectryListingWords.aggregate([{ $project: { _id: 0, word: 1 } }]);
            return res.status(200).json({ words });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    // Delete word from white list
    deleteWord: async (req, res) => {
        try {
            const { id } = req.query;
            await WhitelisttDirectryListingWords.findByIdAndUpdate(id, { $pull: { word: word } });
            return res.status(200).json({ message: "Word deleted from white list" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

};
