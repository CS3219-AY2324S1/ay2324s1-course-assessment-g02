import React from 'react';
import { Route } from 'wouter';
import AuthPage from './AuthPage';
import App from './App';
import { supabase } from '.';
import { Auth } from '@supabase/auth-ui-react';
import { navigate } from 'wouter/use-location';

function Routes() {
    const { user } = Auth.useUser()
    
    supabase.auth.onAuthStateChange((event) => {
        if (event == "SIGNED_IN") {
            console.log("signed in");
            console.log(user);
            navigate("/");
        } else {
            if (!user) {
                navigate("/auth");
                console.log("no user, it should go to auth");
            };
        }
    });

    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Route path="/">
                <App />
            </Route>
            <Route path="/auth">
                <AuthPage />
            </Route>
        </Auth.UserContextProvider>
    );
}

export default Routes;