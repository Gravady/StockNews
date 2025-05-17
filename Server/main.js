import express from 'express';
import { config } from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

config();

const app = express();
const port = 3000;

app.use(cors());

const CACHE_DURATION = 6 * 60 * 60 * 1000;
const cache = {};

ALLOWED_STOCKS = [
  "AAPL", "NVDA",
  "INTC", "NET",
  "TTWO", "BYD",
  "GOOGL", "TSLA",
  "AYRO", "BTC"
];

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


async function refreshAllStocks() {
  for (const stock of ALLOWED_STOCKS) {
    try {
      await fetchData(stock);
    } catch (error) {
      console.error(`Failed to refresh ${stock}:`, error.message);
    }
  }
}

//Refresh stocks
refreshAllStocks();

setInterval(refreshAllStocks, CACHE_DURATION);

app.use(cors());

// Allowed symbols
const ALLOWED_STOCKS = [
  "AAPL", "NVDA",
  "INTC", "NET",
  "TTWO", "BYD",
  "GOOGL", "TSLA",
  "AYRO", "BTC"
];

app.get('/stocks', (req, res) => {
  const result = {};
  for (const stock of ALLOWED_STOCKS) {
    const cached = cache[stock];
    result[stock] = cached?.data || { error: 'Data unavailable' };
  }
  res.json(result);
});

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

  return res.status(503).json({ error: 'Data unavailable. Please try again later.' });
});

// GET /allowedStocks endpoint
app.get('/allowedStocks', (req, res) => {
  res.status(200).json(ALLOWED_STOCKS);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
