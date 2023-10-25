import { useEffect, useState, useRef } from 'react';
import { socket } from '../../services/socket.js';
import { Stack, Box, Typography } from '@mui/material';
import ChatMessage from './ChatMessage.tsx';
import { ChatDirections, ChatMessageType } from './types';
import CircleIcon from '@mui/icons-material/Circle';

interface ChatProps {
  isConnected: boolean;
  userEmail: string;
}

const ChatBox = (props: ChatProps) => {
  const isConnected = props.isConnected;
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eventListener = (data) => {
      setMessages((list) => [...list, data]);
    };
    socket.on('messageResponse', eventListener);
    return () => {
      socket.off('messageResponse', eventListener);
    };
  }, []);

  useEffect(() => {
    const eventListener = (data) => {
      setMessages((list) => [...list, data]);
    };
    socket.on('restoreMessages', eventListener);
    return () => {
      socket.off('restoreMessages', eventListener);
    };
  }, []);

  useEffect(() => {
    // Implement autoscroll when new messages come in
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        height: '100%',
        padding: '0.5em'
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h6" gutterBottom>
          Chat Room
        </Typography>
        <CircleIcon sx={{ color: isConnected ? 'green' : 'red' }} />
      </Stack>
      <Stack spacing={1}>
        {messages.length === 0 && (
          <Typography variant="body2">No messages yet.</Typography>
        )}
        {messages.map(({ message, sender, createdAt }, _i) => {
          const direction =
            props.userEmail === sender
              ? ChatDirections.left
              : ChatDirections.right;
          return (
            <ChatMessage
              key={_i} // consider using unique ids
              message={message}
              direction={direction}
              sender={sender}
              createdAt={createdAt}
            />
          );
        })}
        <div ref={lastMessageRef} />
      </Stack>
    </Box>
  );
};

export default ChatBox;
