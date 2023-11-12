import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import QuestionTable from "./components/QuestionTable";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        {/* <Route path="*" element={<Navigate to="/auth" replace />} /> */}
      </Routes>
    </div>
  );
}

export default App;
