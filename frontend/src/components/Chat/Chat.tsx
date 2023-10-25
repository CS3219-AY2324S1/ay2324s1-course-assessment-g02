import ChatBox from './ChatBox';
import ChatInputBox from './ChatInputBox';
import { Paper, Box } from '@mui/material';

interface ChatProps {
  isConnected: boolean;
  userEmail: string;
}

const Chat = (props: ChatProps) => {
  const isConnected = props.isConnected; // Replace with your logic

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '85vh'
      }}
    >
      <Paper
        sx={{
          flex: 1, // This makes it stretch to take available space
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          overflowY: 'scroll',
          padding: '1em',
          margin: '0.5em 0.25em 0.25em 0.5em',
          justifyContent: 'flex-end' // Aligns content to the bottom
        }}
      >
        <ChatBox isConnected={isConnected} userEmail={props.userEmail} />
      </Paper>
      <ChatInputBox />
    </Box>
  );
};

export default Chat;
