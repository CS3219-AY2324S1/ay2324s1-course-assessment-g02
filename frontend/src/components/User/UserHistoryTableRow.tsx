import { useState } from 'react';
import { TableRow, TableCell, Chip, Typography, Button } from '@mui/material';
import { AttemptedQuestionSchema } from '../../services/apiSchema';
import { complexityColorMap } from '../../constants/themes';
import HistoryQuestionModal from './HistoryQuestionModal';
import { formatDateAndTime } from '../../constants/formatDate';
import { Link } from 'react-router-dom';

function UserHistoryTableRow(props: {
  attemptedQuestion: AttemptedQuestionSchema;
  id: number;
}) {
  const attempt = props.attemptedQuestion;

  const [open, setOpen] = useState(false);
  const candyBuddy =
    attempt.user1.id == props.id ? attempt.user2 : attempt.user1;
  const candyBuddyName = candyBuddy.isDeleted
    ? 'Deleted'
    : candyBuddy.username
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
        <TableCell width="15%">
          <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
            {formatDateAndTime(new Date(attempt.completedAt))}
          </Typography>
        </TableCell>
        <TableCell width="35%" sx={{}}>
          <Typography
            variant="body2"
            sx={{
              wordWrap: 'break-word'
            }}
          >
            {attempt.question.title}
          </Typography>
        </TableCell>
        <TableCell width="20%">
          <Button
            component={Link}
            to={`/user/${candyBuddy.id}`}
            variant="outlined"
            disabled={candyBuddy.isDeleted}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              fontSize: '0.875rem',
              maxWidth: '100%',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              textAlign: 'left'
            }}
          >
            <Typography variant="body2">{candyBuddyName}</Typography>
          </Button>
        </TableCell>
        <TableCell
          width="15%"
          sx={{
            maxWidth: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Chip
            label={attempt.language}
            variant="outlined"
            sx={{
              borderRadius: '12px',
              maxWidth: '100%',
              whiteSpace: 'normal',
              textAlign: 'left'
            }}
          />
        </TableCell>
        <TableCell
          width="15%"
          sx={{
            maxWidth: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          <Chip
            label={attempt.question.complexity}
            variant="outlined"
            color={complexityColorMap.get(attempt.question.complexity)}
            sx={{
              borderRadius: '12px',
              maxWidth: '100%',
              whiteSpace: 'normal',
              textAlign: 'left'
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

export default UserHistoryTableRow;
