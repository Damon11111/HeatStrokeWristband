const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 8080;

// Allow specific origins (replace with your frontend URL)
app.use(cors({
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET'], // Allow only GET requests
    credentials: true, // Include credentials if necessary
  }));
// Enable CORS for frontend access
app.use(cors());

// Route to get weather data
app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  const API_KEY = process.env.API_KEY;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  try {
    const weatherResponse = await axios.get(weatherUrl);
    const uvResponse = await axios.get(uvUrl);

    res.json({
      temperature: weatherResponse.data.main.temp,
      weatherIcon: weatherResponse.data.weather[0].icon,
      uvIndex: uvResponse.data.value,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).send({ error: 'Failed to fetch weather data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
