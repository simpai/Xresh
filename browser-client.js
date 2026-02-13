const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

async function postTweetWithImage(text, imagePath) {
    const cookiesPath = path.resolve(__dirname, 'cookies.json');

    if (!fs.existsSync(cookiesPath)) {
        throw new Error('cookies.json not found! Please export your Twitter cookies.');
    }

    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: true, // Run in background
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Load cookies
    const cookiesString = fs.readFileSync(cookiesPath, 'utf8');
    const cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies);

    try {
        console.log('Navigating to Twitter...');
        await page.goto('https://x.com/compose/tweet', { waitUntil: 'networkidle2' });

        // Check if logged in verify by checking for the post button or avatar
        try {
            await page.waitForSelector('[data-testid="tweetButton"]', { timeout: 10000 });
        } catch (e) {
            console.error('Login failed or cookie expired. Please update cookies.json');
            await browser.close();
            throw e;
        }

        console.log('Uploading image...');
        const inputUploadHandle = await page.$('input[type=file]');
        await inputUploadHandle.uploadFile(imagePath);

        console.log('Waiting for image upload...');
        // Wait for image to appear in preview
        await page.waitForSelector('[data-testid="attachments"] img', { timeout: 20000 });

        console.log('Typing text...');
        // Click text area and type
        await page.click('[data-testid="tweetTextarea_0"]');
        await page.keyboard.type(text);

        console.log('Clicking Post...');
        await page.click('[data-testid="tweetButton"]');

        // Wait for post to complete (toast message or url change)
        await page.waitForFunction(() => !document.querySelector('[data-testid="tweetButton"]'));

        console.log('Tweet posted successfully via Browser!');

        // Optional: Wait a bit before closing
        await new Promise(r => setTimeout(r, 3000));

    } catch (error) {
        console.error('Browser automation failed:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

module.exports = { postTweetWithImage };
