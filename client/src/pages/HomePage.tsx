import React from "react";
import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import QuestionTable from "../components/QuestionTable";
import SignInOutButton from "../components/SignInOutButton";
import { Auth } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { user } = Auth.useUser();
  const navigate = useNavigate();
  var displayName = "";
  if (user !== null) {
    displayName = user.email === "admin@gmail.com" ? "Admin" : "User";
  } else {
    displayName = "Not logged in";
  }
  return (
    <div>
      <div>
        <AppBar position="sticky">
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              display="flex"
              variant="h6"
              sx={{ my: 2, flexGrow: 1 }}
            >
              Assignment 3
            </Typography>
            <Typography sx={{ my: 2 }}>{displayName}</Typography>
            <SignInOutButton user={user} />
          </Toolbar>
        </AppBar>
      </div>
      {user !== null && <QuestionTable />}
      {!user && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h2">Sign in to view questions</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default HomePage;
