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
import './QuestionTable.css';
import { fetchQuestions } from '../api';
import { useQuery } from 'react-query';
import { QuestionMark } from '@mui/icons-material';

export interface Question {
  id?: number;
  title: string;
  categories: string[];
  complexity: 'Easy' | 'Medium' | 'Hard';
  link: string;
  description: string;
}

const dummyQuestionData: Question[] = [
  {
    id: 0,
    title: 'Reverse a String',
    categories: ['Strings', 'Algorithms'],
    complexity: 'Easy',
    link: 'https://leetcode.com/problems/reverse-string/',
    description:
      'Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.' +
      'Example 1:\n' +
      'Input: s = ["h","e","l","l","o"] Output: ["o","l","l","e","h"] Example 2:\n' +
      'Input: s = ["H","a","n","n","a","h"] Output: ["h","a","n","n","a","H"]\n' +
      'Constraints:\n' +
      '1 <= s.length <= 105\n' +
      's[i] is a printable ascii character.'
  },
  {
    id: 1,
    title: 'Linked List Cycle Detection',
    categories: ['Data Structures', 'Algorithms'],
    complexity: 'Easy',
    link: 'https://leetcode.com/problems/linked-list-cycle/',
    description: 'idk lol'
  }
];

function QuestionTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [questionData, setQuestionData] = useState(getLocalStorageQuestions());
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const { user } = Auth.useUser();

  const { data, error, isError } = useQuery('questions', () =>
    fetch('http://localhost:3000/questions').then((res) => res.json())
  );
  // return <>{data}</>;
  return (
    <>
      <ul>
        {data.map((question) => (
          <li key={question.id}>{question.id} </li>
        ))}
      </ul>
    </>
  );
  if (isLoading) {
    return <>Questions Loading</>;
  }
  if (isError) {
    return <div>Error! {(error as Error).message}</div>;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function addQuestion(question: Question): void {
    question.id =
      questionData.length > 0
        ? (questionData[questionData.length - 1].id || 0) + 1
        : 0;
    setQuestionData((qns) => {
      updateLocalStorage([...qns, question]);
      return [...qns, question];
    });
  }

  function deleteQuestion(questionId: number): void {
    console.log('delete question: ' + questionId);
    if (user && user.email == 'admin@gmail.com') {
      console.log(questionData);
      setQuestionData(questionData.filter((x) => x.id !== questionId));
      updateLocalStorage(questionData.filter((x) => x.id !== questionId));
    } else {
      // TODO: prettier UI here
      console.log('not admin, cannot delete');
    }
  }

  function updateLocalStorage(questions: Question[]): void {
    localStorage.setItem('questions', JSON.stringify(questions));
  }

  function getLocalStorageQuestions(): Question[] {
    return JSON.parse(localStorage.getItem('questions') || 'null') || [];
  }
  console.log(user);
  return (
    <Paper className="full-screen-paper">
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
