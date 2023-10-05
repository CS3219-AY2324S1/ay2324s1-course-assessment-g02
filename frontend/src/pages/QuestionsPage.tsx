import React from 'react';
import { Box } from '@mui/material';
import QuestionTable from '../components/QuestionTable';
import { Auth } from '@supabase/auth-ui-react';
import MainNavigationBar from '../components/Navbar/MainNavigationBar';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';

function QuestionsPage(): React.ReactElement {
  const { user } = Auth.useUser();
  const [isLoggedIn] = useState(false); // You can set this state based on your authentication logic
  console.log(user);
  const navigate = useNavigate();
  return user ? (
    <>
      <Box>
        <CssBaseline />
        <MainNavigationBar isLoggedIn={isLoggedIn} />

        <QuestionTable />
      </Box>
    </>
  ) : (
    <>{navigate('/auth')}</>
  );
}

export default QuestionsPage;
