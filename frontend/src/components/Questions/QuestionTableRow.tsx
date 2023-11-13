import { useState } from 'react';
import {
  TableRow,
  TableCell,
  Stack,
  Chip,
  IconButton,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { complexityColorMap } from '../../constants/themes';
import { QuestionSchema } from '../../services/apiSchema';
import QuestionModal from './QuestionModal';
import EditQuestionModal from './EditQuestionModal';

function QuestionTableRow(props: {
  question: QuestionSchema;
  questions: QuestionSchema[];
  deleteQuestion: (id: number) => void;
  editQuestion: (question: QuestionSchema) => void;
}) {
  const { question, questions, deleteQuestion, editQuestion } = props;
  const [openQuestiomModal, setOpenQuestiomModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <QuestionModal
        question={question}
        open={openQuestiomModal}
        setOpen={setOpenQuestiomModal}
      />
      <EditQuestionModal
        question={question}
        editQuestion={editQuestion}
        questions={questions}
        open={openEditModal}
        setOpen={setOpenEditModal}
      />

      <TableRow
        hover
        sx={{
          '& > *': { borderBottom: 'unset' },
          '&:hover': { backgroundColor: '#f5f5f5', borderRadius: '4px' }
        }}
        role="checkbox"
        tabIndex={-1}
        key={question.id}
        onClick={() => setOpenQuestiomModal(!openQuestiomModal)}
      >
        <TableCell width="5%">
          <Typography align="center">{question.id}</Typography>
        </TableCell>
        <TableCell width="25%">
          <Typography variant="body2" style={{ wordWrap: 'break-word' }}>
            {question.title}
          </Typography>
        </TableCell>
        <TableCell width="40%">
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: 'wrap', gap: '4px' }}
          >
            {Object.entries(question.categories).map(([id, name]) => (
              <Chip
                key={id}
                label={name}
                variant="outlined"
                sx={{ borderRadius: '12px', marginBottom: '4px' }}
              />
            ))}
          </Stack>
        </TableCell>
        <TableCell width="20%">
          <Chip
            label={question.complexity}
            variant="outlined"
            color={complexityColorMap.get(question.complexity)}
            sx={{ borderRadius: '12px' }}
          />
        </TableCell>
        <TableCell align="center" width="10%">
          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                setOpenEditModal(true);
              }}
            >
              <EditIcon sx={{ color: '#ff84cf' }} />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteQuestion(question.id);
              }}
            >
              <DeleteIcon sx={{ color: 'red' }} />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
}

export default QuestionTableRow;
