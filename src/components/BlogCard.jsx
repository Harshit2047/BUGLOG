import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLikeBlog, deleteBlog } from "../redux/blogSlice";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";

export default function BlogCard({ blog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const { showNotification } = useNotification();
  const { user, isAuthenticated } = useAuth();

  const isOwner = isAuthenticated && blog.authorId === user?.id;
  const hasLiked = isAuthenticated && blog.likedBy?.includes(user?.id);

  const handleCardClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      showNotification("Please login to like posts", "info");
      return;
    }
    dispatch(toggleLikeBlog({ blogId: blog.id, userId: user.id }));
  };

  const handleDelete = () => {
    if (!isOwner) {
      showNotification("You can only delete your own posts");
      return;
    }
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deleteBlog(blog.id));
      showNotification("Blog post deleted successfully!");
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer`}
    >
      {blog.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
          {blog.title}
        </h2>
        <p className={`${darkMode ? "text-slate-400" : "text-gray-600"} text-sm mb-4 line-clamp-3`}>
          {blog.content}
        </p>
        <div className={`flex items-center justify-between text-sm ${darkMode ? "text-slate-500" : "text-gray-500"}`}>
          <span>By {blog.author}</span>
          <span>{blog.date}</span>
        </div>
        <div className={`flex items-center justify-between mt-4 pt-4 border-t ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={`flex items-center gap-2 transition ${hasLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"} ${isAuthenticated ? "cursor-pointer" : "cursor-default"}`}
            title={!isAuthenticated ? "Please login to like posts" : ""}
          >
            {hasLiked ? "❤️" : "🤍"} {blog.likes || 0}
          </button>
          {isOwner && (
            <div className="flex gap-2">
              <Link
                to={`/edit/${blog.id}`}
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-sm transition"
              >
                Edit
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
