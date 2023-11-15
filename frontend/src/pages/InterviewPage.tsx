import Playground from '../components/Problems/Playground';
import { Paper, Box, Stack, Popper, Button, Badge } from '@mui/material';
import ProblemDescription from '../components/Problems/ProblemDescription';
import { useEffect, useState } from 'react';
import {
  SessionProvider,
  useSession
} from '../components/Socket/SessionContext';
import { useAuth } from '../components/Auth/AuthProvider';
import Chat from '../components/Chat/Chat';
import Loading from '../components/Loading';
import ChatIcon from '@mui/icons-material/Chat';
import { socket } from '../services/socket.js';
import { ChatMessageType } from '../components/Chat/types';

interface UnwrappedInterviewPageProps {
  user;
}

const UnwrappedInterviewPage = (props: UnwrappedInterviewPageProps) => {
  const session = useSession();
  const [openChatPopper, setOpenChatPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isConnected, questionId } = session.session;
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  useEffect(() => {
    const eventListener = (data) => {
      setMessages((list) => {
        // Increment new messages count if chat is not open
        if (!openChatPopper) {
          setNewMessagesCount((prevCount) => prevCount + 1);
        }
        return [...list, data];
      });
    };
    socket.on('messageResponse', eventListener);
    return () => {
      socket.off('messageResponse', eventListener);
    };
  }, [openChatPopper]);

  useEffect(() => {
    const eventListener = (data) => {
      setMessages((list) => [...list, data]);
    };
    socket.on('restoreMessages', eventListener);
    return () => {
      socket.off('restoreMessages', eventListener);
    };
  }, []);

  const handleChatPopperClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenChatPopper((prevOpen) => !prevOpen);
    if (!openChatPopper) {
      setNewMessagesCount(0);
    }
  };

  const handleCloseChat = () => {
    setOpenChatPopper(false);
  };

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.style.overflow = 'hidden';
  });

  return !session || !isConnected ? (
    <Loading />
  ) : (
    <Box display="flex" flexGrow={1} width="100vw">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={0.5}
        style={{
          height: 'calc(100vh - 64px)',
          width: '100%',
          padding: '0.5em',
          overflowY: 'scroll'
        }}
      >
        <Box width={{ xs: '100%', sm: '50%' }} sx={{ h: '100%' }}>
          <Paper
            elevation={5}
            style={{
              height: '100%',
              overflowY: 'scroll',
              borderRadius: '1em'
            }}
          >
            <ProblemDescription questionId={questionId} />
          </Paper>
        </Box>

        <Box width={{ xs: '100%', sm: '50%' }} sx={{ h: '100%' }}>
          <Paper
            elevation={5}
            style={{
              height: '100%',
              overflowY: 'scroll',
              borderRadius: '1em'
            }}
          >
            <Playground />
          </Paper>
        </Box>

        <Stack width="0%" sx={{ position: 'relative', height: '90%' }}>
          <Paper elevation={5} style={{}}></Paper>
          <Button
            variant="outlined"
            onClick={handleChatPopperClick}
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              borderRadius: '50%',
              minWidth: '56px',
              height: '56px',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark'
              },
              boxShadow: 3
            }}
          >
            <Badge
              color="error"
              badgeContent={newMessagesCount}
              invisible={newMessagesCount === 0}
            >
              <ChatIcon />
            </Badge>
          </Button>
          <Popper
            open={openChatPopper}
            anchorEl={anchorEl}
            placement="top-end"
            modifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, -10]
                }
              }
            ]}
          >
            <Paper
              elevation={5}
              style={{
                height: '400px',
                overflowY: 'scroll',
                borderRadius: '1em'
              }}
            >
              <Chat
                isConnected={isConnected}
                userEmail={props.user.email}
                messages={messages}
                newMessageIndex={messages.length - newMessagesCount}
                onClose={handleCloseChat}
              />
            </Paper>
          </Popper>
        </Stack>
      </Stack>
    </Box>
  );
};

const InterviewPage = () => {
  const { user, isLoading } = useAuth();
  return isLoading ? (
    <Loading />
  ) : (
    <SessionProvider user={user}>
      <UnwrappedInterviewPage user={user} />
    </SessionProvider>
  );
};

export default InterviewPage;
