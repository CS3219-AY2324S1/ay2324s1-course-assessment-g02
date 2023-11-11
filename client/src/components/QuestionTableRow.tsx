import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import {
  TableRow,
  TableCell,
  IconButton,
  Stack,
  Chip,
  Button,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Question } from "../api/questions";
import EditIcon from "@mui/icons-material/Edit";
import EditQuestionModal from "./EditQuestionModal";

function QuestionTableRow(props: {
  question: Question;
  questions: Question[];
  deleteQuestion: (questionId: string) => void;
  updateQuestion: (question: Question) => void;
}) {
  const {
    question,
    questions,
    deleteQuestion,
    updateQuestion,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [ editQuestionModalOpen, setEditQuestionModalOpen ] = React.useState(false);
  return (
    <React.Fragment>
      <EditQuestionModal
        updateQuestion={updateQuestion}
        open={editQuestionModalOpen}
        setOpen={setEditQuestionModalOpen}
        question={question}
        questions={questions}
      />
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={question._id}
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
              <Chip label={category} />
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
              deleteQuestion(question._id || "");
            }}
          >
            Delete
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setEditQuestionModalOpen(true);
              updateQuestion(question);
            }}
          >
            <EditIcon />
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
                    __html: question.description.replace(/\n/g, "<br />"),
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
