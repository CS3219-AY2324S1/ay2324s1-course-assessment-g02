import { Chip, Divider, Stack, Typography, Box, Paper } from '@mui/material';
import { Complexity } from '../../interfaces/question';
import useQuestion from '../../hooks/useQuestion';
import Loading from '../Loading';

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

  return isLoading ? (
    <Loading />
  ) : (
    <Paper elevation={3} sx={{ borderRadius: '1em', padding: '1em' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Stack spacing={1}>
          <Typography variant="h6" gutterBottom component="div">
            {question.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label={question.complexity}
              variant="outlined"
              color={complexityColorMap.get(question.complexity)}
            />
            {question.categories.map((category: string) => (
              <Chip
                label={category}
                size="small"
                sx={{ alignSelf: 'center' }}
              />
            ))}
          </Stack>
          <Divider />
          <p
            dangerouslySetInnerHTML={{
              __html: question.description
            }}
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProblemDescription;
