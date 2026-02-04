import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editBlog } from "../redux/blogSlice";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import BlogForm from "../components/BlogForm";

export default function EditBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  const { showNotification } = useNotification();
  const { user } = useAuth();

  const blog = useSelector((state) =>
    state.blogs.posts.find((b) => b.id === parseInt(id))
  );

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Blog post not found
        </h1>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Check if user is the owner of this post
  if (blog.authorId && blog.authorId !== user?.id) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Unauthorized
        </h1>
        <p className={`mt-2 ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
          You can only edit your own posts.
        </p>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const handleSubmit = (formData) => {
    dispatch(editBlog({ ...formData, id: blog.id }));
    showNotification("Blog post updated successfully!");
    navigate(`/blog/${blog.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        to="/"
        className={`inline-block mb-6 ${darkMode ? "text-slate-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition`}
      >
        ← Back to Home
      </Link>
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Edit Blog Post
      </h1>
      <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg p-8`}>
        <BlogForm initialData={blog} onSubmit={handleSubmit} buttonText="Update Post" />
      </div>
    </div>
  );
}
