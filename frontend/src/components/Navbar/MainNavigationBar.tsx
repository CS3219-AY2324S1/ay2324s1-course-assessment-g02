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
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <LightDarkButton theme={theme} setTheme={setTheme} />
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
  <LoggedInProvider>
    {(userId) => <NavigationBar user={userId} />}
  </LoggedInProvider>
);

export default MainNavigationBar;
