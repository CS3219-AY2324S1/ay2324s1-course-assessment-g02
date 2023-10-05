import React from 'react';
import { Box } from '@mui/material';
import QuestionTable from '../components/QuestionTable';
import { Auth } from '@supabase/auth-ui-react';
import MainNavigationBar from '../components/Navbar/MainNavigationBar';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { fetchQuestions } from '../constants/api/questionsApi';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import { useEffect } from 'react';

function QuestionsPage(): React.ReactElement {
  const { user } = Auth.useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    }
  });

  const {
    data: questionData,
    error,
    isError,
    isLoading
  } = useQuery('questions', fetchQuestions);

  if (isError) {
    return <div>Error! {(error as Error).message}</div>;
  }

  return !isLoading ? (
    // I know this implementation for loading is shit, shall fix this when I'm done with the rest
    <>
      <Box>
        <CssBaseline />
        <MainNavigationBar isLoggedIn={isLoggedIn} />
        <QuestionTable questionData={questionData} />
      </Box>
    </>
  ) : (
    <>
      <Box>
        <CssBaseline />
        <MainNavigationBar isLoggedIn={isLoggedIn} />
        <Loading />
      </Box>
    </>
  );
}

export default QuestionsPage;
