import express, { Application } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import SessionStore from './src/socket/sessionStore';
import UserSessionStore from './src/socket/userSessionStore';

const app: Application = express();
const PORT = process.env.PORT || 4000;
const sessionStore = new SessionStore();
const userSessionStore = new UserSessionStore();
const httpServer = http.createServer(app);

const socketIO = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true // not sure if needed; but if in the client need in server
  }
});

// Middleware to handle session and user identification
socketIO.use(async (socket: Socket, next) => {
  const userId = socket.handshake.auth.userId;
  const email = socket.handshake.auth.email;
  const sessionId = socket.handshake.auth.sessionId;
  if (!userId) {
    return next(new Error('invalid user id'));
  }

  if (!sessionId) {
    return next(new Error('invalid session id'));
  }

  try {
    socket.data.sessionId = sessionId;
    socket.data.userId = userId;
    socket.data.email = email;
    next();
  } catch (err) {
    next(new Error('Internal Server Error'));
  }
});

socketIO.on('connection', async (socket: Socket) => {
  const userId = socket.data.userId;
  const sessionId = socket.data.sessionId;

  console.log(`⚡: ${userId} user just connected to ${sessionId}!`);
  const sessionQuestionId = await sessionStore.getQuestionId(sessionId);
  console.log('sessionQuestionId', sessionQuestionId);

  socket.emit('session', {
    sessionId,
    userId,
    questionId: sessionQuestionId
  });

  console.log('joining room', sessionId);
  socket.join(sessionId);

  socket.broadcast.emit('user connected', {
    userId,
    isConnected: true
  });

  console.log('Restoring messages');
  const sessionMessages = await sessionStore.getSessionMessages(sessionId);
  if (sessionMessages) {
    sessionMessages.forEach((message) => {
      socket.emit('messageResponse', message);
    });
  }

  console.log('Restoring code');
  const sessionCode = await sessionStore.getSessionCode(sessionId);
  if (sessionCode) {
    socket.emit('updateEditor', { code: sessionCode });
  }

  socket.on('chat message', (msg) => {
    console.log(
      `[${msg.createdAt}](${socket.data.userId}) message: ${msg.message}`
    );
    socket.emit('messageResponse', msg);
    socket.to(sessionId).emit('messageResponse', msg);
    sessionStore.saveNewSessionMessage(sessionId, msg);
  });

  socket.on('editorChange', (content) => {
    console.log(content.code);
    socket.to(sessionId).emit('updateEditor', content);
    sessionStore.saveSessionCode(sessionId, content.code);
  });

  socket.on('disconnect', async () => {
    console.log('🔥: A user disconnected');
    const matchingSockets = await socketIO.in(userId).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      socket.broadcast.emit('user disconnected', userId);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
