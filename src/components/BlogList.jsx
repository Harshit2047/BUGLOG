import BlogCard from "./BlogCard";
import { useTheme } from "../context/ThemeContext";

export default function BlogList({ blogs }) {
  const { darkMode } = useTheme();

  if (!blogs || blogs.length === 0) {
    return (
      <div
        className={`text-center py-12 ${
          darkMode ? "text-slate-400" : "text-gray-500"
        }`}
      >
        <p className="text-xl">No blog posts found.</p>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
