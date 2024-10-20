// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import JobList from "./components/JobList";
import AddJob from "./components/AddJob";
import CandidateNotify from "./components/CandidateNotify";
import VerifyOTP from "./components/VerifyOTP";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Redirect root to Login */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/jobs" element={isAuthenticated ? <JobList /> : <Navigate to="/" />} />
        <Route path="/add-job" element={isAuthenticated ? <AddJob /> : <Navigate to="/" />} />
        <Route path="/notify" element={isAuthenticated ? <CandidateNotify /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
