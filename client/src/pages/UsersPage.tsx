import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import UsersTable from "../components/UsersTable";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              variant="h6"
              sx={{ my: 2 }}
            >
              Assignment 3
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
