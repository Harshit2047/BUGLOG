import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleLikeBlog, deleteBlog } from "../redux/blogSlice";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import CommentSection from "../components/CommentSection";

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  const { showNotification } = useNotification();
  const { user, isAuthenticated } = useAuth();

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

  const isOwner = isAuthenticated && blog.authorId === user?.id;
  const hasLiked = isAuthenticated && blog.likedBy?.includes(user?.id);

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
      navigate("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/"
        className={`inline-block mb-6 ${darkMode ? "text-slate-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition`}
      >
        ← Back to Home
      </Link>

      <article className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden`}>
        {blog.image && (
          <div className="w-full h-64 md:h-80 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-8">
          <h1 className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            {blog.title}
          </h1>

          <div className={`flex items-center gap-4 mb-6 text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
            <span>By {blog.author}</span>
            <span>•</span>
            <span>{blog.date}</span>
          </div>

          <div className={`prose max-w-none mb-8 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
            <p className="whitespace-pre-wrap leading-relaxed">{blog.content}</p>
          </div>

          <div className={`flex items-center justify-between pt-6 border-t ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition text-lg ${hasLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"} ${isAuthenticated ? "cursor-pointer" : "cursor-default"}`}
            title={!isAuthenticated ? "Please login to like posts" : ""}
          >
            {hasLiked ? "❤️" : "🤍"} {blog.likes || 0} Likes
          </button>
          {isOwner && (
            <div className="flex gap-3">
              <Link
                to={`/edit/${blog.id}`}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg transition"
              >
                Edit Post
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition"
              >
                Delete Post
              </button>
            </div>
          )}
          </div>
        </div>
      </article>

      {/* Comment Section */}
      <CommentSection blog={blog} />
    </div>
  );
}
