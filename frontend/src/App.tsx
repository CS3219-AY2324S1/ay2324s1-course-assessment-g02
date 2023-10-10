import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { useMediaQuery, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { hannahTheme, hannahThemeDark } from './constants/themes';
import { ThemeContext } from './contexts/theme-context';
import { Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { CssBaseline } from '@mui/material';
import { supabase } from './main';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserPageMain, UserProfilesPage } from './pages/UserPage';
// Components (for routes)
import MainNavigationBar from './components/Navbar/MainNavigationBar';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProblemPage from './pages/problems/ProblemPage';
import QuestionsPage from './pages/QuestionsPage';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode ? 'dark' : 'light');
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // waits for the session to load
        console.log(event, session);
        setSession(session);
        if (event == 'SIGNED_OUT') {
          // immediate redirection on signout
          navigate('/auth');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ThemeProvider
            theme={theme == 'light' ? hannahTheme : hannahThemeDark}
          >
            <MainNavigationBar />
            <CssBaseline />
            <Box
              display="flex"
              height={'100vh'}
              width={'100vw'}
              alignItems="center"
              justifyContent="center"
            >
              {!session && (
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="*" element={<Navigate to="/auth" replace />} />
                </Routes>
              )}
              {session && (
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/user" element={<UserPageMain />} />
                  <Route path="/user/:id" element={<UserProfilesPage />} />
                  <Route path="/questions" element={<QuestionsPage />} />
                  {/* TODO: Change this to dynamic routing */}
                  <Route path="/problems" element={<ProblemPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              )}
            </Box>
          </ThemeProvider>
        </ThemeContext.Provider>
      </Auth.UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
