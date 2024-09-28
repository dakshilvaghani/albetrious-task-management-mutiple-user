import Task from "../models/Task.js";

//Add Task
export const createTask = async (req, res) => {
  try {
    const { title, description, stage, date } = req.body;
    console.log(req.body);
    const userId = req.user; // Assuming the user ID is available in req.user

    console.log(userId);
    const task = await Task.create({
      title,
      description,
      stage,
      date,
      userId, 
    });

    res
      .status(200)
      .json({ status: true, task, message: "Task created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

//get All Tasks
export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId }); 
    res.status(200).json({
      status: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
};

//get Particuler Task
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    res.status(200).json({
      status: true,
      task,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

//update particuler task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, stage } = req.body;

    console.log(req.body);
    const task = await Task.findById(id);

    task.title = title;
    task.description = description;
    task.date = date;
    task.stage = stage.toLowerCase();

    await task.save();

    res
      .status(200)
      .json({ status: true, message: "Task updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

//delete particuler task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ status: true, message: "Task deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error." });
  }
};

// Filter tasks by stage, date, and title
export const filterTaskByDate = async (req, res) => {
  const { stage, date, title } = req.query;

  const filters = {};

  // Check for stage filter (in progress or completed)
  if (stage) {
    filters.stage = stage; 
  }

  // Check for date filter
  if (date) {
    const startDate = new Date(date); 
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1); 

    // Filter tasks for the specified date
    filters.date = { $gte: startDate, $lt: endDate };
  }

  // Check for title filter
  if (title) {
    filters.title = { $regex: title, $options: "i" }; 
  }

  try {
    const tasks = await Task.find(filters);
    res.status(200).json({ status: true, tasks });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
