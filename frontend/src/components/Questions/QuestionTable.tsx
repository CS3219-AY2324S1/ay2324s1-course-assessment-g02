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

function QuestionTable(props: { questionData: QuestionSchema[]; user }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(props.questionData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

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
    const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
    setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });

    const sortedData = [...data].sort((a, b) => {
      if (key === 'complexity') {
        const order = ['Easy', 'Medium', 'Hard'];
        return (
          (order.indexOf(a[key]) - order.indexOf(b[key])) * (isAsc ? 1 : -1)
        );
      } else {
        if (a[key] < b[key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
    });
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
        setData(data.filter((question) => question.id != id));
      },
      (error) => {
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
        user={props.user}
        setAddQuestionModalOpen={setAddQuestionModalOpen}
        data={data}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <QuestionTableRowHeader
        sortConfig={sortConfig}
        handleSort={handleSort}
        setSelectedCategoryIds={setSelectedCategoryIds}
        selectedCategoryIds={selectedCategoryIds}
      />
      <TableContainer
        component={Paper}
        elevation={5}
        sx={{
          borderRadius: '1em',
          flexGrow: 1,
          overflowY: 'auto'
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableBody
            sx={{
              overflowY: 'scroll'
            }}
          >
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question) => {
                return (
                  <QuestionTableRow
                    question={question}
                    questions={data}
                    deleteQuestion={deleteQuestion}
                    editQuestion={editQuestion}
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
