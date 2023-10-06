import { useState } from 'react';
import { getIdFromUserId } from '../constants/api/userApi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import UserProfilePage from '../components/User/EditUser';
import Loading from '../components/Loading';
import AuthProvider from '../components/Auth/AuthProvider';
interface UserPageProps {
  userId: string;
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

  return <UserProfilePage id={id} />;
};

const UserProfilesPage = (): JSX.Element => {
  const { id } = useParams();
  return <UserProfilePage id={id as number} />;
};

// main page renderer
const UserPageMain = (): JSX.Element => (
  <AuthProvider>{(user) => <UserPage userId={user.id} />}</AuthProvider>
);

export { UserPageMain, UserProfilesPage };
