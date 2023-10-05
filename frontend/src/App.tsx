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
import { Session } from '@supabase/supabase-js';
import AuthPage from './pages/AuthPage';
import { supabase } from './main';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode ? 'dark' : 'light');
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);
  if (!session) {
    navigate('/auth');
  }

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={theme == 'light' ? hannahTheme : hannahThemeDark}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            {/* TODO: Change this to dynamic routing */}
            <Route path="/problems" element={<ProblemPage />} />
          </Routes>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Auth.UserContextProvider>
  );
}

export default App;
