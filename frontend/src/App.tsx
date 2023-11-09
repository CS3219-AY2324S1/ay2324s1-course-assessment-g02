import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { hannahTheme, hannahThemeDark } from './constants/themes';
import { ThemeContext } from './contexts/theme-context';
import { Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { CssBaseline } from '@mui/material';
import { supabase } from './main';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './components/Auth/AuthProvider';
import MainNavigationBar from './components/Navbar/MainNavigationBar';
import Loading from './components/Loading';
import { useDarkMode } from './hooks/useDarkMode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
// Components (for routes)
import NotFound from './components/NotFound';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { UserPageMain, UserProfilesPage } from './pages/UserPage';
import ProblemPage from './pages/problems/ProblemPage';
import QuestionsPage from './pages/QuestionsPage';
import MatchPage from './pages/MatchPage';
import InterviewPage from './pages/InterviewPage';

function App() {
  const { theme, toggleTheme, componentMounted } = useDarkMode();
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const [session, setSession] = useState<Session | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // waits for the session to load
        console.log(event, session);
        setIsLoading(false);
        setSession(session);
        if (!isLoading && event == 'SIGNED_OUT') {
          // immediate redirection on signout
          navigate('/auth');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return isLoading || !componentMounted ? (
    <Loading />
  ) : (
    <QueryClientProvider client={queryClient}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <AuthProvider>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider
              theme={theme == 'light' ? hannahTheme : hannahThemeDark}
            >
              <CssBaseline />
              <Box
                display="flex"
                flexDirection="column"
                height="100vh"
                width="100vw"
              >
                <ToastContainer
                  position="top-right"
                  style={{ marginTop: '60px' }}
                  toastClassName="custom-toast"
                  bodyClassName="custom-body"
                  progressClassName="custom-progress"
                />
                <MainNavigationBar />

                <Box
                  flexGrow={1}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  {!session && (
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route
                        path="*"
                        element={<Navigate to="/auth" replace />}
                      />
                    </Routes>
                  )}
                  {session && (
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/user" element={<UserPageMain />} />
                      <Route path="/user/:id" element={<UserProfilesPage />} />
                      <Route path="/questions" element={<QuestionsPage />} />
                      <Route path="/match" element={<MatchPage />} />
                      <Route path="/interview" element={<InterviewPage />} />
                      <Route path="/problems" element={<ProblemPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  )}
                </Box>
              </Box>
            </ThemeProvider>
          </ThemeContext.Provider>
        </AuthProvider>
      </Auth.UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
