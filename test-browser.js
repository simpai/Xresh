const { postTweetWithImage } = require('./browser-client');
const { generateMathImage } = require('./image-generator');
const path = require('path');

async function test() {
    try {
        console.log('Generating test image...');
        const imagePath = path.join(__dirname, 'test_browser.png');
        await generateMathImage('BROWSER TEST', imagePath, 'math');

        console.log('Testing Browser Automation...');
        await postTweetWithImage('Test tweet from Puppeteer! 🤖', imagePath);

        console.log('✅ Browser Test passed!');
    } catch (error) {
        console.error('❌ Browser Test failed:', error);
    }
}

test();
