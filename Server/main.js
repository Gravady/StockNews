import express from 'express';
import { config } from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

config();

const app = express();
const port = 3000;

app.use(cors());

// Allowed symbols
const ALLOWED_STOCKS = [
  "AAPL", "NVDA",
  "INTC", "NET",
  "TTWO", "BYD",
  "GOOGL", "TSLA",
  "AYRO", "BTC"
];

// In-memory cache
const cache = {};
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

// Fetch from AlphaVantage API
async function fetchData(stockName) {
  const apiKey = process.env.API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Handle API error messages
    if (data["Error Message"] || data["Note"]) {
      throw new Error("Invalid response from Alpha Vantage API");
    }

    // Store in cache
    cache[stockName] = {
      data,
      timestamp: Date.now()
    };

    return data;
  } catch (error) {
    console.error(`Alpha Vantage fetch failed for ${stockName}:`, error.message);
    throw error;
  }
}

// GET /stocks/:name endpoint
app.get('/stocks/:name', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(`Client IP: ${ip}`);

  const stockName = req.params.name.toUpperCase();

  if (!ALLOWED_STOCKS.includes(stockName)) {
    return res.status(403).json({ error: 'Stock is not allowed. Your IP has been tracked.' });
  }

  const now = Date.now();
  const cached = cache[stockName];

  // Serve cached data if still valid
  if (cached && (now - cached.timestamp < CACHE_DURATION)) {
    return res.json(cached.data);
  }

  try {
    const freshData = await fetchData(stockName);
    return res.json(freshData);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch data. Your IP has been tracked.' });
  }
});

// GET /allowedStocks endpoint
app.get('/allowedStocks', (req, res) => {
  res.status(200).json(ALLOWED_STOCKS);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//ChatGPT
app.get('/stocks', async (req, res) => {
  const now = Date.now();

  const fetchTasks = ALLOWED_STOCKS.map(async stock => {
    try {
      const cached = cache[stock];
      if (cached && (now - cached.timestamp < CACHE_DURATION)) {
        return [stock, cached.data];
      } else {
        const freshData = await fetchData(stock);
        return [stock, freshData];
      }
    } catch (err) {
      return [stock, { error: 'Failed to fetch data' }];
    }
  });

  const entries = await Promise.all(fetchTasks);
  const result = Object.fromEntries(entries);

  res.json(result);
});

// GET /allowedStocks endpoint
app.get('/allowedStocks', (req, res) => {
  res.status(200).json(ALLOWED_STOCKS);
});