import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobsPage from './pages/JobsPage';
import JobDetails from "./pages/JobDetails"; 
import BookmarksPage from "./pages/BookmarksPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/job-details" element={<JobDetails />} /> 
<Route path="/bookmarks" element={<BookmarksPage />} />
    </Routes>
  );
}

export default App;
