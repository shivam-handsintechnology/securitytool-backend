const { chromium } = require('playwright');
const path = require('path');
const { fillInputFields, takeScreenshot } = require('..');
const { possibleLoginTexts } = require("../../data/json/ApplicationTestingData.json")

const DefaultUserNamePasswordTest = async (websiteUrl, username, password, email, res, SendEvent, fullurl) => {
    let url = websiteUrl;
    let data = "Scan Login Page for Black Password and Username";
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Specify the directory to save the video recordings
            size: { width: 1280, height: 720 } // Set the desired video resolution
        }
    });
    const page = await context.newPage();
    return new Promise(async (resolve, reject) => {
        try {
            if (!url) {
                throw new Error('Url not provided. Please provide a valid URL');
            }



            await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
            await page.waitForLoadState('networkidle', { timeout: 60000 });




            for (const loginText of possibleLoginTexts) {
                const loginTextElement = await page.$(`text=${loginText}`);
                if (loginTextElement) {

                    await loginTextElement.click();
                    await page.waitForLoadState('networkidle', { timeout: 90000 });
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await fillInputFields(page, username, password, email);
                    // Listen for network requests
                    const requests = [];
                    page.on('request', request => {
                        // Check if it's an XHR or Fetch request
                        if (request.resourceType() === 'xhr' || (request.resourceType() === 'fetch' && request.method() === 'POST')) {
                            requests.push(request);
                        }
                    });

                    // Wait for all requests to finish
                    await Promise.all(requests.map(request => request.response()));

                } else if (!loginText) {
                    SendEvent({ error: false, message: `No login text found on the home page.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                    data = "No login text found on the home page.";

                }
            }
            const videoPath = await page.video().path();
            const absolutePath = path.resolve(videoPath)

            console.log('Video recording saved:', absolutePath);
            // get extension of the video and that extension file name
            const ext = path.extname(absolutePath);
            const fileName = path.basename(absolutePath, ext);
            console.log('File Name:', fileName);
            // Send the base64-encoded video data to the client
            if (fileName && ext) {
                SendEvent({
                    message: "Video stream", time: Date.now(), video: fullurl + fileName + ext
                }, res);
            } else if (!fileName && !ext) {
                SendEvent({ message: "No Video Found", time: Date.now(), video: null }, res);
            }


            // Delete the temporary video file
            // await fs.unlink(videoPath);
            resolve(data);
        } catch (error) {
            reject(error);
        } finally {
            await browser.close();
        }
    });

}

module.exports = { DefaultUserNamePasswordTest };

