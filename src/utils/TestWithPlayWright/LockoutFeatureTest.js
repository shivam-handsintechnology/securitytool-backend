const { chromium } = require('playwright');
const path = require('path');
const { scrapWebsite, fillInputFields, withRetry } = require('..');
const fs = require("fs");
const { possibleauthapiTexts } = require("../../data/json/ApplicationTestingData.json")
let requestabort = async (page) => {
  await page.route('**', (route) => {
    const requestUrl = route.request().url();
    console.log(requestUrl);
    if (requestUrl.includes("api/client/protection")) {
      return route.abort();
    } else {
      return route.continue();
    }
  });
}
const TestLockoutFeatureTest = async (url, SendEvent, res, fullurl, attempt, duration) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: 'videos/',
      size: { width: 1280, height: 720 }
    }
  });
  const page = await context.newPage();
  requestabort(page)
  await withRetry(async () => {
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
  });

  await withRetry(async () => {
    await page.waitForLoadState('networkidle', { timeout: 60000 });
  });

  const username = "dsdasdsad";
  const password = "dsadsadsa";
  const email = "sadsadasd@example.com";
  let message = "Test Lockout Feature";
  let status = null;
  let data = { message: message, time: Date.now() };

  return new Promise(async (resolve, reject) => {
    try {
      if (!url) {
        throw new Error('Url not provided. Please provide a valid URL');
      }

      await page.waitForLoadState('networkidle', { timeout: 90000 });
      page.on("response", async (response) => {
        if (response.url().includes("protection")) {
          return;
        }
        console.log("method", response.request().method())
        if (response.request().method() == "POST") {

          status = await response.status();
        }
      });



      // Perform the lockout simulation based on attempt and duration
      let lockoutAttemptsPromise = async () => {
        for (let i = 0; i < attempt; i++) {
          await fillInputFields(page, username, password, email);

        }
      }
      await Promise.all([lockoutAttemptsPromise(), page.waitForTimeout(1000)]);
      console.log("status", status)
      await page.waitForTimeout(1000); // Wait for the lockout duration
      const videoPath = await page.video().path();
      const absolutePath = path.resolve(videoPath);

      console.log('Video recording saved:', absolutePath);
      const ext = path.extname(absolutePath);
      const fileName = path.basename(absolutePath, ext);
      console.log('File Name:', fileName);

      const { size } = fs.statSync(path.join(process.cwd(), "videos", fileName + ext));
      console.log("size", size)

      if (fileName && ext) {
        SendEvent({
          message: `Lockout Feature Is ${status && status === 429 ? 'Enable' : 'Disable'}`, time: Date.now(), video: fullurl + fileName + ext
        }, res);
      } else if (!fileName && !ext) {
        SendEvent({ message: "No Video Found", time: Date.now(), video: null }, res);
      }

      data = { message: message, time: Date.now(), status: status };
      resolve(data);
    } catch (error) {
      reject(error);
    } finally {
      await context.close();
      await browser.close();
    }
  });
};
let TestLockoutFeature = async (url, res, SendEvent, fullurl, attempt, duration) => {
  try {

    const visitedLinks = await scrapWebsite(url, res, SendEvent)
    let links = Array.from(visitedLinks);

    if (links.length > 0) {
      for (const link of links) {
        let replacesometextRegx = new RegExp("(_)|(-_)|(-)|(_-)( )", "g")
        let lowercaselink = link.replace(replacesometextRegx, "")
        let isAuth = possibleauthapiTexts.some((text) => lowercaselink.includes(text))
        if (isAuth) {
          await TestLockoutFeatureTest(link, SendEvent, res, fullurl, attempt, duration)
        }
      }
    }
  } catch (error) {
    console.log("error", error)

  }
}

module.exports = { TestLockoutFeature };

