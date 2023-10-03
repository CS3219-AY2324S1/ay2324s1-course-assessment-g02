import { Routes, Route, redirect } from 'react-router-dom';
import HomePage from './pages/home';
import ProblemPage from './pages/problems/ProblemPage';
import { ThemeProvider } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { hannahTheme, hannahThemeDark } from './constants/themes';
import { ThemeContext } from './contexts/theme-context';
import { Auth } from '@supabase/auth-ui-react';
import AuthPage from './pages/AuthPage';
import { supabase } from './main';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode ? 'dark' : 'light');
  const { user } = Auth.useUser()

  supabase.auth.onAuthStateChange((event) => {
      if (event == "SIGNED_IN") {
          console.log("signed in");
          console.log(user);
          redirect("/");
      } else {
          if (!user) {
            redirect("/auth");
              console.log("no user, it should go to auth");
          };
      }
  });
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme == 'light' ? hannahTheme : hannahThemeDark}>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/auth" element={<AuthPage />} />
          {/* TODO: Change this to dynamic routing */}
          <Route path="/problems" element={<ProblemPage />} />
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
