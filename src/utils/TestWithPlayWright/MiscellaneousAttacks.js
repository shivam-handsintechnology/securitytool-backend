const { chromium } = require('playwright');
const path = require('path');
const { scrapWebsite, fillInputFields, takeScreenshot, withRetry } = require('..');
const { possibleLoginTexts } = require("../../data/json/ApplicationTestingData.json")
// Auto-complete is enabled for sensitive fields
async function testAutoComplete(url, SendEvent, res) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await withRetry(async () => {
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
  });

  await withRetry(async () => {
    await page.waitForLoadState('networkidle', { timeout: 60000 });
  });
  return new Promise(async (resolve, reject) => {
    try {

      // Locate form submission elements
      const forms = await page.$$('form');
      const sensitiveFields = [];

      // Submit a test form
      if (forms.length > 0) {
        for (const form of forms) {
          // Get all input fields within each form
          const inputFields = await form.$$eval('input', inputs => inputs.map(input => input.outerHTML));

          if (inputFields.length > 0) {



            for (const field of inputFields) {
              // Check if the field is a sensitive field (e.g., password, credit card)
              const isSensitiveField = /type="(password)"|name="(password|creditcard)"/i.test(field);

              if (isSensitiveField) {
                // Check if auto-complete is enabled for the sensitive field
                const autoCompleteEnabled = !/autocomplete="off"/i.test(field);

                if (autoCompleteEnabled) {
                  sensitiveFields.push(field);
                  SendEvent({ error: false, message: `Auto-complete is enabled for the sensitive field ${field} on the Page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                }
              }
            }


          }

        }
      }

      resolve({
        sensitiveFields: sensitiveFields.length > 0 ? sensitiveFields : [],
        pageName: url,
      })
    } catch (error) {
      reject(error);
    } finally {
      await context.close();
      await browser.close();
    }

  });
}
// Captcha is not implemented for publicly available forms
const testCaptchElements = async (url, SendEvent, res) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/', // Specify the directory to save the video recordings
      size: { width: 1280, height: 720 } // Set the desired video resolution
    }
  });
  const page = await context.newPage();

  await withRetry(async () => {
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
  });

  await withRetry(async () => {
    await page.waitForLoadState('networkidle', { timeout: 60000 });
  });
  return new Promise(async (resolve, reject) => {
    try {
      await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle', { timeout: 60000 });
      let cathctexts = [
        "captcha",
        "recaptcha",
        "google captcha",
        "h-captcha",
        "hcaptcha",

      ]
      let capycharesponse = null
      for (const cathctext of cathctexts) {
        const captchaElements = await page.$$(`text=${cathctext}`);
        if (captchaElements.length > 0) {
          capycharesponse = {
            error: false, message: `CAPTCHA is implemented for publicly available forms on page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page)
          }
          SendEvent({ error: false, message: `CAPTCHA is implemented for publicly available forms on page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        }
      }
      resolve(capycharesponse)
    } catch (error) {
      reject(error);
    } finally {
      await context.close();
      await browser.close();
    }
  });
}
// The page contains iframes which may be indicative of clickjacking vulnerability
const testclickjacking = async (url, SendEvent, res) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await withRetry(async () => {
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
  });

  await withRetry(async () => {
    await page.waitForLoadState('networkidle', { timeout: 60000 });
  });
  return new Promise(async (resolve, reject) => {
    try {
      const iframes = await page.$$('iframe');
      if (iframes.length > 0) {
        iframes.forEach(async iframe => SendEvent({ error: false, message: `The page ${url} contains iframes which may be indicative of clickjacking vulnerability.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res));
      }
      resolve({
        iframes: iframes.length > 0 ? iframes : [],
        pageName: url,
      })
    } catch (error) {
      reject(error);
    } finally {
      await context.close();
      await browser.close();
    }
  });
}
//Application accepts special characters as user inputs
const TestSpecialCharaters = async (url, SendEvent, res, fullurl) => {
  const browser = await chromium.launch();

  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/', // Specify the directory to save the video recordings
      size: { width: 1280, height: 720 } // Set the desired video resolution
    }
  });
  const page = await context.newPage();
  await withRetry(async () => {
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
  });

  await withRetry(async () => {
    await page.waitForLoadState('networkidle', { timeout: 60000 });
  });
  const username = "Test", password = "Test", email = "Test@example.com"
  let data = "Scan Login Page for Black Password and Username";

  return new Promise(async (resolve, reject) => {
    try {

      if (!url) {
        throw new Error('Url not provided. Please provide a valid URL');
      }
      for (const loginText of possibleLoginTexts) {
        const loginTextElement = await page.$(`text=${loginText}`);
        if (loginTextElement) {

          await loginTextElement.click();
          await page.waitForLoadState('networkidle', { timeout: 90000 });
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
          message: "Application accepts special characters as user inputs", time: Date.now(), video: fullurl + fileName + ext
        }, res);
      } else if (!fileName && !ext) {
        SendEvent({ message: "No Video Found", time: Date.now(), video: null }, res);
      }
      resolve(data);
    } catch (error) {
      reject(error);
    } finally {
      await context.close();
      await browser.close();
    }
  });

}

let MiscellaneousAttacks = async (url, res, SendEvent, fullurl) => {
  try {

    const visitedLinks = await scrapWebsite(url, res, SendEvent).then((data) => {
      return data;
    }).catch((error) => {
      console.log("error", error)
      if (error.name == "TimeoutError") {
        SendEvent({ error: true, message: `Timeout Error Occurred`, time: Date.now(), screenshot: null }, res);
      }
    });
    let links = Array.from(visitedLinks);
    console.log("links", links)
    if (links.length > 0) {
      for (const link of links) {


        await TestSpecialCharaters(link, SendEvent, res, fullurl).then((data) => {
          return data;
        }).catch((error) => {
          console.log("error", error)
          if (error.name == "TimeoutError") {
            SendEvent({ error: true, message: `Timeout Error Occurred`, time: Date.now(), screenshot: null }, res);
          }
        })
        await testCaptchElements(link, SendEvent, res, fullurl).then((data) => {
          return data;
        }).catch((error) => {
          console.log("error", error)
          if (error.name == "TimeoutError") {
            SendEvent({ error: true, message: `Timeout Error Occurred`, time: Date.now(), screenshot: null }, res);
          }
        })
        await testAutoComplete(link, SendEvent, res, fullurl).then((data) => {
          return data;
        }).catch((error) => {
          console.log("error", error)
          if (error.name == "TimeoutError") {
            SendEvent({ error: true, message: `Timeout Error Occurred`, time: Date.now(), screenshot: null }, res);
          }
        })
        await testclickjacking(link, SendEvent, res, fullurl).then((data) => {
          return data;
        }).catch((error) => {
          console.log("error", error)
          if (error.name == "TimeoutError") {
            SendEvent({ error: true, message: `Timeout Error Occurred`, time: Date.now(), screenshot: null }, res);
          }
        })


      }
    }
  } catch (error) {
    console.log("error", error)

  }
}
module.exports = { MiscellaneousAttacks };

