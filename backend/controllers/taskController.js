import Task from "../models/Task.js";

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, dueDate } = req.body;
    if (!title) {
      res.status(400);
      throw new Error('Title is required');
    }

    const task = await Task.create({
      title,
      dueDate,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    // Check if user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};
// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    // Check if user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        res.status(404);
        throw new Error('Task not found');
      }
  
      // Check if user owns the task
      if (task.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
      }
  
      // Use deleteOne() instead of remove()
      await Task.deleteOne({ _id: req.params.id });
      
      res.json({ message: 'Task removed' });
    } catch (error) {
      next(error);
    }
  };

export { getTasks, getTask, createTask, updateTask, deleteTask };
