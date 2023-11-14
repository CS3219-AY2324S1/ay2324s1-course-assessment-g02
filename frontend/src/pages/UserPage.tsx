import { useParams } from 'react-router-dom';
import UserProfileContainer from '../components/User/UserProfileContainer';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import { useAuth } from '../components/Auth/AuthProvider';
import GetUserIdProvider from '../components/Auth/GetUserIdProvider';
import useUserData from '../hooks/useUserData';
import { Box, Grid } from '@mui/material';
import UserHistoryTable from '../components/User/UserHistoryTable';

interface UserPageProps {
  userId: number;
  id;
  session;
  user;
}

const UserPage = (props: UserPageProps): JSX.Element => {
  const userData = useUserData({ id: props.id });
  const {
    user,
    isLoading: useUserIsLoading,
    isError: useUserIsError
  } = userData;

  if (useUserIsLoading) return <Loading />;

  if (useUserIsError) return <NotFound />;

  return (
    <Box sx={{}}>
      <Grid
        container
        spacing={0.5}
        display="flex"
        direction="column"
        sx={{ mt: 0.5, mb: 0.5 }}
      >
        <Grid item xs={12} md={3} lg={2}>
          <UserProfileContainer
            user={props.user}
            userData={userData}
            currentUser={props.userId}
            session={props.session}
          />
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <UserHistoryTable
            userAttemptedQuestions={user.userAttemptedQuestions}
            id={user.id}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const UserProfilesPage = (): JSX.Element => {
  const { user, session, isLoading } = useAuth();
  const { id } = useParams();

  return isLoading ? (
    <Loading />
  ) : (
    <GetUserIdProvider id={user.id}>
      {(userId) => (
        <UserPage user={user} session={session} userId={userId} id={id} />
      )}
    </GetUserIdProvider>
  );
};

const UserPageMain = (): JSX.Element => {
  const { user, session, isLoading } = useAuth();
  return isLoading ? (
    <Loading />
  ) : (
    <GetUserIdProvider id={user.id}>
      {(userId) => (
        <UserPage user={user} session={session} userId={userId} id={userId} />
      )}
    </GetUserIdProvider>
  );
};

export { UserPageMain, UserProfilesPage };
