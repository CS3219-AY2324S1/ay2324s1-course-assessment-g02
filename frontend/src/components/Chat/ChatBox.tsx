import { useEffect, useRef } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import ChatMessage from './ChatMessage.tsx';
import { ChatDirections, ChatMessageType } from './types';
import CircleIcon from '@mui/icons-material/Circle';

interface ChatProps {
  isConnected: boolean;
  userEmail: string;
  messages: ChatMessageType[];
  newMessageIndex: number;
}

const ChatBox = (props: ChatProps) => {
  const isConnected = props.isConnected;
  const messages = props.messages;
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'instant' });
  }, [messages]);

  return (
    <Box
      sx={{
        borderRadius: '1em',
        height: '100%',
        padding: '0.5em'
      }}
    >
      <Stack spacing={1}>
        {messages.length === 0 && (
          <Typography variant="body2">No messages yet.</Typography>
        )}
        {messages.map(({ message, sender, createdAt }, _i) => {
          const direction =
            props.userEmail === sender
              ? ChatDirections.right
              : ChatDirections.left;
          return (
            <ChatMessage
              key={_i}
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
