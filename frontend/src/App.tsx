import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProblemPage from './pages/problems/ProblemPage';
import QuestionsPage from './pages/QuestionsPage';
import { ThemeProvider } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { hannahTheme, hannahThemeDark } from './constants/themes';
import { ThemeContext } from './contexts/theme-context';
import { Auth } from '@supabase/auth-ui-react';
import AuthPage from './pages/AuthPage';
import { supabase } from './main';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserPageMain, UserProfilesPage } from './pages/UserPage';
import MainNavigationBar from './components/Navbar/MainNavigationBar';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode ? 'dark' : 'light');
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => { // waits for the session to load
        console.log(event, session);
        if (event == 'SIGNED_OUT') { // immediate redirection
            navigate('/auth');
          }
        else if (!session) {
          navigate('/auth');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <ThemeProvider
            theme={theme == 'light' ? hannahTheme : hannahThemeDark}
          >
            <MainNavigationBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/user" element={<UserPageMain />} />
              <Route path="/user/:id" element={<UserProfilesPage />} />
              <Route path="/questions" element={<QuestionsPage />} />
              {/* TODO: Change this to dynamic routing */}
              <Route path="/problems" element={<ProblemPage />} />
            </Routes>
          </ThemeProvider>
        </ThemeContext.Provider>
      </Auth.UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
