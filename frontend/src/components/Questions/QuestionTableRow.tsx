import React from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Stack,
  Chip,
  Button,
  Collapse,
  Box,
  Typography
} from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { QuestionSchema } from '../../services/apiSchema';

function QuestionTableRow(props: {
  question: QuestionSchema;
  deleteQuestion: (id: number) => void;
}) {
  const { question, deleteQuestion } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
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
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{question.title}</Typography>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={1}>
            {question.categories.map((category) => (
              <Chip
                label={category.name}
                variant="outlined"
                sx={{ borderRadius: '12px' }}
              />
            ))}
          </Stack>
        </TableCell>
        <TableCell>
          <Chip
            label={question.complexity}
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          />
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            color="error"
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ borderRadius: '4px', backgroundColor: '#f5f5f5' }}
          >
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <p
                dangerouslySetInnerHTML={{
                  __html: question.body.replace(/\n/g, '<br />')
                }}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default QuestionTableRow;
