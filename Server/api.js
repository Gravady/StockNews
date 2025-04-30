import dotenv from 'dotenv';
import axios from 'axios';

const secretKey = process.env.API_KEY;

const cors = require('cors');

app.use(cors());

//Generate API key
app.get('/api/api-key', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});