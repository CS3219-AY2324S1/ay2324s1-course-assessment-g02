import Playground from '../components/Problems/Playground';
import { Paper, Box, Stack } from '@mui/material';
import ProblemDescription from '../components/Problems/ProblemDescription';
import { useEffect } from 'react';
import {
  SessionProvider,
  useSession
} from '../components/Socket/SessionContext';
import { useAuth } from '../components/Auth/AuthProvider';
import Chat from '../components/Chat/Chat';
import Loading from '../components/Loading';

interface UnwrappedInterviewPageProps {
  user;
}

const UnwrappedInterviewPage = (props: UnwrappedInterviewPageProps) => {
  const session = useSession();

  if (!session) {
    throw new Error('session still loading');
  }

  const { isConnected, questionId } = session.session;

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.style.overflow = 'hidden';
  });

  return !session || !isConnected ? (
    <Loading />
  ) : (
    <Box display="flex" flexGrow={1}>
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
        <Box
          width={{ xs: '100%', sm: '33.33%' }}
          sx={{ h: '100%', p: '0.5em' }}
        >
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

        <Box
          width={{ xs: '100%', sm: '33.33%' }}
          sx={{ h: '100%', p: '0.5em' }}
        >
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

        <Box
          width={{ xs: '100%', sm: '33.33%' }}
          sx={{ h: '100%', p: '0.5em' }}
        >
          <Paper
            elevation={5}
            style={{
              height: '100%',
              overflowY: 'scroll',
              borderRadius: '1em'
            }}
          >
            <Chat isConnected={isConnected} userEmail={props.user.email} />
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

const InterviewPage = () => {
  const { user } = useAuth();
  return (
    <SessionProvider user={user}>
      <UnwrappedInterviewPage user={user} />
    </SessionProvider>
  );
};

export default InterviewPage;
