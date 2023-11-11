import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { ThemeContext } from '../../contexts/theme-context';
import { useContext } from 'react';
import { Browser } from 'react-kawaii';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ProblemsNavbar = () => {
  const iconMood = [
    'sad',
    'shocked',
    'happy',
    'blissful',
    'lovestruck',
    'excited',
    'ko'
  ];

  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" enableColorOnDark>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, mb: -0.5 }}
            >
              <Browser
                size={24}
                mood={iconMood[Math.floor(Math.random() * 7)]}
                color="#fccb7e"
              />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              sx={{ ml: 1 }}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              color="inherit"
            >
              {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default ProblemsNavbar;
