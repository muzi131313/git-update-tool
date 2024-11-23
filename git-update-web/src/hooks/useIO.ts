import { io } from "socket.io-client";

const socket = io();

socket.on("error", (error) => {
  // ...
  console.error(error);
});

socket.on("ping", (msg) => {
  // ...
  console.log('ping: ', msg);
});

socket.on("reconnect", (attempt) => {
  // ...
  console.log('reconnect: ', attempt);
});

socket.on("reconnect_attempt", (attempt) => {
  // ...
  console.log('reconnect_attempt: ', attempt);
});

socket.on("reconnect_error", (error) => {
  // ...
  console.log('reconnect_error: ', error);
});

socket.on("reconnect_failed", () => {
  // ...
  console.log('reconnect_failed');
});

export const useIO = () => {
  const emit = (json: object) => {
    socket.timeout(5000).emit('request', json, (err: string, response: any) => {
      if (err) {
        console.error(err);
        // the server did not acknowledge the event in the given delay
      } else {
        console.log(response.status); // 'ok'
      }
    });
  }
  return {
    socket,
    emit,
  }
}
