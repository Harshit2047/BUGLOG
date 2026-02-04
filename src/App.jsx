import { Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AddBlogPage from "./pages/AddBlogPage";
import EditBlogPage from "./pages/EditBlogPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import FeedPage from "./pages/FeedPage";

export default function App() {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-gray-100"}`}>
      <Header />
      <Notification />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
