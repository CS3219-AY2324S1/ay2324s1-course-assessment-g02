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
import EditQuestionModal from "./EditQuestionModal";
import {
  User,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../api/users";
import EditIcon from "@mui/icons-material/Edit";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

const UserTableRow = (props: {
  u: User;
  deleteUserId: (u: User) => void;
  editUser: (u: User) => void;
  users: User[];
}) => {
  const { u, deleteUserId, editUser, users } = props;
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  return (
    <>
      <EditUserModal
        open={editUserModalOpen}
        setOpen={setEditUserModalOpen}
        editUser={editUser}
        users={users}
        user={u}
      />
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={u.id}
        onClick={() => console.log("hi")}
      >
        <TableCell>{u.id}</TableCell>
        <TableCell>{u.email}</TableCell>
        <TableCell>{u.preferredLanguage}</TableCell>
        <TableCell>{u.preferredComplexity}</TableCell>
        <TableCell>{new Date(u.createdAt || "").toLocaleString()}</TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              deleteUserId(u);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setEditUserModalOpen(true);
            }}
          >
            <EditIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

function UsersTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState<User[]>([]);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const addUser = (email: string, password: string) => {
    createUser(email, password).then((u) =>
      setUserData((data) => [...data, u])
    );
  };

  const deleteUserId = (u: User) => {
    deleteUser(u);
    setUserData((data) => data.filter((user) => user.id !== u.id));
  };

  const editUser = (u: User) => {
    updateUser(u);
    setUserData((data) => data.map((user) => (user.id === u.id ? u : user)));
  };

  useEffect(() => {
    getAllUsers()
      .then((users) => {
        console.log(users);
        setUserData(users);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Paper sx={{ padding: "0 5%", overflow: "hidden" }}>
      <Toolbar>
        <Tooltip title="Add Question">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setAddUserModalOpen(true)}
          >
            Add User
          </Button>
        </Tooltip>
      </Toolbar>
      <TableContainer>
        <AddUserModal
          open={addUserModalOpen}
          setOpen={setAddUserModalOpen}
          users={userData}
          addUser={addUser}
        />
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {/* <TableCell /> */}
              <TableCell>id</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Preferred Language</TableCell>
              <TableCell>Preferred Complexity</TableCell>
              <TableCell>User Join Date</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {userData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((u) => (
                <UserTableRow
                  u={u}
                  users={userData}
                  editUser={editUser}
                  deleteUserId={deleteUserId}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default UsersTable;
