import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const AuthPageButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/auth')}
    >
      <Typography>Sign In Now!</Typography>
    </Button>
  );
};
