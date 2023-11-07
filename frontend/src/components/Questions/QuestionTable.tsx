import { useState } from 'react';
import {
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
  Button,
  TableSortLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import AddQuestionModal from './AddQuestionModal';
import QuestionTableRow from './QuestionTableRow';
import '../index.css';
import { QuestionSchema } from '../../services/apiSchema';
import { deleteQuestionApi, createQuestion } from '../../services/questions';
import { Category } from '../../constants/enums';

function QuestionTable(props: { questionData: QuestionSchema[]; user }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(props.questionData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [categoryFilter, setCategoryFilter] = useState('');

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

  const handleSort = (key: string) => {
    const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
    setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategoryFilter(event.target.value as string);
  };

  const filteredData = data.filter(
    (question) =>
      categoryFilter === '' ||
      question.categories.some((cat) => cat.name === categoryFilter)
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
      {' '}
      <AddQuestionModal
        addQuestion={addQuestion}
        questions={data}
        open={addQuestionModalOpen}
        setOpen={setAddQuestionModalOpen}
      />
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={categoryFilter}
            label="Category"
            onChange={handleCategoryChange}
            renderValue={(selected) => {
              if (selected === '') {
                return <em>None</em>;
              }
              return selected;
            }}
          >
            <MenuItem value="">All</MenuItem>
            {Object.values(Category).map((categoryName) => (
              <MenuItem key={categoryName} value={categoryName}>
                {categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            flexShrink: 0
          }}
        />
      </Toolbar>
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
          <TableHead>
            <TableRow>
              <TableCell width="10%">
                <Typography variant="subtitle1" noWrap align="center">
                  Id
                </Typography>
              </TableCell>
              <TableCell width="30%">
                <TableSortLabel
                  active={sortConfig.key === 'title'}
                  direction={
                    sortConfig.key === 'title' ? sortConfig.direction : 'asc'
                  }
                  onClick={() => handleSort('title')}
                >
                  <Typography variant="subtitle1" noWrap>
                    Title
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell width="25%">
                <TableSortLabel
                  active={sortConfig.key === 'categories'}
                  direction={
                    sortConfig.key === 'categories'
                      ? sortConfig.direction
                      : 'asc'
                  }
                  onClick={() => handleSort('categories')}
                >
                  <Typography variant="subtitle1" noWrap>
                    Categories
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell width="15%">
                <TableSortLabel
                  active={sortConfig.key === 'complexity'}
                  direction={
                    sortConfig.key === 'complexity'
                      ? sortConfig.direction
                      : 'asc'
                  }
                  onClick={() => handleSort('complexity')}
                >
                  <Typography variant="subtitle1" noWrap>
                    Complexity
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell width="20%"></TableCell>
            </TableRow>
          </TableHead>
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
