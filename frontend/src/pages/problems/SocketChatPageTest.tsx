import Playground from '../../components/Problems/Playground';
import { Stack, Box, Paper } from '@mui/material';
import ProblemDescription from '../../components/Problems/ProblemDescription';
import { useEffect, useState } from 'react';
import ChatBox from '../../components/Chat/ChatBox';
import { socket } from '../../socket.js';
import { Auth } from '@supabase/auth-ui-react';
import ChatInputBox from '../../components/Chat/ChatInputBox';

const SocketChatPageTest = () => {
  // While this holds the UI components right now, this is a test component for
  // an overarching socket "app". The useEffects are set up here and passed to 
  // child components if necessary.
  const [isConnected, setIsConnected] = useState(socket.connected);

  const { user } = Auth.useUser();
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (user) {
      socket.auth = user
      socket.connect();
    }
  }, [user]);
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.style.overflow = 'hidden';
  }, []);

  return (
    <Box>
      <Stack direction="row">
        <Box>
          connected to socket: {isConnected ? "True" : "False"}
          <Paper sx={{
            height: '30vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            overflowY: 'scroll',
            padding: '1em',
            margin: '0.5em 0.25em 0.25em 0.5em'
          }}>
            <ChatBox />
          </Paper>
          <ChatInputBox />
          <Paper
            elevation={5}
            sx={{
              height: '50vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              overflowY: 'scroll',
              padding: '1em',
              margin: '0.5em 0.25em 0.25em 0.5em'
            }}
          >
            <ProblemDescription />
          </Paper>
        </Box>
        <Paper
          elevation={5}
          sx={{
            minWidth: '50%',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            overflowY: 'scroll',
            padding: '1em',
            margin: '0.2em 0.5em 0.25em 0.25em'
          }}
        >
          <Playground />
        </Paper>
      </Stack>
    </Box>
  );
};

export default SocketChatPageTest;
