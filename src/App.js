// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './Components/Auth/SignUp';
import SignIn from './Components/Auth/SignIn';
import Calendar from './Components/Calendar/Calendar';
import Notification from './Components/Notifications/Notifications';
import ProgressTracking from './Components/ProgressTracking/ProgressTracking';
import TaskManagement from './Components/TaskManagament/Taskmanagement';
import './App.css'; // Your CSS file

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <h1>Student Study Planner and Task Organiser</h1>
                </header>
                <nav className="nav">

                    {/* { <a href="/signup" className="nav-link">Sign Up</a> */}
                    {/* <a href="/signin" className="nav-link">Sign In</a> */} 
                    <a href="/tasks" className="nav-link">Tasks</a>
                    <a href="/calendar" className="nav-link">Calendar</a>
                    <a href="/notifications" className="nav-link">Notifications</a>
                    <a href="/progress" className="nav-link">Progress</a>
                </nav>
                <main className="app-main">
                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/tasks" element={<TaskManagement />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/notifications" element={<Notification />} />
                        <Route path="/progress" element={<ProgressTracking />} />
                        <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect to SignIn on load */}
                    </Routes>
                </main>
                <footer className="app-footer">
                    <p>&copy; 2024 Student Study Planner and Task Organiser. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;