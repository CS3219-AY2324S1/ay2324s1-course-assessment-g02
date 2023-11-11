import { useState } from 'react';
import { useQuery } from 'react-query';
import { getUserSession } from '../services/match.js';

interface Session {
  sessionId: string;
  userId: string;
  isConnected: boolean;
  email: string;
  questionId: number;
}

const useUserSession = (id: string) => {
  const [session, setSession] = useState<Session>({
    sessionId: '',
    userId: '',
    isConnected: false,
    email: '',
    questionId: 0
  });

  const { isError, isLoading } = useQuery([], () => getUserSession(id), {
    enabled: true,
    retry: 3,
    cacheTime: 0,
    onSuccess(res) {
      setSession((prevState) => ({
        ...prevState,
        sessionId: res.data
      }));
      console.log('User data fetched successfully', res);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return {
    session,
    isLoading,
    isError,
    setSession
  };
};

export default useUserSession;
