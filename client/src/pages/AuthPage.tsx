import React, { useEffect } from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Typography } from "@mui/material";

/* https://supabase.com/docs/guides/auth/auth-helpers/auth-ui */
import {
    Auth,
} from '@supabase/auth-ui-react'

import {
    // Import predefined theme
    ThemeSupa,
} from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom';
import { supabase } from "../App";
import SignInOutButton from "../components/SignInOutButton";


const AuthBox = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    width: 400,
    padding: 10,
    margin: 10,
}));

// const Container = (props: any) => {
//     const { user } = Auth.useUser();
//     const navigate = useNavigate();
//     if (user) return navigate('/');
//     return props.children;
// };

function AuthPage() {
    const navigate = useNavigate();
    const { user } = Auth.useUser();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                // waits for the session to load
                console.log("session", session)
                if (session) {
                    navigate('/');
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <Box
            display="flex"
            height={"100vh"}
            alignItems="center"
            justifyContent="center">
            <AuthBox>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="default"
                />
            </AuthBox>
            <Grid container direction="column" maxWidth={"20%"}>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    Questions Page
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        navigate('/users');
                    }}
                >
                    Users Page
                </Button>
            </Grid>
        </Box >
    );
}

export default AuthPage;