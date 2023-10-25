import { Chip, Divider, Stack, Typography, Box } from '@mui/material';
import {
  Category,
  Complexity,
  Question,
  dummyQuestion
} from '../../interfaces/question';

const ProblemDescription = () => {
  const question: Question = dummyQuestion;

  const complexityColorMap = new Map<
    Complexity,
    'success' | 'warning' | 'error'
  >([
    [Complexity.Easy, 'success'],
    [Complexity.Medium, 'warning'],
    [Complexity.Hard, 'error']
  ]);

  return (
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
          {question.categories.map((category: Category) => (
            <Chip label={category} size="small" sx={{ alignSelf: 'center' }} />
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
  );
};

export default ProblemDescription;
