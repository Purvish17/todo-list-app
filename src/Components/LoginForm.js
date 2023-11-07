import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [message, setMessage] = useState('');
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      if (response.data && response.data.token) {
        setLoggedInUser(username);
        setMessage('');
      } else {
        setLoggedInUser(null);
        setMessage('Login details not matched.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogOut = () => {
    setLoggedInUser(null);
    setUsername('');
    setPassword('');
  };

 

  const handleAddTask = () => {
    if (task) {
      const userTasks = tasks[loggedInUser] || [];
      const newTask = { id: Date.now(), text: task, completed: false };
      setTasks({ ...tasks, [loggedInUser]: [...userTasks, newTask] });
      setTask('');
      saveTasksToLocalStorage();
    }
  };

  const handleDeleteTask = (taskId) => {
    const userTasks = tasks[loggedInUser] || [];
    const updatedTasks = userTasks.filter((task) => task.id !== taskId);
    setTasks({ ...tasks, [loggedInUser]: updatedTasks });
    saveTasksToLocalStorage();
  };

  const handleCompleteTask = (taskId) => {
    const userTasks = tasks[loggedInUser] || [];
    const updatedTasks = userTasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks({ ...tasks, [loggedInUser]: updatedTasks });
    saveTasksToLocalStorage();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!loggedInUser ? (
          <div>
            <Typography component="h1" variant="h5">
              Login Page
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
            <Typography color="error">{message}</Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h5">Welcome, {loggedInUser}!</Typography>
            <Typography>ToDo List for {loggedInUser}</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Add Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleAddTask}>
                Add Task
              </Button>
            </Box>
          
            <ul>
              {(tasks[loggedInUser] || []).map((t) => (
                <li key={t.id}>
                  <span
                    style={{
                      textDecoration: t.completed ? 'line-through' : 'none',
                    }}
                    onClick={() => handleCompleteTask(t.id)}
                  >
                    {t.text}
                  </span>
                  <Button onClick={() => handleDeleteTask(t.id)} color="error">
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
            <Button variant="contained" onClick={handleLogOut}>
              Log Out
            </Button>
          </div>
        )}
         
      
      </Box>
    </Container>
  );
};

export default LoginForm;



