import { Grid, Box, Typography } from '@mui/material';
import { QuestionsPageButton } from '../components/Buttons/QuestionsPageButton';
import { MatchPageButton } from '../components/Buttons/MatchPageButton';
import MatchModal from '../components/Match/MatchModal';
import { useState } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { getRandomCandyEmoji } from '../constants/themes';

function HomePage() {
  const { user } = useAuth();

  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const handleOpen = () => {
    if (user) {
      setOpen(true);
    } else {
      console.log('User is not logged in');
      navigate('/auth');
    }
  };
  return (
    <Box
      display="flex"
      height={'100vh'}
      width={'100vw'}
      alignItems="center"
      justifyContent="center"
    >
      <MatchModal open={open} setOpen={setOpen} />
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h1">Welcome to PeerPrep</Typography>
        </Grid>
        <Grid>
          <Typography variant="h3">
            {`${getRandomCandyEmoji()} Candy crush your interview! ${getRandomCandyEmoji()}`}
          </Typography>
        </Grid>
        <Grid item></Grid>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs="auto">
            <QuestionsPageButton />
          </Grid>
          <Grid item xs="auto">
            <MatchPageButton setOpen={handleOpen} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
