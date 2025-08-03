import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} from "../controllers/taskController.js";

const router = express.Router();

// Protect all routes
router.use(protect);

router.route("/").get(getTasks).post(createTask);

router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;
