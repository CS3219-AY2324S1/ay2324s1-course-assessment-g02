import Playground from '../components/Problems/Playground';
import { Paper, Box } from '@mui/material';
import ProblemDescription from '../components/Problems/ProblemDescription';
import { useEffect } from 'react';
import {
  SessionProvider,
  useSession
} from '../components/Socket/SessionContext';
import AuthProvider from '../components/Auth/AuthProvider';
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
  }, []);

  return !session || !isConnected ? (
    <Loading />
  ) : (
    <Box
      display="flex"
      flexDirection="row"
      sx={{ width: '100%', height: '95vh' }}
    >
      <Box flexGrow={1} sx={{ margin: '0.5em', minWidth: '25%' }}>
        <Paper
          elevation={5}
          sx={{ height: '100%', padding: '1em', overflowY: 'auto' }}
        >
          <ProblemDescription questionId={questionId} />
        </Paper>
      </Box>
      <Box flexGrow={1} sx={{ margin: '0.5em', minWidth: '25%' }}>
        <Paper
          elevation={5}
          sx={{ height: '100%', padding: '1em', overflowY: 'auto' }}
        >
          <Playground />
        </Paper>
      </Box>
      <Box flexGrow={1} sx={{ margin: '0.5em', minWidth: '25%' }}>
        <Paper
          elevation={5}
          sx={{ height: '100%', padding: '1em', overflowY: 'auto' }}
        >
          <Chat isConnected={isConnected} userEmail={props.user.email} />
        </Paper>
      </Box>
    </Box>
  );
};

const InterviewPage = () => {
  return (
    <AuthProvider>
      {(user) => (
        <SessionProvider user={user}>
          <UnwrappedInterviewPage user={user} />
        </SessionProvider>
      )}
    </AuthProvider>
  );
};

export default InterviewPage;
