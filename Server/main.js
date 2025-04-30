import express from 'express';
import { config } from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';  // Import cors package

config();

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());  // Allow all CORS requests

// Cache object to hold the data and the timestamp of when it was fetched
let cachedData = null;
let lastFetched = null;
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

// Function to fetch and cache data
async function fetchData() {
  try {
    const response = await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=" + process.env.API_KEY);
    const data = await response.json();
    
    cachedData = data;
    lastFetched = Date.now();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Middleware to check cache validity
function checkCache(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`Client IP: ${ip}`);
  const now = Date.now();

  // If cached data exists and it's not older than 6 hours, return it
  if (cachedData && lastFetched && (now - lastFetched) < CACHE_DURATION) {
    return res.json(cachedData);
  }

  // If cache is expired or not present, fetch new data
  fetchData().then(() => {
    res.json(cachedData);
  }).catch((err) => {
    res.status(500).json({ error: 'Failed to fetch data' });
  });
}

// Endpoint to return cached data
app.get('/stocks/apple', checkCache);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
