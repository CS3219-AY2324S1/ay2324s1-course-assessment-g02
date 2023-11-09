import { useParams } from 'react-router-dom';
import UserProfileContainer from '../components/User/UserProfileContainer';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import { useAuth } from '../components/Auth/AuthProvider';
import GetUserIdProvider from '../components/Auth/GetUserIdProvider';
import useUserData from '../hooks/useUserData';
import { Stack, Container, Box, Divider } from '@mui/material';
import UserHistoryTable from '../components/User/UserHistoryTable';

interface UserPageProps {
  userId: number;
  id;
}

const UserPage = (props: UserPageProps): JSX.Element => {
  const userData = useUserData({ id: props.id });
  const {
    user,
    isLoading: useUserIsLoading,
    isError: useUserIsError
  } = userData;

  console.log('userData', userData);
  if (useUserIsLoading) return <Loading />;

  if (useUserIsError) return <NotFound />;

  return (
    <Container maxWidth="lg">
      <Box sx={{ height: `calc(100vh - 64px)` }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ height: '100%' }}
        >
          <UserProfileContainer
            userData={userData}
            currentUser={props.userId}
          />
          <UserHistoryTable
            userAttemptedQuestions={user.userAttemptedQuestions}
            id={user.id}
          />
        </Stack>
      </Box>
    </Container>
  );
};

const UserProfilesPage = (): JSX.Element => {
  const { user } = useAuth();
  const { id } = useParams();
  return (
    <GetUserIdProvider id={user.id}>
      {(userId) => <UserPage userId={userId} id={id} />}
    </GetUserIdProvider>
  );
};

const UserPageMain = (): JSX.Element => {
  const { user } = useAuth();
  return (
    <GetUserIdProvider id={user.id}>
      {(userId) => <UserPage userId={userId} id={userId} />}
    </GetUserIdProvider>
  );
};

export { UserPageMain, UserProfilesPage };
