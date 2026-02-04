import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { darkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs.posts);

  // Redirect logged-in users to feed
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Get featured blogs (first 3 for demo)
  const featuredBlogs = useMemo(() => blogs.slice(0, 3), [blogs]);

  // Get recent blogs (sorted by date)
  const recentBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
  }, [blogs]);

  // Get most liked blogs
  const popularBlogs = useMemo(() => {
    return [...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 6);
  }, [blogs]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
      {/* Hero Section */}
      <section className={`${darkMode ? "bg-gradient-to-r from-slate-900 to-slate-800" : "bg-gradient-to-r from-blue-50 to-indigo-50"} py-20`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div>
              <h1 className={`text-5xl lg:text-6xl font-bold leading-tight mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Share Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Stories
                </span>
              </h1>
              <p className={`text-xl leading-relaxed mb-8 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                A platform where ideas come to life. Express your thoughts, share your knowledge, 
                and connect with a community of passionate writers and readers from around the world.
                {!isAuthenticated && (
                  <span className="block mt-2 text-lg font-medium">
                     Browse amazing stories below or sign up to start writing!
                  </span>
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/signup"
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
                    >
                      Create Account
                    </Link>
                    <Link
                      to="/login"
                      className={`px-8 py-4 border-2 ${darkMode ? "border-slate-600 text-white hover:bg-slate-800" : "border-gray-300 text-gray-900 hover:bg-gray-50"} font-semibold rounded-xl transition-all duration-300 text-center`}
                    >
                      Sign In
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/add"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 text-center"
                  >
                    Start Writing
                  </Link>
                )}
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop&crop=entropy&auto=format&fm=jpg&q=60"
                  alt="Person writing blog"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Platform Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className={`text-4xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Why Choose BUGLOG?
          </h2>
          <p className={`text-xl mb-12 max-w-3xl mx-auto ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
            We believe everyone has a story to tell. Our platform provides the perfect space 
            to express your ideas, share your experiences, and build meaningful connections.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-2xl ${darkMode ? "bg-slate-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Simple & Clean
              </h3>
              <p className={`${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                Focus on your writing without distractions. Our clean, minimalist interface 
                helps you concentrate on what matters most - your content.
              </p>
            </div>
            
            <div className={`p-8 rounded-2xl ${darkMode ? "bg-slate-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Vibrant Community
              </h3>
              <p className={`${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                Connect with like-minded writers and readers. Discover new perspectives, 
                share feedback, and grow together in our supportive community.
              </p>
            </div>
            
            <div className={`p-8 rounded-2xl ${darkMode ? "bg-slate-800" : "bg-white"} shadow-lg hover:shadow-xl transition-shadow`}>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Express Ideas
              </h3>
              <p className={`${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                Every thought deserves to be shared. From personal experiences to technical insights, 
                find your voice and inspire others with your unique perspective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className={`py-5 ${darkMode ? "bg-slate-800" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Editor's Choice
            </h2>
            <p className={`text-xl ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
              Handpicked stories that showcase the best of our community
            </p>
          </div>
          
          {featuredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBlogs.map((blog) => (
                <div key={blog.id} className="transform hover:scale-105 transition-transform duration-300">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-lg ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                No featured blogs available yet. 
                {!isAuthenticated && (
                  <>
                    {" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                      Sign up
                    </Link>
                    {" "}to be among the first to share your story!
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          
          
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className={`text-4xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Latest Stories
              </h2>
              <p className={`text-xl ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                Fresh content from our community of writers
              </p>
            </div>
            {isAuthenticated && (
              <Link
                to="/add"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300"
              >
                Write Your Story
              </Link>
            )}
          </div>
          
          {recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {recentBlogs.map((blog) => (
                <div key={blog.id} className="transform hover:scale-105 transition-transform duration-300">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className={`p-8 rounded-2xl ${darkMode ? "bg-slate-800" : "bg-gray-50"}`}>
                <svg className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-slate-400" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <h3 className={`text-2xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  No stories yet
                </h3>
                <p className={`text-lg mb-4 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Be the first to share your story with the community!
                </p>
                {!isAuthenticated ? (
                  <Link
                    to="/signup"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Get Started
                  </Link>
                ) : (
                  <Link
                    to="/add"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Write Your First Blog
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Popular Blogs Section */}
      <section className={`py-20 ${darkMode ? "bg-slate-800" : "bg-gray-50"}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Most Loved Stories
            </h2>
            <p className={`text-xl ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
              Discover the posts that have captured hearts and minds
            </p>
          </div>
          
          {popularBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {popularBlogs.map((blog, index) => (
                <div key={blog.id} className="relative transform hover:scale-105 transition-transform duration-300">
                  {index < 3 && (
                    <div className="absolute -top-2 -left-2 z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                  )}
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className={`text-lg ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                No popular blogs yet. Start engaging with the community!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className={`py-20 ${darkMode ? "bg-gradient-to-r from-slate-900 to-slate-800" : "bg-gradient-to-r from-blue-600 to-purple-600"}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl mb-8 text-white opacity-90">
            Join thousands of writers who have found their voice on BUGLOG. 
            Your unique perspective is waiting to inspire others.
          </p>
          
          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-xl transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <Link
              to="/add"
              className="inline-block px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Writing Now
            </Link>
          )}
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div>
              <div className="text-3xl font-bold mb-2">{blogs.length}+</div>
              <div className="opacity-75">Stories Published</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5K+</div>
              <div className="opacity-75">Active Readers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="opacity-75">Writer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
