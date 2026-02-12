const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = client.readWrite;

/**
 * Uploads an image and posts a tweet with it.
 */
async function postTweetWithImage(text, filePath) {
    try {
        console.log('Uploading media...');
        const mediaId = await client.v1.uploadMedia(filePath);
        console.log('Media uploaded:', mediaId);

        console.log('Posting tweet...');
        await rwClient.v2.tweet({
            text: text,
            media: { media_ids: [mediaId] }
        });
        console.log('Tweet posted successfully!');
    } catch (error) {
        console.error('Error in postTweetWithImage:', error);
        throw error;
    }
}

module.exports = { postTweetWithImage };
