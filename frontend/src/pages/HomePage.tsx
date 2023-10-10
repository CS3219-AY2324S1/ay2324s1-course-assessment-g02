import { Grid, Box, Typography } from '@mui/material';
import { QuestionsPageButton } from '../components/Buttons/QuestionsPageButton';
import { ProblemsPageButton } from '../components/Buttons/ProblemsPageButton';

function HomePage() {
  return (
    <Box
      display="flex"
      height={'100vh'}
      width={'100vw'}
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h1">Welcome to PeerPrep!</Typography>
        </Grid>
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs="auto">
            <ProblemsPageButton />
          </Grid>
          <Grid item xs="auto">
            <QuestionsPageButton />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
