import { useState } from 'react';
import { getUser } from '../services/user';
import { useQuery } from 'react-query';
import { UserSchema, AttemptedQuestionSchema } from '../services/apiSchema';

export interface User {
  id: number;
  userName: string;
  userPreferredComplexity: string;
  userPreferredLanguage: string;
  userAttemptedQuestions: AttemptedQuestionSchema[];
}

const useUserData = (props: { id: number }) => {
  const id = props.id;
  const [userName, setUserName] = useState('');
  const [userPreferredComplexity, setUserPreferredComplexity] = useState('');
  const [userPreferredLanguage, setUserPreferredLanguage] = useState('');
  const [userAttemptedQuestions, setUserAttemptedQuestions] = useState<
    AttemptedQuestionSchema[]
  >([]);
  const { isError, isLoading } = useQuery(['userData', id], () => getUser(id), {
    enabled: true,
    retry: 2,
    cacheTime: 0,
    onSuccess(res) {
      const userData: UserSchema = res.data;
      setUserName(userData.username);
      setUserPreferredComplexity(userData.preferredComplexity);
      setUserPreferredLanguage(userData.preferredLanguage);
      // Join attemptedQuestions1 and attemptedQuestions2
      setUserAttemptedQuestions(userData.attemptedQuestion1);
      setUserAttemptedQuestions((prev) => [
        ...prev,
        ...userData.attemptedQuestion2
      ]);

      console.log('User data fetched successfully', res);
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const user: User = {
    id,
    userName,
    userPreferredComplexity,
    userPreferredLanguage,
    userAttemptedQuestions
  };

  return {
    user,
    isLoading,
    isError,
    setUserName,
    setUserPreferredLanguage,
    setUserPreferredComplexity
  };
};

export default useUserData;
