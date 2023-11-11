import React from 'react';
import { Box } from '@mui/material';
import QuestionTable from '../components/Questions/QuestionTable';
import { fetchQuestions } from '../services/questions';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import { useAuth } from '../components/Auth/AuthProvider';

function QuestionsPage(): React.ReactElement {
  const { user } = useAuth();
  const {
    data: questionData,
    error,
    isError,
    isLoading
  } = useQuery('questions', fetchQuestions);

  const transformedQuestions = questionData?.map((question) => ({
    ...question,
    categories: question.categories.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {})
  }));

  if (isError) {
    return <div>Error! {(error as Error).message}</div>;
  }

  if (isLoading)
    return (
      <Box>
        <Loading />
      </Box>
    );

  return (
    <Box>
      <QuestionTable questionData={transformedQuestions} user={user} />
    </Box>
  );
}

export default QuestionsPage;
