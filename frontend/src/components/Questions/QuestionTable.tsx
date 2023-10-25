import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Toolbar,
  Tooltip,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import AddQuestionModal from './AddQuestionModal';
import QuestionTableRow from './QuestionTableRow';
import '../index.css';
import { QuestionSchema } from '../../services/apiSchema';
import { deleteQuestionApi, createQuestion } from '../../services/questions';

function QuestionTable(props: { questionData: QuestionSchema[]; user }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(props.questionData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const addQuestion = async (question: QuestionSchema) => {
    await createQuestion(question).then(
      (res) => {
        question.id = res.data.question.id;
        console.log('Question created succesfully', res);
        setData([...data, question]);
      },
      (error) => {
        console.error('Error creating question', error);
      }
    );
  };

  const deleteQuestion = async (id: number) => {
    await deleteQuestionApi(id).then(
      (res) => {
        console.log('Question deleted successfully', res);
        setData(data.filter((question) => question.id != id));
      },
      (error) => {
        console.error('Error deleting question', error);
      }
    );
  };

  return (
    <Paper elevation={2} className="full-screen-paper">
      <AddQuestionModal
        addQuestion={addQuestion}
        questions={data}
        open={addQuestionModalOpen}
        setOpen={setAddQuestionModalOpen}
      />
      <Toolbar>
        <Tooltip title="Add Question">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            disabled={
              props.user ? props.user.email !== 'admin@gmail.com' : true
            }
            onClick={() => setAddQuestionModalOpen(true)}
          >
            Add Question
          </Button>
        </Tooltip>
      </Toolbar>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer component={Paper}>
        {' '}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant="subtitle1">Title</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Categories</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Complexity</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question) => {
                return (
                  <QuestionTableRow
                    question={question}
                    deleteQuestion={deleteQuestion}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default QuestionTable;
