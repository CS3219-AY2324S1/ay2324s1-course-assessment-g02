import React from 'react';
import { Box } from '@mui/material';
import QuestionTable from '../components/Questions/QuestionTable';
import { fetchQuestions } from '../services/questions';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import AuthProvider from '../components/Auth/AuthProvider';

function QuestionPage(props: { user }): React.ReactElement {
  const {
    data: questionData,
    error,
    isError,
    isLoading
  } = useQuery('questions', fetchQuestions);

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
      <QuestionTable questionData={questionData} user={props.user} />
    </Box>
  );
}

const QuestionsPage = (): JSX.Element => (
  <AuthProvider auth={true}>
    {(user) => <QuestionPage user={user} />}
  </AuthProvider>
);

export default QuestionsPage;
