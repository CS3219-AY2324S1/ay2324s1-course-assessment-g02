import React from 'react';
import { Box, Paper } from '@mui/material';
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
      <Paper
        elevation={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '2rem',
          border: '2px solid black',
          overflowY: 'scroll'
        }}
      >
        <QuestionTable questionData={questionData} user={props.user} />
      </Paper>
    </Box>
  );
}

const QuestionsPage = (): JSX.Element => (
  <AuthProvider>{(user) => <QuestionPage user={user} />}</AuthProvider>
);

export default QuestionsPage;
