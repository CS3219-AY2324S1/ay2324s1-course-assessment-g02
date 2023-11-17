import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import QuestionTable from "./components/QuestionTable";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import { createClient } from "@supabase/supabase-js";
import AuthPage from "./pages/AuthPage";
import { Auth } from "@supabase/auth-ui-react";

const supabaseClient = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_ANON_KEY || ''
);

export const supabase = supabaseClient;

function App() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </Auth.UserContextProvider >
  );
}

export default App;
