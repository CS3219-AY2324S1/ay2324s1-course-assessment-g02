import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Toolbar, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import AddQuestionModal from "./AddQuestionModal";
import QuestionTableRow from "./QuestionTableRow";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  updateQuestion as updateQuestionApi,
} from "../api/questions";
import { Question } from "../api/questions";

function QuestionTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [questionData, setQuestionData] = useState<Question[]>([]);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addQuestion = (question: Question): void => {
    createQuestion(question).then((qn) => {
      setQuestionData((data) => [...data, qn]);
    });
  };

  const deleteQuestionId = (id: string): void => {
    for (const qn of questionData) {
      if (qn._id === id) {
        deleteQuestion(qn);
        break;
      }
    }
    setQuestionData((qns) => qns.filter((qn) => qn._id !== id));
  };

  const updateQuestion = (question: Question) => {
    updateQuestionApi(question);
    setQuestionData((qnData) =>
      qnData.map((qn) => (qn._id === question._id ? question : qn))
    );
  };

  useEffect(() => {
    getAllQuestions()
      .then((questions) => {
        console.log(questions);
        setQuestionData(questions);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Paper sx={{ padding: "0 5%", overflow: "hidden" }}>
      <AddQuestionModal
        addQuestion={addQuestion}
        questions={questionData}
        open={addQuestionModalOpen}
        setOpen={setAddQuestionModalOpen}
      />
      <Toolbar>
        <Tooltip title="Add Question">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setAddQuestionModalOpen(true)}
          >
            {"Add Question"}
          </Button>
        </Tooltip>
      </Toolbar>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Complexity</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {questionData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question) => {
                return (
                  <QuestionTableRow
                    question={question}
                    deleteQuestion={deleteQuestionId}
                    questions={questionData}
                    updateQuestion={updateQuestion}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={questionData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default QuestionTable;
