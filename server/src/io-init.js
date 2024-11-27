const { Server } = require('socket.io');
const Gu = require('../../src/index');

function initIO(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.broadcast.emit('hi');

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('request', async (json, callback) => {

      try {
        console.log('json: ', JSON.parse(json));
        const _callback = ({ type, data }) => {
          io.send('executeBash', {
            type,
            data,
          });
        }
        await Gu.executeBashWithJson(JSON.parse(json), _callback);

        callback({
          message: 'success',
          status: 'ok'
        });
      } catch (err) {
        console.error('[socket] err: ', err);
        callback({
          status: 'error',
          message: err.message
        });
      }
    });
  });
  return io;
}


module.exports = initIO;
