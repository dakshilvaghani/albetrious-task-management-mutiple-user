import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No authentication token found.");
        setLoading(false);
        return;
      }

      try {
        const userId = localStorage.getItem("userId");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/task/`,
          config
        );

        const userTasks = response.data.tasks.filter(
          (task) => task.userId === userId
        );

        setTasks(userTasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color={"#0000FF"} loading={loading} size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error fetching tasks: {error}
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-center text-gray-900 font-bold mb-4">
        <h2>All Tasks</h2>
      </div>
      <div className="">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default Home;
