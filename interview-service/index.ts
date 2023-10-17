import express, { Application, Request, Response } from 'express';
import httpPackage from 'http';
import { Server } from 'socket.io';

const app: Application = express();
const PORT = process.env.PORT || 4000;

//New imports
const http = new httpPackage.Server(app);

const socketIO = new Server(http, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true // not sure if needed; but if in the client need in server
  },
});

socketIO.listen(4000)

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  // join a room. This one is a test to be able to broadcast messages
  // TODO: Join the room based on the matching by matching service
  socket.join("Test Room")

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + socket.id + msg.message + msg.createdAt + msg.sender);
    // send message to self
    socket.emit('messageResponse', msg);
    // send message to others
    socket.to("Test Room").emit('messageResponse', msg);
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Interview Service running');
});
