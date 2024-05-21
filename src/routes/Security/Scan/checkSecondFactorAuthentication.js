const { chromium } = require('playwright');
const cheerio = require('cheerio');

const authenticatedRoutes = [
    '/dashboard',
    '/profile',
    '/settings',
    '/account',
    '/orders',
    '/cart',
    '/checkout',
    '/billing',
    '/subscriptions',
    '/messages',
    '/notifications',
    '/admin',
    '/analytics',
    '/reports',
    '/projects',
    '/tasks',
    '/team',
    '/documents',
    '/files',
    '/uploads',
    '/downloads',
    '/bookmarks',
    '/favorites',
    '/galleries',
    '/playlists',
    '/campaigns',
    '/leads',
    '/contacts',
    '/calendar',
    '/appointments',
    '/schedule',
    '/timesheet',
    '/payroll',
    '/invoices',
    '/expenses',
    '/budgets',
    '/finance',
    '/tax',
    '/compliance',
    '/support',
    '/tickets',
    '/knowledgebase',
    '/forums',
    '/blogs',
    '/articles',
    '/comments',
    '/reviews',
    '/ratings',
    '/votes',
    '/polls',
    '/surveys',
    '/feedback',
    '/suggestions',
    '/ideas',
    '/roadmap',
    '/changelog',
    '/updates',
    '/releases',
    '/versions',
    '/contributors',
    '/members',
    '/followers',
    '/ress',
    '/friends',
    '/groups',
    '/communities',
    '/channels',
    '/streams',
    '/broadcasts',
    '/livestreams',
    '/webinars',
    '/workshops',
    '/courses',
    '/lessons',
    '/modules',
    '/quizzes',
    '/exams',
    '/certifications',
    '/badges',
    '/achievements',
    '/leaderboards',
    '/scorecards',
    '/metrics',
    '/insights',
    '/reports',
    '/audits',
    '/logs',
    '/monitoring',
    '/alerts',
    '/incidents',
    '/outages',
    '/maintenance',
    '/backups',
    '/restores',
    '/migrations',
    '/upgrades',
    '/installations',
    '/deployments',
    '/integrations',
    '/apis',
    '/webhooks',
    '/plugins',
    '/extensions',
    '/addons',
    '/customizations',
    '/preferences',
    '/configurations',
    '/settings',
    '/security',
    '/permissions',
    '/roles',
    '/access',
    '/authorization',
    '/authentication',
    '/sessions',
    '/passwords',
    '/reset',
    '/verify',
    '/activate',
    '/deactivate',
    '/suspend',
    '/terminate',
    '/delete',
    '/archive',
    '/restore',
    '/import',
    '/export',
    '/backup',
    '/migrate',
    '/transfer',
    '/convert',
    '/transform',
    '/translate',
    '/localize',
    '/internationalize'
];
const hints404 = [
    "Not Found",
    "404 Not Found",
    "Page Not Found",
    "404 Error",
    "The page you requested could not be found",
    "We couldn't find the page you were looking for",
    "The requested URL was not found on this server",
    "Oops! 404",
    "Error 404",
    "The page you are looking for might have been removed",
    "The URL you requested does not exist",
    "The page you're trying to access cannot be found",
    "Sorry, the page you're looking for is not found",
    "Whoops, looks like this page is missing",
    "This page doesn't exist or has been removed",
    "The content you're seeking could not be found",
    "Apologies, but the page you requested was not found",
    "We're unable to locate the page you're searching for",
    "Unfortunately, the requested page is nowhere to be found",
    "The page you're looking for seems to be lost in cyberspace",
    "This URL doesn't lead anywhere, it's a dead end"
];
let lowerCasehitn404 = hints404.map((item) => item.toLowerCase())
const directoryListingPatterns = [
    '<title>Index of',
    'Parent Directory',
    '<h1>Index of',
];
async function takeScreenshot(page) {
    const screenshot = await page.screenshot({ fullPage: true });
    return Buffer.from(screenshot).toString('base64');
}
function extractVisibleText(html) {
    const $ = cheerio.load(html);
    return $('body').text();
}
const possibleLoginTexts = [
    'Login', 'Sign-up', 'Request OTP', 'Get OTP', 'Register', 'Create account', 'Sign in',
    'Sign in with', 'Sign in using', 'Sign in to', 'Sign in with your', 'Sign in with your account',
    'Sign in with your email', 'Sign in with your phone', 'Sign in with your username',
    'Sign in with your password', 'Sign in with your social account', 'Sign in with your social media account',
    'Sign in with your Google account', 'Sign in with your Facebook account', 'Sign in with your Twitter account',
    'Sign in with your LinkedIn account', 'Sign in with your GitHub account', 'Sign in with your Microsoft account',
    'Sign in with your Apple account', 'Sign in with your Amazon account', 'Sign in with your Instagram account',
    'Sign in with your Pinterest account', 'Sign in with your Snapchat account', 'Sign in with your TikTok account',
    'Sign in with your Reddit account', 'Sign in with your Tumblr account', 'Sign in with your Yahoo account',
    'Sign in with your AOL account', 'Sign in with your Outlook account', 'Sign in with your ProtonMail account',
    'Sign in with your Yandex account', 'Sign in with your Mail.ru account', 'Sign in with your Zoho account',
    'Sign in with your Tutanota account', 'Sign in with your GMX account', 'Sign in with your iCloud account',
    'Sign in with your FastMail account', 'Sign in with your Hushmail account', 'Sign in with your Runbox account',
    'Sign in with your Disroot account', 'Sign in with your Riseup account', 'Sign in with your StartMail account',
    'Sign in with your CounterMail account', 'Sign in with your SCRYPTmail account', 'Sign in with your CTemplar account',
    'Sign in with your Mailfence account', 'Sign in with your LuxSci account', 'Sign in with your Posteo account'
]
const TwoStepVerificationCodes = [
    'otp',
    'verification',
    'two-factor',
    'captcha',
    'recaptcha',
    're-captcha',
    're captcha',
    'recaptcha v3',
    're-captcha v3',
    're captcha v3',
    'recaptcha v2',
    're-captcha v2',
    're captcha v2',
    'two step',
    'two step verification',
    'two factor',
    'two factor authentication',
    '2fa',
    'mfa',
    'multi-factor authentication',
    'multi factor authentication',
    'authentication code',
    'authenticator',
    'authenticator app',
    'security code',
    'sms code',
    'email code',
    'auth code',
    'verification code',
    'passwordless login',
    'one-time password',
    'time-based one-time password',
    'topt'
];
async function CheckLoginForm(url, res, SerEnventData) {
    let data = "Scan Completed Two Factor Authentication or OTP Not Found";
    return new Promise(async (resolve, reject) => {
        try {
            if (!url) {
                throw new Error('Url not provided. Please provide a valid URL');
            }

            const browser = await chromium.launch();
            const context = await browser.newContext();
            const page = await context.newPage();

            await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
            await page.waitForLoadState('networkidle', { timeout: 60000 });




            for (const loginText of possibleLoginTexts) {
                const loginTextElement = await page.$(`text=${loginText}`);
                if (loginTextElement) {
                    await loginTextElement.click();
                    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const pageContent = await page.evaluate(() => {
                        return document.body.innerText;
                    });

                    const pageContentLowerCase = pageContent.toLowerCase();

                    const otpOrVerificationMentioned = TwoStepVerificationCodes.some(keyword => pageContentLowerCase.includes(keyword));

                    if (otpOrVerificationMentioned) {
                        console.log('The website uses two-factor authentication or OTP.');
                        SerEnventData({ error: false, message: `The website uses two-factor authentication or OTP.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        data = "The website uses two-factor authentication or OTP.";
                        break;
                    }
                } else if (!loginText) {
                    SerEnventData({ error: false, message: `No login text found on the home page.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                    data = "No login text found on the home page.";

                }
            }

            if (data === "Scan Completed Two Factor Authentication or OTP Not Found") {
                SerEnventData({ error: false, message: `The website does not use two-factor authentication or OTP.`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                throw new Error('The website does not use two-factor authentication or OTP.');
            }

            resolve(data);
        } catch (error) {
            reject(error);
        } finally {
            await browser.close();
        }
    });
}
const scanSecondFactorAuthBypassed = async (url, res, SerEnventData) => {
    try {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        let navigationSuccessful = false;
        let attempts = 0;
        while (!navigationSuccessful && attempts < 3) {
            try {
                await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
                const finalUrl = new URL(page.url());
                console.log("initial url", url, "final url", finalUrl);

                // Remove trailing slash from pathname if present
                if (finalUrl.pathname.endsWith('/')) {
                    finalUrl.pathname = finalUrl.pathname.slice(0, -1);
                }

                const currentUrl = new URL(url);
                console.log("initial url", url, "final url", finalUrl);

                // Remove trailing slash from pathname if present
                if (currentUrl.pathname.endsWith('/')) {
                    finalUrl.pathname = finalUrl.pathname.slice(0, -1);
                }



                if (finalUrl.pathname !== currentUrl.pathname) {
                    SerEnventData({ error: false, message: `Second factor authentication could be bypassed: No  (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                    navigationSuccessful = true;
                } else if (finalUrl.pathname == currentUrl.pathname) {

                    let pageContent = await page.content();
                    pageContent = extractVisibleText(pageContent);
                    console.log("Visible text:", pageContent);
                    const found404 = hints404.some(hint => pageContent.includes(hint));
                    const lowerCasefound404 = lowerCasehitn404.some(hint => pageContent.includes(hint));
                    const pageTitle = await page.title();
                    console.log("Page title", pageTitle);

                    if (found404 || lowerCasefound404 || pageTitle.includes("404") || pageTitle.includes("Not Found")) {
                        console.log(`Page Not Found: ${url}`);
                        // SerEnventData({ message: `Page Not Found: ${url}`, time: Date.now() , screenshot: await takeScreenshot(page)}, res);
                    } else {
                        const isDirectoryListing = directoryListingPatterns.some(pattern => pageContent.includes(pattern));
                        if (isDirectoryListing) {
                            SerEnventData({ error: true, message: `directory listing is enable on this page ${currentUrl.pathname} Please disable It`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        } else {
                            SerEnventData({ error: true, message: `Second factor authentication could be bypassed:Yes (${url})`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
                        }
                    }
                    attempts++;
                    navigationSuccessful = true;
                }
            } catch (error) {
                console.error(`Error occurred while testing page "${url}":`, error);
                attempts++;
            }
        }
        if (!navigationSuccessful) {
            SerEnventData({ error: true, message: `Second factor authentication could be bypassed: No`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        }
        await page.close();
        await browser.close();
        return { success: true, message: `Scan Completed` };
    } catch (error) {
        console.log('Error:', error);
        SerEnventData({ message: `Second factor authentication could be bypassed Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) }, res);
        return { success: false, message: `Second factor authentication could be bypassed Failed: Error occurred while testing page ${url}`, time: Date.now(), screenshot: await takeScreenshot(page) };
    }
};




const SecondFactorAuthBypassed = async (websiteUrl, res, SerEnventData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isLoginForm = await CheckLoginForm(websiteUrl, res, SerEnventData).then(data => data)
            if (isLoginForm) {
                SerEnventData({ error: false, message: isLoginForm, time: Date.now() }, res);
                for (const link of authenticatedRoutes) {
                    const response = await scanSecondFactorAuthBypassed(websiteUrl + link, res, SerEnventData);
                    console.log(response)
                    // You can handle the response here if needed before moving to the next iteration
                }
            } else {
                SerEnventData({ error: false, message: isLoginForm, time: Date.now() }, res);

            }

            resolve("Completed");
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { SecondFactorAuthBypassed };