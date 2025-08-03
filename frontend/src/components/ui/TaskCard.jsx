import { Card, CardContent, Checkbox, Typography, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { taskService } from '../../services/taskService';
import { useState } from 'react';

export default function TaskCard({ task }) {
  const [completed, setCompleted] = useState(task.completed);
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      await taskService.updateTask(task._id, { completed: !completed });
      setCompleted(!completed);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    setLoading(true);
    try {
      await taskService.deleteTask(task._id);
      window.location.reload();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ opacity: loading ? 0.7 : 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={completed}
            onChange={handleToggleComplete}
            disabled={loading}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{ textDecoration: completed ? 'line-through' : 'none' }}
            >
              {task.title}
            </Typography>
            {task.dueDate && (
              <Typography variant="body2">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            )}
          </Box>
          <IconButton
            component={Link}
            to={`/tasks/${task._id}/edit`}
            disabled={loading}
          >
            <Edit color='primary'/>
          </IconButton>
          <IconButton onClick={handleDelete} disabled={loading}>
            <Delete color='error'/>
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}