import { useState } from 'react';
import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import React from 'react';
import AddQuestionModal from './AddQuestionModal';
import QuestionTableRow from './QuestionTableRow';
import '../index.css';
import { QuestionSchema } from '../../services/apiSchema';
import { deleteQuestionApi, updateQuestion } from '../../services/questions';
import { toast } from 'react-toastify';
import { QuestionTableToolbar } from './QuestionTableToolbar';
import { QuestionTableRowHeader } from './QuestionTableRowHeader';

function QuestionTable(props: {
  questionData: QuestionSchema[];
  user;
  editable: boolean;
}) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(props.questionData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'desc' });
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const editable = props.user ? props.user.email === 'admin@gmail.com' : false;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editQuestion = async (question) => {
    await updateQuestion(question.id, {
      ...question,
      categories: Object.entries(question.categories).map(([key, value]) => ({
        id: parseInt(key, 10),
        name: value
      }))
    }).then(
      () => {
        const index = data.findIndex((q) => q.id === question.id);
        const updatedData = [...data];
        updatedData[index] = question;

        setData(updatedData);

        toast('Question updated successfully', { type: 'success' });
      },
      (error) => {
        console.error('Error updating question', error);
        toast.error('Error updating question', { type: 'error' });
      }
    );
  };

  const handleSort = (key: string) => {
    // Determine new sort direction
    const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
    const newDirection = isAsc ? 'desc' : 'asc';

    // Update the sort configuration
    setSortConfig({ key, direction: newDirection });

    // Sort the data
    const sortedData = [...data].sort((a, b) => {
      if (key === 'complexity') {
        const order = ['Hard', 'Medium', 'Easy'];
        return (
          (order.indexOf(a[key]) - order.indexOf(b[key])) *
          (newDirection === 'asc' ? -1 : 1)
        );
      } else {
        if (a[key] < b[key]) {
          return newDirection === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return newDirection === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });

    // Update the data
    setData(sortedData);
  };

  const filteredData = data.filter(
    (question) =>
      selectedCategoryIds.length === 0 ||
      Object.keys(question.categories).some((key) =>
        selectedCategoryIds.includes(parseInt(key))
      )
  );

  const deleteQuestion = async (id: number) => {
    await deleteQuestionApi(id).then(
      (res) => {
        console.log('Question deleted successfully', res);
        toast('Question deleted successfully', { type: 'success' });
        setData(data.filter((question) => question.id != id));
      },
      (error) => {
        toast('Error deleting question', { type: 'error' });
        console.error('Error deleting question', error);
      }
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        width: '100vw',
        overflow: 'hidden'
      }}
    >
      <AddQuestionModal
        setData={setData}
        questions={data}
        open={addQuestionModalOpen}
        setOpen={setAddQuestionModalOpen}
      />
      <QuestionTableToolbar
        editable={editable}
        setAddQuestionModalOpen={setAddQuestionModalOpen}
        data={filteredData}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <TableContainer
        component={Paper}
        elevation={5}
        sx={{
          borderRadius: '1em',
          overflowY: 'auto'
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <QuestionTableRowHeader
            sortConfig={sortConfig}
            handleSort={handleSort}
            setSelectedCategoryIds={setSelectedCategoryIds}
            selectedCategoryIds={selectedCategoryIds}
            editable={editable}
          />
          <TableBody sx={{ overflowY: 'scroll' }}>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question) => (
                <QuestionTableRow
                  key={question.id}
                  question={question}
                  questions={data}
                  deleteQuestion={deleteQuestion}
                  editQuestion={editQuestion}
                  editable={editable}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default QuestionTable;
