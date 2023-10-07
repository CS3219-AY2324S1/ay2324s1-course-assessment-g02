import { Box, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <div>
        <CssBaseline />
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
