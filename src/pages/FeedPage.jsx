import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import BlogCard from "../components/BlogCard";

export default function FeedPage() {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const blogs = useSelector((state) => state.blogs.posts);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Get unique categories from blogs
  const categories = useMemo(() => {
    const unique = new Set();
    blogs.forEach((blog) => {
      if (blog.category && blog.category.trim()) {
        unique.add(blog.category.trim());
      }
    });
    return ["All", ...Array.from(unique)];
  }, [blogs]);

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs;

    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter((blog) =>
        (blog.title || "").toLowerCase().includes(q) ||
        (blog.content || "").toLowerCase().includes(q) ||
        (blog.author || "").toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    // Sort blogs
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date || 0) - new Date(b.date || 0);
        case "popularity":
          return (b.likes || 0) - (a.likes || 0);
        case "newest":
        default:
          return new Date(b.date || 0) - new Date(a.date || 0);
      }
    });

    return sorted;
  }, [blogs, searchTerm, selectedCategory, sortBy]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900  px-15" : "bg-gray-50 px-15"}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        

        {/* Search & Filters */}
        <div className={`mb-8 p-6 rounded-xl shadow-lg ${darkMode ? "bg-slate-800" : "bg-white"}`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Discover Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-3 rounded-lg border ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>

          {/* Results Info & Clear */}
          <div className="mt-4 flex items-center justify-between">
            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
              Showing {filteredAndSortedBlogs.length} of {blogs.length} posts
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
            {(searchTerm || selectedCategory !== "All" || sortBy !== "newest") && (
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); setSortBy("newest"); }}
                className={`text-sm px-4 py-2 rounded-lg transition ${
                  darkMode 
                    ? "text-slate-400 hover:text-white hover:bg-slate-700" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div>
         

          {filteredAndSortedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedBlogs.map((blog) => (
                <div key={blog.id} className="transform hover:scale-[1.02] transition-transform duration-300">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 ${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg`}>
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className={`text-xl mb-2 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                {searchTerm || selectedCategory !== "All" 
                  ? "No posts match your search criteria." 
                  : "No posts available yet."
                }
              </p>
              <p className={`mb-6 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                {searchTerm || selectedCategory !== "All" 
                  ? "Try adjusting your filters or search terms."
                  : "Be the first to share something amazing!"
                }
              </p>
              {!searchTerm && selectedCategory === "All" ? (
                <Link
                  to="/add"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create the first post!
                </Link>
              ) : (
                <button
                  onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition"
                >
                  Clear search and filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
