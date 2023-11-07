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
  Toolbar
} from '@mui/material';
import React from 'react';
import '../index.css';
import UserHistoryTableRow from './UserHistoryTableRow';
import { AttemptedQuestionSchema } from '../../services/apiSchema';

function UserHistoryTable(props: {
  id: number;
  userAttemptedQuestions: AttemptedQuestionSchema[];
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const data: AttemptedQuestionSchema[] = props.userAttemptedQuestions;

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
    <Paper elevation={3} sx={{ height: '100%', width: '100%', mb: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Toolbar>
      <TableContainer
        component={Paper}
        elevation={5}
        sx={{
          borderRadius: '1em',
          height: '100%',
          overflow: 'auto'
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1">Completed At</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Question Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Candy Buddy</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Language</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">Difficulty</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              overflowY: 'scroll'
            }}
          >
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
