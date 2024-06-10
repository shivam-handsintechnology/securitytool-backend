const { chromium } = require('playwright');
const { withRetry, shouldIgnoreURL, takeScreenshot, scrapWebsite, fillInputFields, containsQueryParams } = require('..');

// Define the base URL and endpoints to test
async function test(url, res, SendEvent, fullurl) {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/', // Specify the directory to save the video recordings
            size: { width: 1280, height: 720 } // Set the desired video resolution
        }
    });
    const page = await context.newPage();

    try {
        await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
        await page.waitForLoadState('networkidle', { timeout: 60000 });

        // Find the input tag with a search-related placeholder or name attribute
        const inputSelector = 'input';
        page.on("response", async (response) => {
            let reponseurl = response.url();

            if (containsQueryParams(reponseurl)) {
                const contentType = response.headers()["content-type"];
                if (contentType.includes("application/json")) {
                    const json = await response.json();


                } else if (contentType.includes("text/html")) {
                    const text = await response.text();
                    let isJsonString = false;
                    try {
                        JSON.parse(text);

                        isJsonString = true;
                    } catch (error) {
                        isJsonString = false;
                    }
                    if (isJsonString) {
                        const json = JSON.parse(text);

                    }
                }
            }
        });


        // Wait for the response and check if it includes the payload
        await page.waitForLoadState('networkidle', { timeout: 60000 });
        await page.waitForTimeout(2000); // Wait for the lockout duration

    } catch (error) {
        console.log(`Error navigating to: ${error}`);
        await context.close();
        await browser.close();
    } finally {
        await context.close();
        await browser.close();
    }
}
// Run the test testSqlWildcardDos(url);
async function PasswordChangeTest(url, res, SendEvent, fullurl) {
    await test(url, res, SendEvent, fullurl);
    let visited = await scrapWebsite(url, res, SendEvent)
    let links = Array.from(visited)
    let changePassword = links.filter(link => link.includes("change"))
    console.log(links)
    for (const link of changePassword) {
        await test(link, res, SendEvent, fullurl);
    }


}
module.exports = PasswordChangeTest