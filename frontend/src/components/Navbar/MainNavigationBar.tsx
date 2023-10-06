import { Typography, AppBar, IconButton, Toolbar, Box } from '@mui/material';
import SignInOutButton from '../Auth/SignInOutButton';
import { ThemeContext } from '../../contexts/theme-context';
import { useContext } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LoggedInProvider from '../Auth/LoggedInProvider';
import HomeButton from './HomeButton';

interface MainNavigationBarProps {
  user;
}

const NavigationBar = (props: MainNavigationBarProps): JSX.Element => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" enableColorOnDark>
        <Toolbar variant="dense">
          <HomeButton />
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
            User: {props.user ? props.user.email : 'Not signed in'}
          </Typography>
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
