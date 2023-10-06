import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
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
import React from 'react';
import { QuestionSchema } from '../../constants/api/apiSchema';

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
        <TableCell>{question.title}</TableCell>
        <TableCell>
          <Stack direction="row" spacing={1}>
            {question.categories.map((category) => (
              <Chip label={category.name} />
            ))}
          </Stack>
        </TableCell>
        <TableCell>
          <Chip label={question.complexity} />
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            color="error"
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Stack>
                <Typography variant="h6" gutterBottom component="div">
                  Description
                </Typography>
                <p
                  dangerouslySetInnerHTML={{
                    __html: question.body.replace(/\n/g, '<br />')
                  }}
                />
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default QuestionTableRow;