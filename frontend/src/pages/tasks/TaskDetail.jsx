import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { taskService } from '../../services/taskService';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await taskService.getTask(id);
        setTask(data);
      } catch (err) {
        setError(err.message || 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!task) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Task not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 10}}>
      <Typography variant="h4" gutterBottom>
        {task.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Status: {task.completed ? 'Completed' : 'Pending'}
      </Typography>
      {task.dueDate && (
        <Typography variant="body1" gutterBottom>
          Due Date: {new Date(task.dueDate).toLocaleDateString()}
        </Typography>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          onClick={() => navigate(`/tasks/${id}/edit`)}
          sx={{ mr: 2 }}
        >
          Edit
        </Button>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>
    </Box>
  );
}