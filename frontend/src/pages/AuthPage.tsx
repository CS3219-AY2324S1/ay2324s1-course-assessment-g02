import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../main';

/* https://supabase.com/docs/guides/auth/auth-helpers/auth-ui */
import { Auth } from '@supabase/auth-ui-react';

import {
  // Import predefined theme
  ThemeSupa
} from '@supabase/auth-ui-shared';
import { ThemeContext } from '../contexts/theme-context';
import { useContext, useEffect } from 'react';

const AuthBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  width: 400,
  padding: 10
}));

const Container = (props) => {
  const { user } = Auth.useUser();
  const navigate = useNavigate();
  if (user) return navigate('/');
  return props.children;
};

function AuthPage() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // waits for the session to load
        if (session) {
          navigate('/');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
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
            // providers={['google', 'github']}
            theme={theme == 'light' ? 'light' : 'dark'}
          />
        </AuthBox>
      </Box>
    </>
  );
}

export default AuthPage;
