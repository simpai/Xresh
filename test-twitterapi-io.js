const { postTweetWithImage } = require('./twitter-client');
const { generateMathImage } = require('./image-generator');
const path = require('path');

async function test() {
    try {
        console.log('Generating test image...');
        // Create a simple test image
        const imagePath = path.join(__dirname, 'test_upload.png');
        await generateMathImage('TEST API', imagePath, 'math');

        console.log('Testing TwitterAPI.io upload...');
        await postTweetWithImage('Test tweet from TwitterAPI.io client! 🚀', imagePath);

        console.log('✅ Test passed!');
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

test();
