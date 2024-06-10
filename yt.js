// run youtube video with playwright
const { chromium } = require('playwright');
const toMilliseconds = (hrs, min, sec) => (hrs * 60 * 60 + min * 60 + sec) * 1000;

async function run() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Specify the directory to save the video recordings
            size: { width: 1280, height: 720 } // Set the desired video resolution
        }
    });
    const page = await context.newPage();
    try {
        let time = toMilliseconds(1, 5, 45); // Convert the video duration to milliseconds
        await page.goto('https://www.youtube.com/watch?v=bbsNYKDypQA', { timeout: time, waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle', { timeout: time });
        await page.waitForSelector('button.ytp-large-play-button ytp-button');
        await page.click('button.ytp-large-play-button ytp-button');
        await page.waitForTimeout(time); // Wait for 10 seconds
    } catch (error) {
        await page.screenshot({ path: `error.png` });
        await browser.close();
    } finally {
        await browser.close();
    }

}

for (let i = 0; i < 10; i++) {
    run();
}