const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { takeScreenshot } = require('./checkSecondFactorAuthentication');
const possibleLoginTexts = require("../../../data/json/ApplicationTestingData.json").possibleLoginTexts
async function fillInputFields(page, username, password) {
    try {
        const email = Math.random().toString(36).substring(7) + '@example.com';
        const dateNow = new Date().toISOString().split('T')[0];

        const fillInputField = (selector, value) => {
            return page.$(selector).then(element => {
                if (element) {
                    if (!element.value) {
                        return element.fill(value);
                    }
                }
                return Promise.resolve();
            });
        };

        // Fill input fields based on type
        await fillInputField('input[type="text"]', username);
        await fillInputField('input[type="email"]', email);
        await fillInputField('input[type="number"]', Date.now());
        await fillInputField('input[type="date"]', dateNow);
        await fillInputField('input[type="password"]', password);
        await fillInputField('input[name="date"]', dateNow);


        const checkSubmit = await page.$('button[type="submit"]');
        if (checkSubmit) {
            await checkSubmit.click();
        } else {
            for (const loginText of possibleLoginTexts) {
                const loginTextElement = await page.$(`text=${loginText}`);
                if (loginTextElement) {
                    await loginTextElement.click();
                    break;
                }
            }
        }

    } catch (error) {
        console.error('Error occurred:', error);
    }
}



// Helper function to get the changed lines in text content
function getChangedLines(newText, oldText) {
    const newLines = newText.split('\n');
    const oldLines = oldText.split('\n');
    const changedLines = newLines.filter(line => !oldLines.includes(line));
    return changedLines;
}

const DefaultUserNamePasswordTest = async (websiteUrl, username, password, res, SerEnventData, fullurl) => {
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
                    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await fillInputFields(page, username, password,);
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
                    SerEnventData({ error: false, message: `No login text found on the home page.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
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
                SerEnventData({
                    message: "Video stream", time: Date.now(), video: fullurl + fileName + ext
                }, res);
            } else if (!fileName && !ext) {
                SerEnventData({ message: "No Video Found", time: Date.now(), video: null }, res);
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

