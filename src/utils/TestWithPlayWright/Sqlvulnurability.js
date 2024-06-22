const MYSQLCSVDATA = require('../../data/json/mysqldata.json');
async function scanSQLvulnerability(hostname, res, sendEvent,) {
    return new Promise(async (resolve, reject) => {

        const numRequests = MYSQLCSVDATA.length;
        const averageResponseTime = 0.5; // Assuming 0.5 seconds average response time per request in a batch
        const estimatedTime = numRequests * averageResponseTime;
        console.log(`Estimated time to complete: ${estimatedTime} seconds`);

        sendEvent({ numRequests: numRequests, estimatedTime, message: `Total Number of SQL Injection Tests: ${numRequests}`, time: Date.now() }, res);

        let count = 0;
        try {


            for (let batchIndex = 0; batchIndex < numRequests; batchIndex++) {
                try {
                    let data = MYSQLCSVDATA[batchIndex];
                    const response = await fetch(hostname, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    count++;
                    let percentageCompleted = ((count / numRequests) * 100).toFixed(2);
                    percentageCompleted = Math.round(percentageCompleted)
                    if (response.status === 200 || response.status === 201 || response.status === 202 || response.status === 204 || response.status === 304 || response.status === 404) {
                        sendEvent({ count, percentageCompleted, message: `Sql Injection Detected with this query: ${data.Query}`, time: Date.now() }, res);
                    } else if (response.status > 400 && response.status < 500 && response.status !== 404) {
                        // Handle client-side errors


                        sendEvent({ count, percentageCompleted, time: Date.now() }, res);
                    } else {
                        // Handle other statuses if needed
                        sendEvent({ count, percentageCompleted, time: Date.now() }, res);
                    }

                    // Calculate percentage completed


                } catch (error) {
                    count++;
                    let percentageCompleted = ((count / numRequests) * 100).toFixed(2);
                    percentageCompleted = Math.round(percentageCompleted)
                    sendEvent({ count, percentageCompleted, time: Date.now() }, res);
                    console.error("Error occurred during request:", error);

                }
            }
            count++;

            sendEvent({ count: numRequests, complete: true, percentageCompleted: 100, message: "Sql Injection Test Completed", time: Date.now() }, res);
            resolve({ message: "Sql Injection Test Completed" });
        } catch (error) {
            count++;

            sendEvent({ count, time: Date.now() }, res);
            reject(error);
        }
    });
}
module.exports = scanSQLvulnerability 