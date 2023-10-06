import { Browser } from 'react-kawaii';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

const HomeButton = (): JSX.Element => {
  const navigate = useNavigate();
  const iconMood = [
    'sad',
    'shocked',
    'happy',
    'blissful',
    'lovestruck',
    'excited',
    'ko'
  ];

  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2, mb: -0.5 }}
      onClick={() => navigate('/')}
    >
      <Browser
        size={24}
        mood={iconMood[Math.floor(Math.random() * 7)]}
        color="#fccb7e"
      />
    </IconButton>
  );
};

export default HomeButton;
