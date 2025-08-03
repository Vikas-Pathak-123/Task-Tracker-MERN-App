import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '../node_modules/@mui/material';
import AuthContext from './context/AuthContext';
import Navbar from './components/ui/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/tasks/Dashboard';
import TaskForm from './pages/tasks/TaskForm';
import TaskDetail from './pages/tasks/TaskDetail';

const theme = createTheme();

export default function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const setToken = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={{ authToken, setToken, logout }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={!authToken ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!authToken ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={authToken ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/tasks/new" element={authToken ? <TaskForm /> : <Navigate to="/login" />} />
            <Route path="/tasks/:id" element={authToken ? <TaskDetail /> : <Navigate to="/login" />} />
            <Route path="/tasks/:id/edit" element={authToken ? <TaskForm editMode /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={authToken ? "/dashboard" : "/login"} />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}