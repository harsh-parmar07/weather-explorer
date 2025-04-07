require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/places', async (req, res) => {
  try {
    const { location } = req.query;
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: location,
        format: 'json',
        addressdetails: 1,
        limit: 10,
        countrycodes: 'us,ca,gb,au'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Places API error:', error);
    res.status(500).json({ error: 'Failed to fetch places data' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});