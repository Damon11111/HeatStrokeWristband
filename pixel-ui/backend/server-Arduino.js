// server-arduino.js
const express = require('express');
const { SerialPort, ReadlineParser } = require('serialport');
const cors = require('cors');

const app = express();
const PORT = 8081; // 新的端口号，用于与 Arduino 通信

// CORS 配置


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

// Arduino 串口配置
const arduinoPort = new SerialPort({
  path: '/dev/cu.usbmodem144301', // 替换为你的 Arduino 串口地址
  baudRate: 115200,
});

// 解析 Arduino 数据
const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\n' }));

// 存储 Arduino 数据
let sensorData = {
  
  heartRate: null,
  
};

// 处理 Arduino 数据
parser.on('data', (line) => {
    try {
      console.log(`Received from Arduino: ${line}`);
      // 使用正则表达式从字符串中提取数字
      const matches = line.match(/Heartrate:\s*(\d+)/);
      if (matches) {
        const heartRateValue = parseInt(matches[1], 10);
        sensorData.heartRate = heartRateValue;
      } else {
        console.error('Error parsing Arduino data: Invalid format');
      }
    } catch (error) {
      console.error('Error parsing Arduino data:', error.message);
    }
  });
  

// API 路由，用于前端获取 Arduino 数据
app.get('/api/sensors', (req, res) => {
  if (sensorData.heartRate !== null) {
    res.json(sensorData);
  } else {
    res.status(500).json({ error: 'No data available from Arduino' });
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`Arduino server is running on http://localhost:${PORT}`);
});
