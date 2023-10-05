import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../main';
import CssBaseline from '@mui/material/CssBaseline';

/* https://supabase.com/docs/guides/auth/auth-helpers/auth-ui */
import { Auth } from '@supabase/auth-ui-react';

import {
  // Import predefined theme
  ThemeSupa
} from '@supabase/auth-ui-shared';
import { ThemeContext } from '../contexts/theme-context';
import { useContext, useState, useEffect } from 'react';
import MainNavigationBar from '../components/Navbar/MainNavigationBar';

const AuthBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  width: 400,
  padding: 10
}));

const Container = (props: any) => {
  const { user } = Auth.useUser();
  const navigate = useNavigate();
  if (user) return navigate('/');
  return props.children;
};

function AuthPage() {
  const { theme } = useContext(ThemeContext);

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
        <Container supabaseClient={supabase}></Container>
        <AuthBox>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'github']}
            theme={theme == 'light' ? 'light' : 'dark'}
          />
        </AuthBox>
      </Box>
    </>
  );
}

export default AuthPage;