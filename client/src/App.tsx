import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import QuestionTable from "./components/QuestionTable";
import { supabase } from ".";
import { Auth } from "@supabase/auth-ui-react";

function App() : React.ReactElement{
  const { user } = Auth.useUser()
  return (
    <div className="App">
      {/* sorry markus, i put this in trying to get the signout to go to the side but FAILED lmao */}
      <Box sx={{ flexGrow: 1 }}> 
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexgrow: 1, my: 2 }}>
              Assignment 1
            </Typography>
            <Typography>User: {user ? user.email : 'Not signed in'}</Typography>
            <Button color="inherit" onClick={() => {supabase.auth.signOut()}}>
              Sign out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <QuestionTable />
    </div>
  );
}

export default App;
