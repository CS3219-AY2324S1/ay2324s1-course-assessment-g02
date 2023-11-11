import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import QuestionTable from "./components/QuestionTable";

function App() {
  return (
    <div className="App">
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ my: 2 }}>
              Assignment 2
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <QuestionTable />
    </div>
  );
}

export default App;
