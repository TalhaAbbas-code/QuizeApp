import Landing from "./pages/Landing";
import LogIn from "./pages/Login";
import { AuthenticatedUser } from "./types/User";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Signup from "./pages/Sigup";
import Home from "./pages/Home";
import ProtectedRoute from "./context/ProtectedRoute";
import QuizPage from "./pages/Quiz";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/AdminDashboard";


function App() {


  return (
    <Router>
      <div className="font-sans min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminDashboard/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </Router>
  );
}

export default App;
