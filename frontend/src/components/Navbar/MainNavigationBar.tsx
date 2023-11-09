import { Typography, AppBar, Toolbar, Box, Button } from '@mui/material';

import SignInOutButton from '../Auth/SignInOutButton';
import { ThemeContext } from '../../contexts/theme-context';
import { useContext } from 'react';
import { useAuth } from '../Auth/AuthProvider';
import HomeButton from './HomeButton';
import UserButton from './UserButton';
import { useNavigate } from 'react-router-dom';
import LightDarkButton from './LightDarkButton';

const MainNavigationBar = (): JSX.Element => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <AppBar position="sticky" enableColorOnDark sx={{ height: '64px' }}>
      <Toolbar variant="dense" sx={{ height: '64px' }}>
        <HomeButton />
        <Box sx={{ flexGrow: 0.1 }} />
        <Button color="inherit" onClick={() => navigate('/')}>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexgrow: 1, textAlign: 'left', textTransform: 'none' }}
          >
            PeerPrep
          </Typography>
        </Button>
        <Box sx={{ flexGrow: 9 }} />
        <LightDarkButton theme={theme} toggleTheme={toggleTheme} />
        <Box sx={{ flexGrow: 0.1 }} />
        <UserButton user={user} />
        <Box sx={{ flexGrow: 0.1 }} />
        <SignInOutButton user={user} />
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigationBar;
