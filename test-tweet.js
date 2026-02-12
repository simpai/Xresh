const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function testTweet() {
    try {
        console.log('Testing text-only tweet (v2)...');
        const result = await client.v2.tweet('Test tweet from Xresh bot! 🤖');
        console.log('Success! Tweet ID:', result.data.id);
    } catch (e) {
        console.error('Failed:', e);
    }
}

testTweet();
