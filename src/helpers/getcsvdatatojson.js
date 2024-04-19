const csv = require('csv-parser');
const fs = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

exports.getcsvdatainjson = async (csvdata, columns) => {
    return new Promise(async (resolve, reject) => {
        const results = [];

        try {
            // Write binary data to a temporary file


            // Create read stream from the temporary file
            const readStream = fs.createReadStream(csvdata);

            // Pipe the read stream through csv-parser
            readStream
                .pipe(csv(columns ? { headers: columns } : {}))
                .on('headers', (headers) => {
                    if (columns && columns.length > 0) {
                        // Check if the columns provided are valid
                        const invalidColumns = columns.filter(col => !headers.includes(col));
                        if (invalidColumns.length > 0) {
                            reject(`Invalid columns: ${invalidColumns.join(', ')}`);
                        }
                    }
                })
                .on('data', (data) => {
                    results.push(data);
                })
                .on('end', async () => {
                 
                    // Remove the temporary file
                    await unlinkAsync(csvdata);
                    resolve(results);
                })
                .on('error', async (err) => {
                    console.error(err);
                    // Remove the temporary file
                    await unlinkAsync(csvdata);
                    reject(err);
                });
        } catch (err) {
            console.error(err);
            await unlinkAsync(csvdata);
            reject(err);
        }
    });
};
