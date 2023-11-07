import React from 'react';
import {
  TableRow,
  TableCell,
  Stack,
  Chip,
  Button,
  Typography
} from '@mui/material';
import { complexityColorMap } from '../../constants/themes';
import { QuestionSchema } from '../../services/apiSchema';
import QuestionModal from './QuestionModal';

function QuestionTableRow(props: {
  question: QuestionSchema;
  deleteQuestion: (id: number) => void;
}) {
  const { question, deleteQuestion } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <QuestionModal question={question} open={open} setOpen={setOpen} />
      <TableRow
        hover
        sx={{
          '& > *': { borderBottom: 'unset' },
          '&:hover': { backgroundColor: '#f5f5f5', borderRadius: '4px' }
        }}
        role="checkbox"
        tabIndex={-1}
        key={question.id}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <Typography align="center">{question.id}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{question.title}</Typography>
        </TableCell>
        <TableCell>
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'wrap', gap: '4px' }}
          >
            {question.categories.map((category) => (
              <Chip
                key={category.name}
                label={category.name}
                variant="outlined"
                sx={{ borderRadius: '12px', marginBottom: '4px' }}
              />
            ))}
          </Stack>
        </TableCell>
        <TableCell>
          <Chip
            label={question.complexity}
            variant="outlined"
            color={complexityColorMap.get(question.complexity)}
            sx={{ borderRadius: '12px' }}
          />
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            sx={{ borderRadius: '12px' }}
            onClick={(e) => {
              e.stopPropagation();
              deleteQuestion(question.id);
            }}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default QuestionTableRow;
