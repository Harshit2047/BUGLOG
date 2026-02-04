import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showNotification("Logged out successfully!");
    navigate("/");
  };

  return (
    <header className={`${darkMode ? "bg-slate-800" : "bg-white"} shadow-lg sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-500">
          📝 BUGLOG
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to={isAuthenticated ? "/feed" : "/"}
            className={`${darkMode ? "text-slate-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition`}
          >
            {isAuthenticated ? "Feed" : "Home"}
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`${darkMode ? "text-slate-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition`}
              >
                Dashboard
              </Link>
              <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${darkMode ? "bg-slate-700 text-yellow-400" : "bg-gray-200 text-gray-700"}`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
              <Link
                to="/add"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
              >
                + New Post
              </Link>
              
              <button
                onClick={handleLogout}
                className={`px-3 py-2 rounded-lg ${darkMode ? "bg-slate-700 text-slate-300 hover:text-white" : "bg-gray-200 text-gray-700 hover:text-gray-900"} transition`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${darkMode ? "text-slate-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition`}
              >
                Login
              </Link>
              {isAuthenticated === false && (<button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${darkMode ? "bg-slate-700 text-yellow-400" : "bg-gray-200 text-gray-700"}`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>)}
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
              >
                Sign Up
              </Link>
             
            </>
          )}
          
        </nav>
      </div>
    </header>
  );
}
