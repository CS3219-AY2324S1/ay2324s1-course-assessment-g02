import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Toolbar
} from '@mui/material';
import React from 'react';
import '../index.css';
import UserHistoryTableRow from './UserHistoryTableRow';
import { AttemptedQuestionSchema } from '../../services/apiSchema';
import { UserHistoryTableRowHeader } from './UserHistoryTableRowHeader';

function UserHistoryTable(props: {
  id: number;
  userAttemptedQuestions: AttemptedQuestionSchema[];
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState(props.userAttemptedQuestions);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  const handleSort = (key) => {
    const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
    setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });

    const sortedData = [...data].sort((a, b) => {
      let valueA, valueB;
      const candyBuddyA = a.user1.id === props.id ? a.user2 : a.user1;
      const candyBuddyB = b.user1.id === props.id ? b.user2 : b.user1;
      const order = ['Easy', 'Medium', 'Hard'];

      switch (key) {
        case 'completedAt':
          valueA = new Date(a.completedAt);
          valueB = new Date(b.completedAt);
          break;
        case 'questionTitle':
          valueA = a.question.title.toLowerCase();
          valueB = b.question.title.toLowerCase();
          break;
        case 'candyBuddy':
          valueA = candyBuddyA.username
            ? candyBuddyA.username
            : candyBuddyA.email;
          valueB = candyBuddyB.username
            ? candyBuddyB.username
            : candyBuddyB.email;
          break;
        case 'language':
          valueA = a.language.toLowerCase();
          valueB = b.language.toLowerCase();
          break;
        case 'difficulty':
          return (
            (order.indexOf(a.question.complexity) -
              order.indexOf(b.question.complexity)) *
            (isAsc ? 1 : -1)
          );
        default:
          return 0;
      }

      if (valueA < valueB) {
        return isAsc ? -1 : 1;
      }
      if (valueA > valueB) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={3} sx={{ height: '50%', borderRadius: '12px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Toolbar>
      <TableContainer
        component={Paper}
        elevation={5}
        sx={{
          borderRadius: '1em',
          overflowY: 'auto',
          height: '55vh',
          width: '100%'
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          width="100%"
          sx={{ tableLayout: 'fixed' }}
        >
          <UserHistoryTableRowHeader
            handleSort={handleSort}
            sortConfig={sortConfig}
          />
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((question) => {
                return (
                  <UserHistoryTableRow
                    attemptedQuestion={question}
                    id={props.id}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default UserHistoryTable;
