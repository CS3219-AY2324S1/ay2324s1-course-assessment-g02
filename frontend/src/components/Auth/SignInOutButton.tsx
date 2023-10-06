import Button from '@mui/material/Button';
import { supabase } from '../../main';
import { useNavigate } from 'react-router-dom';

const SignInOutButton = (props: { user }): JSX.Element => {
  const navigate = useNavigate();
  if (props.user) {
    return (
      <Button
        color="inherit"
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        Sign Out
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
        Sign in
      </Button>
    );
  }
};

export default SignInOutButton;
