import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import ProblemPage from './pages/problems/problems';
import { ThemeProvider } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { hannahTheme, hannahThemeDark } from './constants/themes';
import { ThemeContext } from './contexts/theme-context';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme == 'light' ? hannahTheme : hannahThemeDark}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* TODO: Change this to dynamic routing */}
          <Route path="/problems" element={<ProblemPage />} />
        </Routes>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
