const express = require('express');
//const axios = require('axios');
const cors = require('cors');
const path = require('path'); // For handling static files
const { SerialPort, ReadlineParser } = require('serialport'); // For Arduino communication
require('dotenv').config();

const app = express();
const PORT = 8080;

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'https://damon11111.github.io'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET'], // Allowed request methods
  credentials: true,
}));

// Arduino serial port configuration
const arduinoPort = new SerialPort({
  path: '/dev/cu.usbmodem123456781', // Replace with your Arduino's port path (Windows: COM3, Mac/Linux: /dev/ttyUSB0)
  baudRate: 115200,      // Match the baud rate with Arduino's Serial.begin
});

// Set up the parser to handle incoming data
const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// Store Arduino data in memory
let sensorData = {
  temperature: null,
  heartRate: null,
  uvIndex: null,
};

// Handle incoming data from Arduino
parser.on('data', (line) => {
  try {
    console.log(`Received from Arduino: ${line}`);
    const [temperature, heartRate, uvIndex] = line.trim().split(',');

    // Update sensor data
    sensorData = {
      temperature: parseFloat(temperature),
      heartRate: parseInt(heartRate, 10),
      uvIndex: parseInt(uvIndex, 10),
    };
  } catch (error) {
    console.error('Error parsing Arduino data:', error.message);
  }
});

// Route to fetch sensor data
app.get('/api/weather', (req, res) => {
  if (sensorData.temperature !== null && sensorData.heartRate !== null && sensorData.uvIndex !== null) {
    res.json(sensorData);
  } else {
    res.status(500).json({ error: 'No data available from Arduino' });
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
