import { useState } from 'react';
import { getUser } from '../../constants/api/userApi';
import { useQuery } from 'react-query';

const useUserData = (id: number) => {
  const [userName, setUserName] = useState('');
  const [userPreferredComplexity, setUserPreferredComplexity] = useState('');
  const [userPreferredLanguage, setUserPreferredLanguage] = useState('');

  const { isError, isLoading } = useQuery(['userData', id], () => getUser(id), {
    enabled: true,
    retry: 2,
    cacheTime: 0,
    onSuccess(res) {
      setUserName(res.data.username);
      setUserPreferredComplexity(res.data.preferredComplexity);
      setUserPreferredLanguage(res.data.preferredLanguage);
      console.log(res.data.preferredLanguage);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return {
    userName,
    userPreferredComplexity,
    userPreferredLanguage,
    isLoading,
    isError,
    setUserName,
    setUserPreferredLanguage,
    setUserPreferredComplexity
  };
};

export default useUserData;
