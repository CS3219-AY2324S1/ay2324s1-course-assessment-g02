import { IconButton } from '@mui/material';
import { supabase } from '../../main';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const SignInOutButton = (props: { user }): JSX.Element => {
  const navigate = useNavigate();
  if (props.user) {
    return (
      <IconButton
        color="inherit"
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        <LogoutIcon />
      </IconButton>
    );
  } else {
    return (
      <IconButton
        color="inherit"
        onClick={() => {
          navigate('/auth');
        }}
      >
        <LoginIcon />
      </IconButton>
    );
  }
};

export default SignInOutButton;
