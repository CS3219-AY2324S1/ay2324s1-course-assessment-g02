import { Grid, Box, Typography } from '@mui/material';
import { QuestionsPageButton } from '../components/Buttons/QuestionsPageButton';
import { MatchPageButton } from '../components/Buttons/MatchPageButton';
import MatchModal from '../components/Match/MatchModal';
import { useState, useMemo } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { getListRandomEmojis } from '../constants/themes';
import useUserData from '../hooks/useUserData';
import GetUserIdProvider from '../components/Auth/GetUserIdProvider';
import Loading from '../components/Loading';
import { AuthPageButton } from '../components/Buttons/AuthPageButton';

const HomePageComponents = () => {
  const { user } = useAuth();
  console.log(user);
  return user ? (
    <GetUserIdProvider id={user.id}>
      {(userId) => <AuthHomePageComponents userId={userId} user={user} />}
    </GetUserIdProvider>
  ) : (
    <UnAuthHomePageComponents />
  );
};

const UnAuthHomePageComponents = () => {
  const emojis = useMemo(() => getListRandomEmojis(2), []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h2">Welcome to PeerPrep</Typography>
        </Grid>
        <Grid>
          <Typography variant="h4">
            {`${emojis[0]} Candy crush your interview! ${emojis[1]}`}
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
            <AuthPageButton />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const AuthHomePageComponents = (props: { userId; user }) => {
  const emojis = useMemo(() => getListRandomEmojis(2), []);

  const [open, setOpen] = useState<boolean>(false);
  const { user, isLoading } = useUserData({ id: props.userId });
  const navigate = useNavigate();

  const handleOpen = () => {
    if (props.user) {
      setOpen(true);
    } else {
      console.log('User is not logged in');
      navigate('/auth');
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <MatchModal
        user={user}
        sessionUser={props.user}
        open={open}
        setOpen={setOpen}
      />
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h2">Welcome to PeerPrep</Typography>
        </Grid>
        <Grid>
          <Typography variant="h4">
            {`${emojis[0]} Candy crush your interview! ${emojis[1]}`}
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
    </>
  );
};

function HomePage() {
  return (
    <Box
      display="flex"
      height={'100vh'}
      width={'100vw'}
      alignItems="center"
      justifyContent="center"
    >
      <HomePageComponents />
    </Box>
  );
}

export default HomePage;
