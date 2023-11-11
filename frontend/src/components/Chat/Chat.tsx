import ChatBox from './ChatBox';
import ChatInputBox from './ChatInputBox';
import { Box } from '@mui/material';

interface ChatProps {
  isConnected: boolean;
  userEmail: string;
}

const Chat = (props: ChatProps) => {
  const { isConnected, userEmail } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '1em',
        p: '0.5em'
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          overflowY: 'scroll',
          marginBottom: '8px'
        }}
      >
        <ChatBox isConnected={isConnected} userEmail={userEmail} />
      </Box>
      <ChatInputBox />
    </Box>
  );
};

export default Chat;
