import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { supabase } from '../../main';
import { Auth } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { ThemeContext } from '../../contexts/theme-context';
import { useContext } from 'react';
import { Browser } from 'react-kawaii';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const MainNavigationBar = ({ isLoggedIn }) => {
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
  const { user } = Auth.useUser();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" enableColorOnDark>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, mb: -0.5 }}
            onClick={() => navigate('/')}
          >
            <Browser
              size={24}
              mood={iconMood[Math.floor(Math.random() * 7)]}
              color="#fccb7e"
            />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexgrow: 1, textAlign: 'left' }}
          >
            PeerPrep
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            color="inherit"
          >
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Typography
            display="flex"
            variant="h6"
            sx={{ marginLeft: 'auto', my: 2 }}
          >
            User: {user ? user.email : 'Not signed in'}
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit">Profile</Button>
              <Button
                color="inherit"
                onClick={() => {
                  supabase.auth.signOut();
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate('/auth');
                }}
              >
                Sign in
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainNavigationBar;
