import Playground from '../components/Problems/Playground';
import { Stack, Paper, Box } from '@mui/material';
import ProblemDescription from '../components/Problems/ProblemDescription';
import { useEffect } from 'react';
import {
  SessionProvider,
  useSession
} from '../components/Socket/SessionContext';
import AuthProvider from '../components/Auth/AuthProvider';
// import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Chat from '../components/Chat/Chat';
import Loading from '../components/Loading';

interface SocketChatPageTestProps {
  user;
}

const SocketChatPageTest = (props: SocketChatPageTestProps) => {
  // const [isSidebarOpen, setSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!isSidebarOpen);
  // };

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
    <Box flexDirection="row" display="flex">
      <Stack direction="row">
        <Box>
          <Paper
            elevation={5}
            sx={{
              height: '90vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              overflowY: 'scroll',
              padding: '1em',
              margin: '0.5em 0.25em 0.25em 0.5em'
            }}
          >
            <ProblemDescription questionId={questionId} />
          </Paper>
        </Box>
        <Paper
          elevation={5}
          sx={{
            minWidth: '45%',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            overflowY: 'scroll',
            padding: '1em',
            margin: '0.5em 0.25em 0.25em 0.5em'
          }}
        >
          <Playground />
        </Paper>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh' // adjust this as needed
          }}
        >
          <Button
            variant="contained"
            onClick={toggleSidebar}
            sx={{
              width: 'auto',
              minWidth: 'auto',
              height: '5%',
              margin: '0.25em',
              padding: '0.5em 0.2em', // reduced padding horizontally
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex'
            }}
          >
            {isSidebarOpen ? <ArrowRightIcon /> : <ArrowLeftIcon />}
          </Button>
        </Box> */}
        <Paper
          elevation={5}
          sx={{
            minWidth: '20%',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            overflowY: 'scroll',
            padding: '1em',
            margin: '0.5em 0.25em 0.25em 0.5em'
          }}
        >
          <Box
            sx={{
              // width: isSidebarOpen ? '30%' : 0,
              transition: 'width 0.3s ease-in-out'
            }}
          >
            {/* {isSidebarOpen && (
          <Chat isConnected={isConnected} userEmail={props.user.email} />
        )} */}
            <Chat isConnected={isConnected} userEmail={props.user.email} />
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

const InterviewPage = () => {
  return (
    <AuthProvider>
      {(user) => (
        <SessionProvider user={user}>
          <SocketChatPageTest user={user} />
        </SessionProvider>
      )}
    </AuthProvider>
  );
};

export default InterviewPage;
