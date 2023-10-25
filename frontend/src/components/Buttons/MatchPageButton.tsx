import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const MatchPageButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/match')}
    >
      <Typography>Go to Match Page</Typography>
    </Button>
  );
};
