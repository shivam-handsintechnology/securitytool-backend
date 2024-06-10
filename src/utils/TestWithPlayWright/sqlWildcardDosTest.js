const { chromium } = require('playwright');
const { withRetry, shouldIgnoreURL, scrapWebsite, takeScreenshot, containsQueryParams } = require('..');

// Define the base URL and endpoints to test
let findArrayinJson = async function (json) {
    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            const element = json[key];
            if (Array.isArray(element)) {
                return element;
            } else if (typeof element === 'object') {
                findArrayinJson(element);
            }
        }
    }
    return null;
}
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
        const Searchinputs = await page.$$(inputSelector);

        page.on("response", async (response) => {
            let reponseurl = response.url();

            if (containsQueryParams(reponseurl)) {
                const contentType = response.headers()["content-type"];
                if (contentType.includes("application/json")) {
                    const json = await response.json();
                    let array = await findArrayinJson(json);
                    if (array && array.length > 0 && array.length <= 10) {
                        const responseTime = response.timing().responseEnd - response.timing().requestStart;
                        console.log(`Response time: ${responseTime} ms`);
                        SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are low", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                    } else if (array && array.length > 10) {
                        SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are high", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                    } else if (!array) {
                        SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are low", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                    }

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
                        let array = await findArrayinJson(json);
                        if (array && array.length > 0 && array.length <= 10) {
                            const responseTime = response.timing().responseEnd - response.timing().requestStart;
                            console.log(`Response time: ${responseTime} ms`);
                            SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are low", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                        } else if (array && array.length > 10) {
                            SendEvent({ error: true, message: "DDOS Sql Wildcards Attack chances are high", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                        } else if (!array) {
                            SendEvent({ error: false, message: "DDOS Sql Wildcards Attack chances are low", responseTime, url: url, time: Date.now(), isSql: true, jsondata: true, screenshot: await takeScreenshot(page) }, res);
                        }
                    }
                }
            }
        });

        let searchInput;
        for (const input of Searchinputs) {
            const allAttributes = await input.evaluate(node => {
                const attributes = {};
                for (let i = 0; i < node.attributes.length; i++) {
                    const attr = node.attributes[i];
                    attributes[attr.name] = attr.value;
                }
                return attributes;
            });

            for (const [attrName, attrValue] of Object.entries(allAttributes)) {
                if (attrValue.toLowerCase().includes('search')) {
                    searchInput = input;
                    break;
                }
            }

            if (searchInput) {
                break;
            }
        }

        if (!searchInput) {
            console.log('No search input found.');
            SendEvent({ error: false, message: `No search input found.  ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        }

        searchInput && SendEvent({ error: false, message: `search input found.  ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);

        // Click on the button where any attribute includes 'search'
        let searchButton;
        const inputs = await page.$$('input[type="submit"]');
        for (const button of inputs) {
            const attributes = await button.evaluate(node => node.getAttributeNames());
            if (attributes.some(attribute => attribute.toLowerCase().includes('search'))) {
                searchButton = button;
                break;
            }
        }

        if (!searchButton) {
            const buttons = await page.$$('button');
            for (const button of buttons) {
                const attributes = await button.evaluate(node => node.getAttributeNames());
                if (attributes.some(attribute => attribute.toLowerCase().includes('search'))) {
                    searchButton = button;
                    break;
                }
            }
        }

        // Ensure the search input is still attached to the DOM
        await page.waitForSelector(inputSelector, { visible: true, interactable: true, timeout: 120000 }); // Increase the timeout to 120 seconds

        let searchInputChanged = false;

        if (searchInput) {
            await searchInput.fill('payload', { timeout: 60000 }); // Increase the timeout to 60 seconds

            // Add event listener to monitor changes in the HTML text
            const observeHtmlChanges = async () => {
                const initialHtml = await page.content();

                const htmlChangeListener = async () => {
                    const currentHtml = await page.content();
                    if (currentHtml !== initialHtml) {
                        searchInputChanged = true;
                        page.off('domcontentloaded', htmlChangeListener); // Remove the listener
                        console.log('HTML text changed after search input modification');
                        // Perform any additional actions here if needed
                    }
                };

                page.on('domcontentloaded', htmlChangeListener);
            };

            // Call the observeHtmlChanges function before filling the search input
            await observeHtmlChanges();
            if (searchButton) {
                await searchButton.click();
                //  waitUntil: 'domcontentloaded'
                SendEvent({ error: false, message: `submit found and click.  ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                await page.waitForLoadState('networkidle', { timeout: 60000, waitUntil: 'domcontentloaded' });
            } else {
                console.log("submit but not found");
                // Enter keyword
                await page.keyboard.press('Enter');
            }

        }

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
async function testSqlWildcardDos(url, res, SendEvent, fullurl) {
    await test(url, res, SendEvent, fullurl);
    let visited = await scrapWebsite(url, res, SendEvent)


}
module.exports = testSqlWildcardDos