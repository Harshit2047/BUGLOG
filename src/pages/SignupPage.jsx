import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../context/NotificationContext";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const { darkMode } = useTheme();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const result = signup(username, email, password);
    if (result.success) {
      showNotification("Account created successfully!");
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border ${
    darkMode
      ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <div
        className={`${
          darkMode ? "bg-slate-800" : "bg-white"
        } rounded-xl shadow-lg p-8`}
      >
        <h1
          className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Create Account
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block mb-2 font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className={inputClass}
            />
          </div>

          <div>
            <label
              className={`block mb-2 font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={inputClass}
            />
          </div>

          <div>
            <label
              className={`block mb-2 font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className={inputClass}
            />
          </div>

          <div>
            <label
              className={`block mb-2 font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p
          className={`mt-6 text-center ${
            darkMode ? "text-slate-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
