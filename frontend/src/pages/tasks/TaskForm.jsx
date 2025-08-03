import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { taskService } from '../../services/taskService';

export default function TaskForm({ editMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editMode && id) {
      const fetchTask = async () => {
        setLoading(true);
        try {
          const task = await taskService.getTask(id);
          setTitle(task.title);
          if (task.dueDate) setDueDate(new Date(task.dueDate));
        } catch (err) {
          setError(err.message || 'Failed to load task');
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [editMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const taskData = {
      title,
      dueDate: dueDate ? dueDate.toISOString() : null,
    };

    try {
      if (editMode) {
        await taskService.updateTask(id, taskData);
      } else {
        await taskService.createTask(taskData);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 10, p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        {editMode ? 'Edit Task' : 'Create New Task'}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due Date"
            value={dueDate}
            onChange={(newValue) => setDueDate(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
              />
            )}
          />
        </LocalizationProvider>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          {isSubmitting ? <CircularProgress size={24} /> : 'Save Task'}
        </Button>
      </form>
    </Box>
  );
}