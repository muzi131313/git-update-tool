const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const ioInit = require('./io-init');

const app = express();
const server = createServer(app);

// 设置静态资源文件夹
app.use('/', express.static(join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

ioInit(server);
