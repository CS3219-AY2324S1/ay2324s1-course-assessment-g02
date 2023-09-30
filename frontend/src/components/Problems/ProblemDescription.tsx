import { Stack, Typography } from '@mui/material';
import { Question, dummyQuestion } from '../../interfaces/question';

const ProblemDescription = () => {
  const question: Question = dummyQuestion;
  return (
    <>
      <Stack>
        <Typography variant="h5" gutterBottom component="div">
          Description
        </Typography>
        <p
          dangerouslySetInnerHTML={{
            __html: question.description
          }}
        />
      </Stack>
    </>
  );
};

export default ProblemDescription;
