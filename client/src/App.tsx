import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import QuestionTable from "./components/QuestionTable";
import { Auth } from "@supabase/auth-ui-react";
import AuthPage from "./AuthPage";

function App() {
  const { user } = Auth.useUser()
  console.log(user)
  if (user) {
    return (
      <div className="App">
        <div>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="h6" sx={{ my: 2 }}>
                Assignment 1
              </Typography>
            </Toolbar>
          </AppBar>
        </div>

        <QuestionTable />
      </div>
    );
  } else {
  return (
    <AuthPage/>
  )}
}

export default App;
