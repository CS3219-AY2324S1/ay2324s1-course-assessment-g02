import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const QuestionsPageButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/questions')}
    >
      <Typography>Questions Page</Typography>
    </Button>
  );
};
