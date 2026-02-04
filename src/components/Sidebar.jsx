import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ activeSection, onSectionChange, stats }) {
  const { darkMode } = useTheme();
  const { user } = useAuth();

  const menuItems = [
    {
      id: "myPosts",
      label: "My Posts",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      count: stats?.myPosts || 0,
    },
    {
      id: "liked",
      label: "Liked Posts",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      count: stats?.liked || 0,
    },
  ];

  return (
    <aside
      className={`w-64 min-h-[calc(100vh-80px)] ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
      } border-r shadow-lg`}
    >
      {/* User Profile Section */}
      <div className={`p-6 border-b ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
            darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"
          }`}>
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {user?.username || "User"}
            </h3>
            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <h4 className={`text-xs font-semibold uppercase tracking-wider mb-4 ${
          darkMode ? "text-slate-500" : "text-gray-400"
        }`}>
          Browse
        </h4>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? darkMode
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : darkMode
                    ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeSection === item.id
                      ? "bg-white/20 text-white"
                      : darkMode
                      ? "bg-slate-700 text-slate-300"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Stats Section */}
      <div className={`mx-4 p-4 rounded-xl ${
        darkMode ? "bg-slate-700/50" : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}>
        <h4 className={`text-sm font-semibold mb-3 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Quick Stats
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className={`text-center p-3 rounded-lg ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}>
            <div className={`text-2xl font-bold ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}>
              {stats?.myPosts || 0}
            </div>
            <div className={`text-xs ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
              Your Posts
            </div>
          </div>
          <div className={`text-center p-3 rounded-lg ${
            darkMode ? "bg-slate-800" : "bg-white"
          }`}>
            <div className={`text-2xl font-bold ${
              darkMode ? "text-red-400" : "text-red-500"
            }`}>
              {stats?.liked || 0}
            </div>
            <div className={`text-xs ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
              Liked
            </div>
          </div>
        </div>
      </div>

      
    </aside>
  );
}
