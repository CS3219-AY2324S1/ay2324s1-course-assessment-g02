import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import MainNavigationBar from '../components/Navbar/MainNavigationBar';
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink } from 'react-router-dom';

function HomePage() {
  const { user } = Auth.useUser();
  const [isLoggedIn] = useState(true); // You can set this state based on your authentication logic
  return (
    <>
      <div>
        <CssBaseline />
        <MainNavigationBar isLoggedIn={isLoggedIn} />
        <Box
          display="flex"
          height={'100vh'}
          width={'100vw'}
          alignItems="center"
          justifyContent="center"
        >
          <div>
            <Typography variant="h1">Welcome to PeerPrep!</Typography>
            <br />
            <NavLink to="/problems">Go to Problems Page</NavLink>
            <br />
            <NavLink to="/questions">Go to Questions Page</NavLink>
          </div>
        </Box>
      </div>
    </>
  );
}

export default HomePage;
