import Playground from '../../components/Problems/Playground';
import { Stack, Box, Paper } from '@mui/material';
import ProblemDescription from '../../components/Problems/ProblemDescription';
import { useEffect } from 'react';

const ProblemPage = () => {
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.style.overflow = 'hidden';
  }, []);

  return (
    <Box>
      <Stack direction="row">
        <Paper
          elevation={5}
          sx={{
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            overflowY: 'scroll',
            padding: '1em',
            margin: '0.2em 0.25em 0.25em 0.5em'
          }}
        >
          <ProblemDescription />
        </Paper>
        <Paper
          elevation={5}
          sx={{
            minWidth: '50%',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            overflowY: 'scroll',
            padding: '1em',
            margin: '0.2em 0.5em 0.25em 0.25em'
          }}
        >
          <Playground />
        </Paper>
      </Stack>
    </Box>
  );
};

export default ProblemPage;
