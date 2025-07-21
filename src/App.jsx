import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AppLayout from "./components/common/Layout/AppLayout";
import Login from "./components/Login/Login.jsx";
import { useState } from "react";
import MentorshipSessionForm from "./components/mentorship/MentorshipSessionForm";
import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../src/features/service/authSlice.js";

function AppRoutes() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <AppLayout onLogout={handleLogout} /> : <Login />}
      />
      <Route
        path="/addmentorship"
        element={
          user ? (
            <AppLayout onLogout={handleLogout}>
              <MentorshipSessionForm />
            </AppLayout>
          ) : (
            <Login />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;