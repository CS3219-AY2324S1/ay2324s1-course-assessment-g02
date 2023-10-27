import { Typography, AppBar, Toolbar, Box, Button } from '@mui/material';

import SignInOutButton from '../Auth/SignInOutButton';
import { ThemeContext } from '../../contexts/theme-context';
import { useContext } from 'react';
import LoggedInProvider from '../Auth/LoggedInProvider';
import HomeButton from './HomeButton';
import UserButton from './UserButton';
import { useNavigate } from 'react-router-dom';
import LightDarkButton from './LightDarkButton';

interface MainNavigationBarProps {
  user;
}

const NavigationBar = (props: MainNavigationBarProps): JSX.Element => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <Box display="flex">
      <AppBar position="sticky" enableColorOnDark>
        <Toolbar variant="dense">
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
          <UserButton user={props.user} />
          <Box sx={{ flexGrow: 0.1 }} />
          <SignInOutButton user={props.user} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const MainNavigationBar = (): JSX.Element => (
  <LoggedInProvider>{(user) => <NavigationBar user={user} />}</LoggedInProvider>
);

export default MainNavigationBar;
