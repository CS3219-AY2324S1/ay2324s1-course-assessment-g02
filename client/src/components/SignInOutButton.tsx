import React, { useEffect } from "react";
import { IconButton } from '@mui/material';
import { supabase } from '../App';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { User } from '@supabase/supabase-js';

const SignInOutButton = (props: { user: User | null }): JSX.Element => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(props.user)
    }, [props.user]);

    if (props.user !== null) {
        return (
            <IconButton
                color="inherit"
                onClick={() => {
                    supabase.auth.signOut();
                }}
            >
                <LogoutIcon />
            </IconButton>
        );
    } else {
        return (
            <IconButton
                color="inherit"
                onClick={() => {
                    navigate('/auth');
                }}
            >
                <LoginIcon />
            </IconButton>
        );
    }
};

export default SignInOutButton;
