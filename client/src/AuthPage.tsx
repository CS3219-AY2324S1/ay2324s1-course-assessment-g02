import React from "react";
import { createClient } from '@supabase/supabase-js'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from "@mui/material";
import App from "./App";

/* https://supabase.com/docs/guides/auth/auth-helpers/auth-ui */
import {
  Auth,
} from '@supabase/auth-ui-react'

import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'


const AuthBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  width: 400,
  padding: 10,
}));

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_ANON_KEY || '',
)

const Container = (props: any) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Typography>Signed in: {user.email}</Typography>
        <Button onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>

    )
  return props.children
}

function AuthPage() {
  const { user } = Auth.useUser()
  console.log(user)
  console.log("checking for user on authPage")
  if (user) {
    return (<App/>)
  }
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}></Container>
    <Box
    display="flex"
    height={"100vh"}
    alignItems="center"
    justifyContent="center">
      <AuthBox>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'github']}
          theme="default"
        />
      </AuthBox>
    </Box>
    </Auth.UserContextProvider>
  );
}

export default AuthPage;