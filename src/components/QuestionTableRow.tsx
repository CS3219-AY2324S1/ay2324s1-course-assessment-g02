import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { TableRow, TableCell, IconButton, Stack, Chip, Button, Collapse, Box, Typography } from "@mui/material";
import React from "react";
import { Question } from "./QuestionTable";

function QuestionTableRow(props: {
    question: Question;
    deleteQuestion: (questionId: number) => void;
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
              onClick={() => deleteQuestion(question.id || -1)}
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
                  <div>
                    Leetcode Link: <a href={question.link}>{question.link}</a>
                  </div>
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