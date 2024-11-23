const path = require('path');

module.exports = {
  testEnvironment: 'node',
  testMatch: [
    path.resolve(__dirname, './test/*.test.js'),
  ],
};
