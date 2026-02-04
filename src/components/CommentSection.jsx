import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, deleteComment } from "../redux/blogSlice";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { Link } from "react-router-dom";

export default function CommentSection({ blog }) {
  const dispatch = useDispatch();
  const { darkMode } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [commentText, setCommentText] = useState("");

  const comments = blog.comments || [];

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      showNotification("Comment cannot be empty", "error");
      return;
    }
    if (commentText.length > 500) {
      showNotification("Comment is too long (max 500 characters)", "error");
      return;
    }

    dispatch(addComment({
      blogId: blog.id,
      text: commentText.trim(),
      author: user.username,
      userId: user.id,
    }));

    setCommentText("");
    showNotification("Comment added successfully!");
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteComment({ blogId: blog.id, commentId }));
      showNotification("Comment deleted successfully!");
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffMs = now - commentDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return commentDate.toLocaleDateString();
  };

  return (
    <div className={`mt-8 ${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg p-6`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Comments ({comments.length})
      </h2>

      {/* Comment Form - Only for logged-in users */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            rows={4}
            maxLength={500}
            className={`w-full px-4 py-3 rounded-lg border ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
          />
          <div className="flex items-center justify-between mt-2">
            <span className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
              {commentText.length}/500 characters
            </span>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!commentText.trim()}
            >
              Post Comment
            </button>
          </div>
        </form>
      ) : (
        <div className={`mb-8 p-4 rounded-lg border ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}`}>
          <p className={`text-center ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
            Please{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              sign in
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              sign up
            </Link>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className={`text-center py-8 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => {
            const canDelete = isAuthenticated && (comment.userId === user?.id || blog.authorId === user?.id);
            
            return (
              <div
                key={comment.id}
                className={`p-4 rounded-lg ${darkMode ? "bg-slate-700" : "bg-gray-50"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
                    }`}>
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {comment.author}
                      </p>
                      <p className={`text-xs ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                        {formatTimestamp(comment.timestamp)}
                      </p>
                    </div>
                  </div>
                  {canDelete && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className={`text-sm px-3 py-1 rounded transition ${
                        darkMode
                          ? "text-red-400 hover:bg-slate-600"
                          : "text-red-600 hover:bg-gray-200"
                      }`}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className={`ml-10 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                  {comment.text}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
