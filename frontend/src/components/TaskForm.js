import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/taskSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ task, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [stage, setStage] = useState("in progress");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDate(task.date ? task.date.split("T")[0] : "");
      setStage(task.stage || "in progress");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      id: task ? task.id : Date.now(),
      title,
      description,
      date,
      stage,
    };

    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No authentication token found.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Include this line if you are using cookies
      };

      if (task) {
        await axios.put(
          `${process.env.REACT_APP_BASE_URL}/task/update/${task._id}`,
          taskData,
          config
        );
        dispatch(editTask({ id: task.id, updatedTask: taskData }));
        toast.success("Task updated successfully!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_BASE_URL}/task/create`,
          taskData,
          config
        );
        dispatch(addTask(taskData));
        toast.success("Task added successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting the task:", error);
      toast.error("Error submitting the task. Please try again.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded"
        required
      />

      <div className="space-y-2">
        <label className="block font-bold">Stage</label>
        <div className="flex items-center space-x-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="stage"
              value="in progress"
              checked={stage === "in progress"}
              onChange={(e) => setStage(e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">In Progress</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="stage"
              value="completed"
              checked={stage === "completed"}
              onChange={(e) => setStage(e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">Completed</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {task ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
