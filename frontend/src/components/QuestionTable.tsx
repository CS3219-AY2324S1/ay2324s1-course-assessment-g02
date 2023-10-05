import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Toolbar, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import AddQuestionModal from './AddQuestionModal';
import QuestionTableRow from './QuestionTableRow';
import { Auth } from '@supabase/auth-ui-react';
import './index.css';
import { QuestionSchema } from '../constants/api/apiSchema';
import { Question } from '../constants/models';
import { useQuery } from 'react-query';
import {
  deleteQuestionApi,
  createQuestion
} from '../constants/api/questionsApi';

function QuestionTable(props: { questionData: QuestionSchema[] }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(props.questionData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const { user } = Auth.useUser();

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
    console.log(question);
    try {
      const response = await createQuestion(question);
      console.log('Question created successfully', response);
      setData([...data, question]);
    } catch (error) {
      console.error('Error creating question', error);
    }
  };

  const deleteQuestion = async (id: number) => {
    try {
      const response = await deleteQuestionApi(id);
      console.log('Question deleted successfully', response);
      setData(data.filter((question) => question.id != id));
    } catch (error) {
      console.error('Error deleting question', error);
    }
  };
  return (
    <>
      <Paper className="full-screen-paper">
        <AddQuestionModal
          addQuestion={addQuestion}
          questions={data}
          open={addQuestionModalOpen}
          setOpen={setAddQuestionModalOpen}
        />
        <Toolbar>
          <Tooltip title="Add Question">
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              disabled={user ? user.email != 'admin@gmail.com' : true}
              onClick={() => setAddQuestionModalOpen(true)}
            >
              {'Add Question'}
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
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default QuestionTable;
