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
import { FaBars } from "react-icons/fa";

const App = () => {
  const location = useLocation();
  const [userName, setUserName] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const isAuthenticated = !!localStorage.getItem("token");

  if (
    !isAuthenticated &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="w-full mx-auto p-6 relative">
        {location.pathname !== "/login" &&
          location.pathname !== "/register" && (
            <nav className="flex items-center justify-between mb-6 bg-white shadow-lg p-4 rounded-lg">
              <div className="flex items-center">
                <span className="sm:text-md md:text-lg lg:text-xl font-bold text-gray-1000">
                  Task Manager
                </span>
              </div>

              {/* Hamburger menu button  */}
              <button
                className="text-blue-500 md:hidden block"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FaBars size={24} />
              </button>

              {/* Main Menu */}
              <div className="hidden md:flex items-center space-x-6">
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

              {/* Mobile Menu  */}
              {isMenuOpen && (
                <div
                  className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
                    isMenuOpen ? "opacity-100" : "opacity-0"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div
                    className={`fixed top-0 right-0 w-1/2 max-w-xs h-full bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out transform ${
                      isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the menu
                  >
                    <div className="flex flex-col space-y-4">
                      <Link
                        to="/"
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        to="/add"
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Add Task
                      </Link>
                      <Link
                        to="/filter"
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Filter Tasks
                      </Link>
                      {userName && (
                        <>
                          <span className="text-gray-800">{userName}</span>
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsMenuOpen(false);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Logout
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
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
