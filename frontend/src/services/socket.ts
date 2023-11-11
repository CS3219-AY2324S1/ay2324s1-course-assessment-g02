import { io } from 'socket.io-client';

const URL = `http://${import.meta.env.VITE_APP_INTERVIEW_HOST}:${
  import.meta.env.VITE_APP_INTERVIEW_BACKEND_PORT
}`;

export const socket = io(URL, {
  withCredentials: true, // not sure if I need this
  // Switch to this later and force validation before using it
  autoConnect: false
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

// in https://socket.io/get-started/private-messaging-part-1/#how-it-works
// it implies i should destroy it - where should this code go?
// destroyed() {
//     socket.off("connect_error");
//   }
