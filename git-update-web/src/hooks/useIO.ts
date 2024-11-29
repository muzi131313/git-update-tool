import { io } from 'socket.io-client';
import eventBus from './useEventBus';
import { EventType, MessageType, Msgs, SOCKET_TIMEOUT, type MessageObject } from '@/interface.d';

const socket = io();

socket.on('error', (error) => {
  // ...
  console.error(error);
});

socket.on('ping', (msg) => {
  // ...
  console.log('ping: ', msg);
});

const handleMessage = (msg: string) => {
  const msgs = msg.replace(/\n\n/g, '\n').split('\n').filter(item => item);
  return msgs;
}

socket.on('message', (msg, object: MessageObject) => {
  // ...
  console.log('message: ', msg, object);
  const type = Msgs[object.type];
  if (type !== MessageType.Green) {
    const msgs = handleMessage(object.data as string);
    msgs.forEach(msg => {
      eventBus.emit(EventType.message, {
        type,
        message: msg,
      });
    })
  } else {
    eventBus.emit(EventType.message, {
      type,
      message: 'build done',
    });
  }
});

socket.on('reconnect', (attempt) => {
  // ...
  console.log('reconnect: ', attempt);
});

socket.on('reconnect_attempt', (attempt) => {
  // ...
  console.log('reconnect_attempt: ', attempt);
});

socket.on('reconnect_error', (error) => {
  // ...
  console.log('reconnect_error: ', error);
});

socket.on('reconnect_failed', () => {
  // ...
  console.log('reconnect_failed');
});

export const useIO = () => {
  const emit = (json: object) => {
    socket.timeout(SOCKET_TIMEOUT).emit('request', json, (err: string, response: any) => {
      console.log('[debug] response: ', response, err);
      const status = response?.status;
      if (err || status === 'error') {
        // the server did not acknowledge the event in the given delay
        eventBus.emit(EventType.message, {
          type: MessageType.Red,
          message: response.message,
        });
      } else {
        console.log(status); // 'ok'
        eventBus.emit(EventType.message, {
          type: MessageType.Green,
          message: 'finish executing command',
        });
      }
    });
  }
  return {
    socket,
    emit,
  }
}
