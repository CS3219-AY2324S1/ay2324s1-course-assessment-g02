import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserButton = (props: { user }): JSX.Element => {
  const navigate = useNavigate();

  if (props.user) {
    return (
      <Button
        color="inherit"
        onClick={() => {
          navigate('/user');
        }}
      >
        <Typography
          display="flex"
          variant="h6"
          sx={{ marginLeft: 'auto', my: 2, textTransform: 'none' }}
        >
          User: {props.user.email}
        </Typography>
      </Button>
    );
  } else {
    return (
      <Button
        color="inherit"
        onClick={() => {
          navigate('/auth');
        }}
      >
        <Typography
          display="flex"
          variant="button"
          sx={{ marginLeft: 'auto', my: 2, textTransform: 'none' }}
        >
          Not signed in
        </Typography>
      </Button>
    );
  }
};

export default UserButton;
