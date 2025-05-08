import express from 'express';
import { config } from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

config();

const app = express();
const port = 3000;

app.use(cors());

// Cache object keyed by stock symbol
const cache = {};
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
const ALLOWED_STOCKS =
[
"AAPL", "NVDA",
"INTC", "NET",
"TTWO", "BYD",
"GOOGL", "TSLA",
"AYRO", "BTC"
]; //Get more stocks

// Function to fetch and cache data for a specific stock
async function fetchData(stockName) {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName}&apikey=${process.env.API_KEY}`
    );
    const data = await response.json();

    // Store in cache
    cache[stockName] = {
      data,
      timestamp: Date.now(),
    };

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Middleware to handle caching per stock
async function stockEndpoint(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`Client IP: ${ip}`);

  const stockName = req.params.name.toUpperCase(); // Normalize the name

  if (!ALLOWED_STOCKS.includes(stockName)) {
    res.status(403).json({error: 'Stock is not allowed. Your IP has been tracked.'});
  }

  const now = Date.now();

  const cachedEntry = cache[stockName];

  if (cachedEntry && (now - cachedEntry.timestamp) < CACHE_DURATION) {
    // Return cached data
    return res.json(cachedEntry.data);
  }

  // Fetch and cache new data
  try {
    const freshData = await fetchData(stockName);
    res.json(freshData);
  } catch {
    res.status(500).json({ error: 'Failed to fetch data. Your IP has been tracked.' });
  }
}

async function allowedStocksEndpoint(req, res) {
  res.status(200);
  return res.json(ALLOWED_STOCKS);
}

// Endpoint to get stock data
app.get('/stocks/:name', stockEndpoint);
app.get('/allowedStocks', allowedStocksEndpoint);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
