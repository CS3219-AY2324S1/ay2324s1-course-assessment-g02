import React, { useEffect } from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from "@mui/material";

/* https://supabase.com/docs/guides/auth/auth-helpers/auth-ui */
import {
  Auth,
} from '@supabase/auth-ui-react'

import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared'
import { Redirect } from "wouter";
import { supabase } from ".";


const AuthBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  width: 400,
  padding: 10,
}));

const Container = (props: any) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Redirect to="/" />
      </>

    )
  return props.children
}

function AuthPage() {
  return (
    <Box
    display="flex"
    height={"100vh"}
    alignItems="center"
    justifyContent="center">
      <Container supabaseClient={supabase}></Container>
      <AuthBox>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github']}
          theme="default"
        />
      </AuthBox>
    </Box>
  );
}

export default AuthPage;