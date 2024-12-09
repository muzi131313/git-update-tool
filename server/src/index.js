const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const ioInit = require('./io-init');

const app = express();
const server = createServer(app);

// set static assets folder
app.use('/', express.static(join(__dirname, '../dist')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 8802;
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});

ioInit(server);
