const axios = require('axios');

const nlpApiUrl = 'https://4369-34-106-16-16.ngrok-free.app/summarize';

async function processTextWithNLP(text) {
    try {
        const response = await axios.post(
            `${nlpApiUrl}?input_text="${text}"`,
        );

        if (response.status === 200) {
            const nlpOutput = response.data;
            return nlpOutput;
        } else {
            // Handle non-200 status code
            console.error(`NLP API returned status code ${response}`);
            return { error: 'Failed to connect to NLP API' };
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error connecting to NLP API:', error.message);
        return { error: 'Failed to connect to NLP API' };
    }
}

module.exports = { processTextWithNLP };
