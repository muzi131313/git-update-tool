// const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

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
function execCommand(command, callback) {
  Log.log('[debug] command: ', command);
  return new Promise((resolve, reject) => {
    try {
      const bashCommand = spawn('bash', ['-c', command]);
      bashCommand.stdout.on('data', (data) => {
        Log.info('stdout: ', data.toString());
        callback && callback({
          type: 'stdout',
          data: data.toString(),
        });
      });
      bashCommand.stderr.on('data', (data) => {
        Log.error('stderr: ', data.toString());
        callback && callback({
          type: 'stderr',
          data: data.toString(),
        });
      });
      bashCommand.on('close', (code) => {
        console.log(`Process exited with code ${code}`);
        callback && callback({
          type: 'close',
          data: code,
        });
        resolve({
          done: true,
          data: code,
        });
      });
      // exec(command, (err, stdout, stderr) => {
      //   if (err) {
      //     Log.error('execute err\n', stderr);
      //     reject({
      //       done: false,
      //       err,
      //     });
      //     return;
      //   }
      //   if (stderr) {
      //     Log.error('execute error\n', stderr);
      //     reject({
      //       done: false,
      //       err: stderr,
      //     });
      //     return;
      //   }
      //   Log.info('execute result\n', stdout);
      //   resolve({
      //     done: true,
      //     data: stdout,
      //     err,
      //   });
      // });
    } catch (e) {
      Log.error('catch error: ', e);
    }
  }).catch((e) => {
    Log.error('promise catch error: ', e);
  });
}

tools.readFile = readFile;
tools.execCommand = execCommand;

module.exports = tools;
