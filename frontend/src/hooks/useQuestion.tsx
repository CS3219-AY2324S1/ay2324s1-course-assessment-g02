import { useState } from 'react';
import { useQuery } from 'react-query';
import { Question, Complexity } from '../interfaces/question';
import { getQuestion } from '../services/questions';

const useQuestion = (id: number) => {
  const [question, setQuestion] = useState<Question>({
    id: id,
    title: '',
    description: '',
    complexity: Complexity.Easy,
    categories: []
  });

  if (id === undefined) {
    throw new Error('id is undefined');
  }

  const { isError, isLoading } = useQuery([id], () => getQuestion(id), {
    enabled: true,
    retry: 2,
    cacheTime: 0,
    onSuccess(res) {
      console.log('question', res.data);
      setQuestion({
        id: res.data.id,
        title: res.data.title,
        description: res.data.body,
        complexity: Complexity[res.data.complexity],
        categories: res.data.categories.map((category) => category.name)
      });
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return {
    isLoading,
    isError,
    question
  };
};

export default useQuestion;
