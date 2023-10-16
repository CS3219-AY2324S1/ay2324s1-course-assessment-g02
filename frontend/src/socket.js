import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:4000';
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

export const socket = io(URL, {
    withCredentials: true, // not sure if I need this
    // Switch to this later and force validation before using it
    autoConnect: false
});

socket.onAny((event, ...args) => {
    console.log(event, args);
});

socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

// in https://socket.io/get-started/private-messaging-part-1/#how-it-works 
// it implies i should destroy it - where should this code go?
// destroyed() {
//     socket.off("connect_error");
//   }
