import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';

import { Button, Toolbar, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import AddQuestionModal from './AddQuestionModal';
import QuestionTableRow from './QuestionTableRow';
import '../index.css';
import { QuestionSchema } from '../../constants/api/apiSchema';
import {
  deleteQuestionApi,
  createQuestion
} from '../../constants/api/questionsApi';

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
            disabled={props.user ? props.user.email != 'admin@gmail.com' : true}
            onClick={() => setAddQuestionModalOpen(true)}
          >
            {'Add Question'}
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
    </Paper>
  );
}

export default QuestionTable;