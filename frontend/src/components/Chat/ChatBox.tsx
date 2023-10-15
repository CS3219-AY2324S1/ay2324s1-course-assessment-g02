
import { useEffect, useState, useRef } from 'react';
import { socket } from '../../socket.js';
import {
  Stack
} from '@mui/material';
import { Chat } from '@mui/icons-material';
import ChatMessage from './ChatMessage.tsx';

import { ChatDirections, ChatMessageType } from './types';

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // implement autoscroll when new messages come in
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Stack spacing={1}>
        <Chat /> Chat messages go here
        {messages.map(({ message, sender, createdAt }, _i) => {
          const direction = socket.auth.email == sender ? ChatDirections.left : ChatDirections.right;
          return (<ChatMessage message={message} direction={direction} sender={sender} createdAt={createdAt} />)
        })}
        <div ref={lastMessageRef} />
      </Stack>
    </>
  );
};

export default ChatBox;
