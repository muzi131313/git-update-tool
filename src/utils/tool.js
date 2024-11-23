const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const Log = require('./log.js');

const tools = {};

/**
 * @name readFile
 * @description read file
 * @created 2024-11-23 11:38:10
 */
function readFile(filePath) {
  try {
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    Log.log('[read-files], data: ', data);
    return data;
  } catch (e) {
    Log.error('[read-files], error: ', e);
    return null;
  }
}

/**
 * @name execCommand
 * @description execute command
 * @param {String} command command
 * @created 2024-11-23 11:37:59
 */
function execCommand(command) {
  return new Promise((resolve, reject) => {
    try {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          Log.error('execute err\n', stderr);
          reject({
            done: false,
            err,
          });
          return;
        }
        if (stderr) {
          Log.error('execute error\n', stderr);
          reject({
            done: false,
            err: stderr,
          });
          return;
        }
        Log.info('execute result\n', stdout);
        resolve({
          done: true,
          data: stdout,
          err,
        });
      });
    } catch (e) {
      console.error(e);
    }
  });
}

tools.readFile = readFile;
tools.execCommand = execCommand;

module.exports = tools;
