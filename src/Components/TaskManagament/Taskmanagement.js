// src/Components/TaskManagement.js
import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import './TaskManagement.css'; // Import your CSS file

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                apiKey: "AIzaSyCWxBWQv335g_YVFvcYIuur-zWAOUv6r5I",
                clientId:"439089830733-ldeguqcin7t1tu0iu38u5dgjiilocupt.apps.googleusercontent.com",
                scope: 'https://www.googleapis.com/auth/calendar',
                discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            }).then(() => {
                const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
                setIsSignedIn(isSignedIn);
            });
        };

        gapi.load('client:auth2', initClient);
    }, []);

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedTasks = tasks.map((t, index) => (index === editIndex ? task : t));
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            setTasks([...tasks, task]);
        }
        setTask('');
    };

    const handleEdit = (index) => {
        setTask(tasks[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const handleSignIn = () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    const handleSignOut = () => {
        gapi.auth2.getAuthInstance().signOut();
        setIsSignedIn(false);
    };

    const scheduleTask = (task) => {
        const event = {
            summary: task,
            start: {
                dateTime: new Date().toISOString(), // Set the start time
                timeZone: 'America/Los_Angeles', // Adjust the timezone as needed
            },
            end: {
                dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
                timeZone: 'America/Los_Angeles',
            },
        };

        gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        }).then((response) => {
            console.log('Event created: ', response);
            alert(`Task scheduled: ${response.result.htmlLink}`);
        }).catch((error) => {
            console.error('Error scheduling task: ', error);
        });
    };

    return (
        <div className="task-management-container">
            <h2>Task Management</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={task}
                    onChange={handleChange}
                    placeholder="Enter a new task"
                    required
                />
                <button type="submit">{editIndex !== null ? 'Update Task' : 'Add Task'}</button>
            </form>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index}>
                        {t}
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                        {isSignedIn && (
                            <button onClick={() => scheduleTask(t)}>Schedule</button>
                        )}
                    </li>
                ))}
            </ul>
            {isSignedIn ? (
                <button onClick={handleSignOut}>Sign Out</button>
            ) : (
                <button onClick={handleSignIn}>Sign In to Google</button>
            )}
        </div>
    );
};

export default TaskManagement;