
// const path = require('path')
// var filePath = path.join(__dirname, "src", "data", "csvdata", "directorywhitelistingwords.csv");
const csv = require('csv-parser');
const fs = require('fs');
exports.getcsvdatainjson = async (csvdata, columns) => {
    return new Promise((resolve, reject) => {

        const results = [];
        let isFirstLine = true; // Flag to track if it's the first line

        fs.createReadStream(csvdata)
            .pipe(csv({ headers: columns }))
            .on('data', (data) => {
                if (!isFirstLine) { // Skip adding data if it's the first line (header)
                    results.push(data);
                }
                isFirstLine = false; // Set the flag to false after processing the first line
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (err) => {
                reject(err);
            });
    });
};
