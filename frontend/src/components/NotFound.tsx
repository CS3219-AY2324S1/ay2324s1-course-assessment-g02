import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box>
      <h1>404 Not Found</h1>
      <p>The page you're looking for could not be found.</p>
      <Link to="/">Go back home</Link>
    </Box>
  );
}

export default NotFound;
