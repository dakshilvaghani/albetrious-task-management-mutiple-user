import Task from "../models/Task.js";

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
      userId, // Associate the task with the user
    });

    res
      .status(200)
      .json({ status: true, task, message: "Task created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ _id: -1 });

    res.status(200).json({
      status: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error." });
  }
};

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
    filters.stage = stage; // Directly filter by the stage (e.g., "in progress" or "completed")
  }

  // Check for date filter
  if (date) {
    const startDate = new Date(date); // Start of the specified date
    const endDate = new Date(startDate); // Clone startDate
    endDate.setDate(startDate.getDate() + 1); // Set endDate to the next day

    // Filter tasks for the specified date
    filters.date = { $gte: startDate, $lt: endDate };
  }

  // Check for title filter
  if (title) {
    filters.title = { $regex: title, $options: "i" }; // Case-insensitive title search
  }

  try {
    const tasks = await Task.find(filters); // Find tasks that match the filters
    res.status(200).json({ status: true, tasks });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
