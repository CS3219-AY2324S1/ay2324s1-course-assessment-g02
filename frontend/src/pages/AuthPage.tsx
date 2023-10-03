import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from "@mui/material";
import { supabase } from '../main';

/* https://supabase.com/docs/guides/auth/auth-helpers/auth-ui */
import {
    Auth,
} from '@supabase/auth-ui-react'

import {
    // Import predefined theme
    ThemeSupa,
} from '@supabase/auth-ui-shared'
import { ThemeContext } from '../contexts/theme-context';
import { useContext } from 'react';

const AuthBox = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    width: 400,
    padding: 10,
}));

// mostly for testing
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
    const { theme } = useContext(ThemeContext);
    return (
        <Box
            display="flex"
            height={"100vh"}
            width={"100vw"}
            alignItems="center"
            justifyContent="center">
            <Container supabaseClient={supabase}></Container>
            <AuthBox>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={['google', 'github']}
                    theme={theme == 'light' ? 'default' : 'hannahThemeDark'}
                />
            </AuthBox>
        </Box>
    );
}

export default AuthPage;