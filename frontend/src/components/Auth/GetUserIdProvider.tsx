import { useQuery } from 'react-query';
import { useState } from 'react';
import Loading from '../Loading';
import NotFound from '../NotFound';
import { getIdFromUserId } from '../../services/user';

interface UserIdProviderProps {
  children: (userId: number) => JSX.Element;
  id: string;
}

const GetUserIdProvider = (props: UserIdProviderProps): JSX.Element => {
  const [userId, setUserId] = useState<number>(0);
  const { isLoading, isError } = useQuery(
    ['userData'],
    () => getIdFromUserId(props.id),
    {
      enabled: true,
      retry: 3,
      cacheTime: 0,
      onSuccess(res) {
        setUserId(res.data);
      },
      onError: (error) => {
        console.log(error);
      }
    }
  );

  if (isLoading) return <Loading />;

  if (isError) return <NotFound />;

  return props.children(userId);
};

export default GetUserIdProvider;
