const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { takeScreenshot } = require('./checkSecondFactorAuthentication');
const possibleLoginTexts = require("../../../data/json/ApplicationTestingData.json").possibleLoginTexts
async function fillInputFields(page) {
  try {
    // Fill input fields based on type
    await fillInputField(page, 'input[type="text"]', '');
    await fillInputField(page, 'input[type="email"]', '');
    await fillInputField(page, 'input[type="number"]', '');
    await fillInputField(page, 'input[type="date"]', '');
    await fillInputField(page, 'input[type="password"]', '');
    await fillInputField(page, 'input[name="date"]', '');
    // Click the submit button
    await page.click('button[type="submit"]');
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

async function fillInputField(page, selector, value) {
  try {
    const input = await page.$(selector);
    if (input) {
      console.log(`Filling input field: ${selector}`)
      console.log(`Value: ${value}`);
      await input.fill(value);
    } else {
      console.log(`Skipping input field: ${selector} (not found)`);
    }
  } catch (error) {
    console.error(`Error filling input field ${selector}:`, error);
  }
}

// Helper function to get the changed lines in text content
function getChangedLines(newText, oldText) {
  const newLines = newText.split('\n');
  const oldLines = oldText.split('\n');
  const changedLines = newLines.filter(line => !oldLines.includes(line));
  return changedLines;
}
// Function to convert video to Base64
const videoToBase64 = (filePath) => {
  try {
    // Read the file
    const data = fs.readFileSync(filePath);
    const base64 = data.toString('base64');
    console.log(base64);
    return base64;
  } catch (error) {
    console.error('Error reading the video file:', error);
    return null;
  }
};
const BlackPasswordValidation = async (websiteUrl, res, SerEnventData, fullurl) => {
  let url = websiteUrl;
  let data = "Scan Login Page for Black Password and Username";
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: './videos', // Specify the directory to save the video recordings
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
          let initialTextContent = await page.evaluate(() => {
            return document.body.textContent.trim();
          });
          await loginTextElement.click();
          await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
          await new Promise(resolve => setTimeout(resolve, 1000));
          await fillInputFields(page);
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

          // Get the final text content after all requests
          const finalTextContent = await page.evaluate(() => {
            return document.body.textContent.trim();
          });

          // Extract and display changed text content
          const changedLines = getChangedLines(finalTextContent, initialTextContent);
          if (changedLines.length > 0) {
            console.log('Changed text content after all requests:');
            changedLines.forEach(line => console.log(line));
          } else {
            console.log('No changes detected in text content after all requests.');
          }
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
          message: "Video stream", time: Date.now(), video: fileName + ext
        }, res);
      } else if (!base64Video) {
        SerEnventData({ message: "No Video Found", time: Date.now(), video: "No Video Found" }, res);
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

module.exports = { BlackPasswordValidation };

