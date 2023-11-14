import ChatBox from './ChatBox';
import ChatInputBox from './ChatInputBox';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ChatMessageType } from './types';
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';

interface ChatProps {
  isConnected: boolean;
  userEmail: string;
  messages: ChatMessageType[];
  newMessageIndex: number;
  onClose: () => void;
}

const Chat = (props: ChatProps) => {
  const { isConnected, userEmail, messages, newMessageIndex, onClose } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '1em',
        p: '0.5em',
        position: 'relative'
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        display="flex"
        justifyContent="space-between"
      >
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Chat Room
        </Typography>
        <CircleIcon sx={{ color: isConnected ? 'green' : 'red' }} />
      </Stack>
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          overflowY: 'scroll',
          marginBottom: '8px',
          padding: '0.5em'
        }}
      >
        <ChatBox
          isConnected={isConnected}
          userEmail={userEmail}
          messages={messages}
          newMessageIndex={newMessageIndex}
        />
      </Box>
      <ChatInputBox />
    </Box>
  );
};

export default Chat;
