import ChatBox from './ChatBox';
import ChatInputBox from './ChatInputBox';
import { Box, IconButton } from '@mui/material';
import { ChatMessageType } from './types';
import CloseIcon from '@mui/icons-material/Close';

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
        pt: '2em',
        position: 'relative'
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          zIndex: 2,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <CloseIcon />
      </IconButton>
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
