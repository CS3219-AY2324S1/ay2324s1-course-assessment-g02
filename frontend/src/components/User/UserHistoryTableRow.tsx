import { useState } from 'react';
import { TableRow, TableCell, Chip, Typography } from '@mui/material';
import { AttemptedQuestionSchema } from '../../services/apiSchema';
import { complexityColorMap } from '../../constants/themes';
import HistoryQuestionModal from './HistoryQuestionModal';
import { formatDateAndTime } from '../../constants/formatDate';

function UserHistoryTableRow(props: {
  attemptedQuestion: AttemptedQuestionSchema;
  id: number;
}) {
  const attempt = props.attemptedQuestion;

  const [open, setOpen] = useState(false);

  const candyBuddy =
    attempt.user1.id === props.id ? attempt.user2 : attempt.user1;

  const candyBuddyName = candyBuddy.username
    ? candyBuddy.username
    : candyBuddy.email;

  return (
    <>
      <HistoryQuestionModal question={attempt} open={open} setOpen={setOpen} />
      <TableRow
        hover
        sx={{
          '& > *': { borderBottom: 'unset' },
          '&:hover': { backgroundColor: '#f5f5f5', borderRadius: '4px' }
        }}
        role="checkbox"
        tabIndex={-1}
        key={attempt.id}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <Typography align="center">
            {formatDateAndTime(new Date(attempt.completedAt))}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{attempt.question.title}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{candyBuddyName}</Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={attempt.language}
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          />
        </TableCell>
        <TableCell>
          <Chip
            label={attempt.question.complexity}
            variant="outlined"
            color={complexityColorMap.get(attempt.question.complexity)}
            sx={{ borderRadius: '12px' }}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

export default UserHistoryTableRow;
