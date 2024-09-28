import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
  filterTaskByDate,
} from "../controllers/taskController.js";

import authenticateUser from "../middlewares/authenticateUser.js";
const router = express.Router();

router.post("/create", authenticateUser, createTask);
router.get("/", getTasks);

router.get("/filter", filterTaskByDate);
router.get("/:id", getTask);
router.put("/update/:id",authenticateUser, updateTask);

router.delete("/delete/:id", deleteTask);

export default router;
