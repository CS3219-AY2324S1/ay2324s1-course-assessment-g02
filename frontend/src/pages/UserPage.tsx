import React from 'react';
import { Box } from '@mui/material';
import QuestionTable from '../components/QuestionTable';
import { Auth } from '@supabase/auth-ui-react';
import MainNavigationBar from '../components/Navbar/MainNavigationBar';
import { useState, useContext, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../main';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { EditUserProfile } from '../components/EditUserProfile';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const UserBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  width: 400,
  padding: 10
}));

function UserPage() {
  const [session, setSession] = useState<Session | null>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        setIsLoggedIn(true);
      }
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setIsLoggedIn(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <CssBaseline />
      <MainNavigationBar isLoggedIn={isLoggedIn} />
      <Box
        display="flex"
        height={'100vh'}
        width={'100vw'}
        alignItems="center"
        justifyContent="center"
      >
        {/* <EditUserProfile /> */}
      </Box>
    </>
  );
}

export default UserPage;
