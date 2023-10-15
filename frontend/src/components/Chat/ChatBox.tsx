
import { useEffect, useState } from 'react';
import { socket } from '../../socket.js';
import {
  Stack
} from '@mui/material';
import { Chat } from '@mui/icons-material';
import ChatMessage from './ChatMessage.tsx';

import { ChatDirections, ChatMessageType } from './types';

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <>
      <Stack spacing={1}>
        <Chat /> Chat messages go here
        {messages.map(({ message, sender, createdAt }, _i) => {
          const direction = socket.auth.email == sender ? ChatDirections.left : ChatDirections.right;
          return (<ChatMessage message={message} direction={direction} sender={sender} createdAt={createdAt} />)
        })
        }
      </Stack>
    </>
  );
};

export default ChatBox;
