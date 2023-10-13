import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ProblemsPageButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/problems')}
    >
      <Typography>Go to Problems Page</Typography>
    </Button>
  );
};
