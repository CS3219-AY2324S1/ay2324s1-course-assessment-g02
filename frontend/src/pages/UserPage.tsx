import { Auth } from '@supabase/auth-ui-react';
import { useState, useContext, useEffect } from 'react';
import { getIdFromUserId } from '../constants/api/userApi';
import { useQuery } from 'react-query';
import UserProfilePage from './UserProfilePage';
import Loading from '../components/Loading';

function UserPage() {
  const [Id, setId] = useState<number>(0);
  // const [user, setUser] = useState<any>(null);
  const { user } = Auth.useUser();

  const { data, error, isError, isLoading, refetch } = useQuery(
    ['userData'],
    () => getIdFromUserId(user ? user.id : ''),
    {
      enabled: true,
      retry: 6,
      cacheTime: 0,
      onSuccess(res: any) {
        setId(res.data);
      },
      onError: (error: any) => {
        console.log(error);
      }
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <UserProfilePage id={Id} />
    </>
  );
}

export default UserPage;
