// server-arduino.js
const express = require('express');
const { SerialPort, ReadlineParser } = require('serialport');
const cors = require('cors');

const app = express();
const PORT = 8081; // 新的端口号，用于与 Arduino 通信

// CORS 配置
app.use(cors());

// Arduino 串口配置
const arduinoPort = new SerialPort({
  path: '/dev/cu.usbmodem123456781', // 替换为你的 Arduino 串口地址
  baudRate: 115200,
});

// 解析 Arduino 数据
const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// 存储 Arduino 数据
let sensorData = {
  temperature: null,
  heartRate: null,
  uvIndex: null,
};

// 处理 Arduino 数据
parser.on('data', (line) => {
  try {
    console.log(`Received from Arduino: ${line}`);
    const [temperature, heartRate, uvIndex] = line.trim().split(',');

    sensorData = {
      temperature: parseFloat(temperature),
      heartRate: parseInt(heartRate, 10),
      uvIndex: parseInt(uvIndex, 10),
    };
  } catch (error) {
    console.error('Error parsing Arduino data:', error.message);
  }
});

// API 路由，用于前端获取 Arduino 数据
app.get('/api/sensors', (req, res) => {
  if (sensorData.temperature !== null && sensorData.heartRate !== null && sensorData.uvIndex !== null) {
    res.json(sensorData);
  } else {
    res.status(500).json({ error: 'No data available from Arduino' });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`Arduino server is running on http://localhost:${PORT}`);
});
