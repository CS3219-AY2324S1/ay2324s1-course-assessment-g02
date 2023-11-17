import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import QuestionTable from "../components/QuestionTable";
import SignInOutButton from "../components/SignInOutButton";
import { Auth } from "@supabase/auth-ui-react";

const HomePage = () => {
  const { user } = Auth.useUser();
  return (
    <div>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ my: 2, flexGrow: 1 }}>
              Assignment 3
            </Typography>
            <SignInOutButton user={user} />
          </Toolbar>
        </AppBar>
      </div>
      <QuestionTable />
    </div>
  );
};

export default HomePage;
