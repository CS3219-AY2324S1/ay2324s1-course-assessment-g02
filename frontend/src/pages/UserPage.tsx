import { useState } from 'react';
import { getIdFromUserId } from '../services/user';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import UserProfileContainer from '../components/User/UserProfileContainer';
import Loading from '../components/Loading';
import AuthProvider from '../components/Auth/AuthProvider';
interface UserPageProps {
  userId: string;
  id?;
}

const UserPage = (props: UserPageProps): JSX.Element => {
  const [id, setId] = useState<number>(0);

  const { isLoading } = useQuery(
    ['userData'],
    () => getIdFromUserId(props.userId),
    {
      enabled: true,
      retry: 2,
      cacheTime: 0,
      onSuccess(res) {
        setId(res.data);
      },
      onError: (error) => {
        console.log(error);
      }
    }
  );

  if (isLoading) return <Loading />;

  return (
    <UserProfileContainer currentUser={id} id={props.id ? props.id : id} />
  );
};

const UserProfilesPage = (): JSX.Element => {
  const { id } = useParams();
  return (
    <AuthProvider>
      {(user) => <UserPage userId={user.id} id={id} />}
    </AuthProvider>
  );
};

const UserPageMain = (): JSX.Element => (
  <AuthProvider>{(user) => <UserPage userId={user.id} />}</AuthProvider>
);

export { UserPageMain, UserProfilesPage };
