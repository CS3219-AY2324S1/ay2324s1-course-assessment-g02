import { Chip, Divider, Paper, Typography, Box, Grid } from '@mui/material';
import { Complexity } from '../../interfaces/question';
import useQuestion from '../../hooks/useQuestion';
import Loading from '../Loading';
import { styled } from '@mui/material/styles';

interface ProblemDescriptionProps {
  questionId: number;
}

const ProblemDescription = (props: ProblemDescriptionProps) => {
  const { question, isLoading } = useQuestion(props.questionId);

  const complexityColorMap = new Map<
    Complexity,
    'success' | 'warning' | 'error'
  >([
    [Complexity.Easy, 'success'],
    [Complexity.Medium, 'warning'],
    [Complexity.Hard, 'error']
  ]);

  const StyledDescription = styled('p')({
    overflowWrap: 'break-word',
    width: '100%',
    '& img': {
      maxWidth: '100%',
      height: 'auto'
    }
  });

  return isLoading ? (
    <Loading />
  ) : (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
        borderRadius: '1em',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      <Paper elevation={3} sx={{ p: '1em' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom component="div">
              {question.title}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item>
                <Chip
                  label={question.complexity}
                  variant="outlined"
                  color={complexityColorMap.get(question.complexity)}
                />
              </Grid>
              {question.categories.map((category: string) => (
                <Grid item>
                  <Chip
                    label={category}
                    size="small"
                    sx={{ alignSelf: 'center' }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <StyledDescription
              dangerouslySetInnerHTML={{
                __html: question.description
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProblemDescription;
