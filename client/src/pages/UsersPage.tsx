import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import UsersTable from "../components/UsersTable";

const UsersPage = () => {
  return (
    <div>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ my: 2 }}>
              Assignment 2
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
