import { useState, useEffect, useContext } from 'react';
import { Button, Box, Typography, CircularProgress, Alert, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import TaskCard from '../../components/ui/TaskCard';
import { taskService } from '../../services/taskService';
import AuthContext from '../../context/AuthContext';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { authToken } = useContext(AuthContext);
  const [filter, setFilter] = useState('All');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (!authToken) return;

    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks();
        setTasks(data);
        setFilteredTasks(data); // Initialize filtered tasks with all tasks
      } catch (err) {
        setError(err.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [authToken]);

  useEffect(() => {
    // Apply filter whenever tasks or filter value changes
    if (filter === 'All') {
      setFilteredTasks(tasks);
    } else if (filter === 'Completed') {
      setFilteredTasks(tasks.filter(task => task.completed));
    } else if (filter === 'Uncompleted') {
      setFilteredTasks(tasks.filter(task => !task.completed));
    }
  }, [filter, tasks]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    handleClose();
  };

  return (
    <Box sx={{ p: 3, mt: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Your Tasks</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined"
            onClick={handleClick}
            aria-controls="filter-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            Filter: {filter}
          </Button>
          <Button variant="contained" component={Link} to="/tasks/new">
            Add Task
          </Button>
        </Box>
      </Box>

      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'filter-button',
        }}
      >
        <MenuItem onClick={() => handleFilterSelect('All')}>All</MenuItem>
        <MenuItem onClick={() => handleFilterSelect('Completed')}>Completed</MenuItem>
        <MenuItem onClick={() => handleFilterSelect('Uncompleted')}>Uncompleted</MenuItem>
      </Menu>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredTasks.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          {filter === 'All' 
            ? 'No tasks found. Create your first task!'
            : `No ${filter.toLowerCase()} tasks found`}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </Box>
      )}
    </Box>
  );
}