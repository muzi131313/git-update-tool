const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const Gu = require('../../src/index');
const ioInit = require('./io-init');

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

ioInit(server);
