
// backend/newsProxy.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3001;

// Load NewsAPI key from .env file
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;

app.get('/api/news', async (req, res) => {
    // Get top business headlines in English
    const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${NEWSAPI_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data.articles); // Return only the articles array
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => {
    console.log(`News proxy running on port ${PORT}`);
});
