const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path'); // For handling static files
require('dotenv').config();

const app = express();
const PORT = 8080;

// Allow specific origins (replace with your frontend URL)
const allowedOrigins = ['http://localhost:3000', 'https://damon11111.github.io'];

app.use(cors({
  origin: function (origin, callback) {
    // 如果请求没有来源（如某些服务器请求），允许
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      // 允许的来源
      return callback(null, true);
    } else {
      // 拒绝的来源
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET'], // 允许的请求方法
  credentials: true, // 是否允许携带凭据（如 cookies）
}));


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

// Serve static files from React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle root route
app.get('/', (req, res) => {
  res.send('Welcome to the Heat Stroke Wristband API');
});

// Handle all other routes and serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
