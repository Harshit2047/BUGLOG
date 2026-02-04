import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBlog } from "../redux/blogSlice";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import BlogForm from "../components/BlogForm";

export default function AddBlogPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  const { showNotification } = useNotification();
  const { user } = useAuth();

  const handleSubmit = (formData) => {
    dispatch(
      addBlog({
        ...formData,
        author: user.username,
        authorId: user.id,
      })
    );
    showNotification("Blog post created successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Create New Blog Post
      </h1>
      <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg p-8`}>
        <BlogForm onSubmit={handleSubmit} buttonText="Create Post" hideAuthorField />
      </div>
    </div>
  );
}
