import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import FilterTasksByDate from "./pages/FilterTaskByDate";
import SingleTask from "./pages/SingleTask";
import fakeTasks from "./data/fakeTasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";

const App = () => {
  const location = useLocation();
  const [userName, setUserName] = useState(null);

  // Check for user token and name on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    setUserName(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to login if token is not present
  if (
    !isAuthenticated &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="w-full mx-auto p-6">
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <nav className="flex items-center justify-between mb-6 bg-white shadow-lg p-4 rounded-lg">
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-1000">
                  Task Manager
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <Link to="/" className="text-blue-500 hover:text-blue-700">
                  Home
                </Link>
                <Link to="/add" className="text-blue-500 hover:text-blue-700">
                  Add Task
                </Link>
                <Link
                  to="/filter"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Filter Tasks
                </Link>
                {userName && (
                  <>
                    <span className="text-gray-800">{userName}</span>
                    <button
                      onClick={handleLogout}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </nav>
          )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/filter" element={<FilterTasksByDate />} />
          <Route path="/tasks/:id" element={<SingleTask tasks={fakeTasks} />} />
          <Route path="/login" element={<Login setUserName={setUserName} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
