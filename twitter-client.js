const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config();

const API_KEY = process.env.TWITTERAPI_IO_KEY;
const BASE_URL = 'https://twitterapi.io/api/twitter';

/**
 * Uploads an image and posts a tweet with it using TwitterAPI.io
 */
async function postTweetWithImage(text, filePath) {
    if (!API_KEY) {
        throw new Error('TWITTERAPI_IO_KEY is missing in .env');
    }

    try {
        console.log('Uploading media to TwitterAPI.io...');

        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));
        form.append('apiKey', API_KEY);

        const uploadResponse = await axios.post('https://twitterapi.io/api/upload/image', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        // Check if upload was successful. TwitterAPI.io usually returns media_id directly or in a specific structure.
        // Assuming response structure based on typical third-party wrappers. 
        // Adjusting based on common practices if docs aren't fully visible, but usually it's `media_id` or similar.
        // Let's log the response to be sure during first run if needed, but for now we follow standard flow.
        const mediaId = uploadResponse.data.media_id || uploadResponse.data.media_id_string || uploadResponse.data.id;

        if (!mediaId) {
            console.error('Upload response:', uploadResponse.data);
            throw new Error('Failed to get media_id from TwitterAPI.io upload');
        }

        console.log('Media uploaded:', mediaId);

        console.log('Posting tweet via TwitterAPI.io...');
        const tweetResponse = await axios.post(`${BASE_URL}/tweet`, {
            apiKey: API_KEY,
            text: text,
            mediaIds: [mediaId]
        });

        console.log('Tweet posted successfully!', tweetResponse.data);
    } catch (error) {
        console.error('Error in postTweetWithImage (TwitterAPI.io):', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = { postTweetWithImage };
