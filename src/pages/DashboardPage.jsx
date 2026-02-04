import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import BlogList from "../components/BlogList";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const blogs = useSelector((state) => state.blogs.posts);

  const [activeSection, setActiveSection] = useState("myPosts");

  const myPosts = useMemo(() => {
    return blogs.filter((blog) => blog.authorId === user?.id);
  }, [blogs, user?.id]);

  const likedPosts = useMemo(() => {
    return blogs.filter((blog) => blog.likedBy?.includes(user?.id));
  }, [blogs, user?.id]);

  const stats = {
    myPosts: myPosts.length,
    liked: likedPosts.length,
  };

  const displayedBlogs = useMemo(() => {
    switch (activeSection) {
      case "myPosts":
        return myPosts;
      case "liked":
        return likedPosts;
      default:
        return myPosts;
    }
  }, [activeSection, myPosts, likedPosts]);

  const getSectionTitle = () => {
    switch (activeSection) {
      case "myPosts":
        return "My Posts";
      case "liked":
        return "Liked Posts";
      default:
        return "My Posts";
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case "myPosts":
        return "Manage and view all your created posts";
      case "liked":
        return "Posts you've shown some love to";
      default:
        return "Manage and view all your created posts";
    }
  };

  const getEmptyMessage = () => {
    switch (activeSection) {
      case "myPosts":
        return "You haven't created any posts yet.";
      case "liked":
        return "You haven't liked any posts yet.";
      default:
        return "You haven't created any posts yet.";
    }
  };

  return (
    <div className="flex">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        stats={stats}
      />
      
      <main className="flex-1 p-8">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {getSectionTitle()}
            </h1>
            <p className={`${darkMode ? "text-slate-400" : "text-gray-600"}`}>
              {getSectionDescription()}
            </p>
          </div>
          {activeSection === "myPosts" && (
            <Link
              to="/add"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition shadow-lg shadow-blue-600/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Post
            </Link>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl shadow-lg ${
              darkMode ? "bg-slate-800" : "bg-white"
            } ${activeSection === "myPosts" ? "ring-2 ring-green-500" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Your Posts
                </p>
                <h3 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {stats.myPosts}
                </h3>
              </div>
              <div className={`p-3 rounded-full ${darkMode ? "bg-green-600/20" : "bg-green-100"}`}>
                <svg className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow-lg ${
              darkMode ? "bg-slate-800" : "bg-white"
            } ${activeSection === "liked" ? "ring-2 ring-red-500" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Liked Posts
                </p>
                <h3 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {stats.liked}
                </h3>
              </div>
              <div className={`p-3 rounded-full ${darkMode ? "bg-red-600/20" : "bg-red-100"}`}>
                <svg className={`w-6 h-6 ${darkMode ? "text-red-400" : "text-red-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Blog List Section */}
        <div
          className={`${
            darkMode ? "bg-slate-800" : "bg-white"
          } rounded-xl shadow-lg p-6`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {getSectionTitle()} ({displayedBlogs.length})
            </h2>
          </div>

          {displayedBlogs.length === 0 ? (
            <div
              className={`text-center py-16 ${
                darkMode ? "text-slate-400" : "text-gray-500"
              }`}
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xl mb-4">{getEmptyMessage()}</p>
              {activeSection === "myPosts" && (
                <Link
                  to="/add"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Your First Post
                </Link>
              )}
            </div>
          ) : (
            <BlogList blogs={displayedBlogs} />
          )}
        </div>
      </main>
    </div>
  );
}
