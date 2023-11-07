import { useParams } from 'react-router-dom';
import UserProfileContainer from '../components/User/UserProfileContainer';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import AuthProvider from '../components/Auth/AuthProvider';
import GetUserIdProvider from '../components/Auth/GetUserIdProvider';
import useUserData from '../hooks/useUserData';
// import UserHistoryTable from 'components/User/UserHistoryTable';

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

  if (useUserIsLoading) return <Loading />;

  if (useUserIsError) return <NotFound />;

  return (
    // <Stack flexDirection='row'>
    <UserProfileContainer userData={userData} currentUser={props.userId} />
  );
  {
    /* <UserHistoryTable userAttemptedQuestions={user.userAttemptedQuestions} /> */
  }
  {
    /* </Stack> */
  }
};

const UserProfilesPage = (): JSX.Element => {
  const { id } = useParams();
  return (
    <AuthProvider auth={true}>
      {(user) => (
        <GetUserIdProvider id={user.id}>
          {(userId) => <UserPage userId={userId} id={id} />}
        </GetUserIdProvider>
      )}
    </AuthProvider>
  );
};

const UserPageMain = (): JSX.Element => (
  <AuthProvider auth={true}>
    {(user) => (
      <GetUserIdProvider id={user.id}>
        {(userId) => <UserPage userId={userId} id={userId} />}
      </GetUserIdProvider>
    )}
  </AuthProvider>
);

export { UserPageMain, UserProfilesPage };
