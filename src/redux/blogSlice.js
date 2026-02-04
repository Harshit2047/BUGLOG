import { createSlice } from "@reduxjs/toolkit";
import { initialBlogs } from "../data/initialBlogs";

// Load blogs from localStorage or use initial data
const loadBlogs = () => {
  const saved = localStorage.getItem("blogs");
  if (saved) {
    return JSON.parse(saved);
  }
  // Initialize blogs with likedBy array
  const blogsWithLikes = initialBlogs.map((blog) => ({
    ...blog,
    likedBy: [],
    likes: blog.likes || 0,
    comments: [],
  }));
  return blogsWithLikes;
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    posts: loadBlogs(),
  },
  reducers: {
    addBlog: (state, action) => {
      const newBlog = {
        ...action.payload,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        likes: 0,
        likedBy: [],
        comments: [],
      };
      state.posts.unshift(newBlog);
      localStorage.setItem("blogs", JSON.stringify(state.posts));
    },
    editBlog: (state, action) => {
      const index = state.posts.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...action.payload };
        localStorage.setItem("blogs", JSON.stringify(state.posts));
      }
    },
    deleteBlog: (state, action) => {
      state.posts = state.posts.filter((blog) => blog.id !== action.payload);
      localStorage.setItem("blogs", JSON.stringify(state.posts));
    },
    toggleLikeBlog: (state, action) => {
      const { blogId, userId } = action.payload;
      const blog = state.posts.find((blog) => blog.id === blogId);
      if (blog) {
        if (!blog.likedBy) {
          blog.likedBy = [];
        }
        const likeIndex = blog.likedBy.indexOf(userId);
        if (likeIndex === -1) {
          // User hasn't liked - add like
          blog.likedBy.push(userId);
          blog.likes = (blog.likes || 0) + 1;
        } else {
          // User already liked - remove like
          blog.likedBy.splice(likeIndex, 1);
          blog.likes = Math.max((blog.likes || 1) - 1, 0);
        }
        localStorage.setItem("blogs", JSON.stringify(state.posts));
      }
    },
    addComment: (state, action) => {
      const { blogId, text, author, userId } = action.payload;
      const blog = state.posts.find((blog) => blog.id === blogId);
      if (blog) {
        if (!blog.comments) {
          blog.comments = [];
        }
        const newComment = {
          id: Date.now(),
          text,
          author,
          userId,
          timestamp: new Date().toISOString(),
          blogId,
        };
        blog.comments.push(newComment);
        localStorage.setItem("blogs", JSON.stringify(state.posts));
      }
    },
    deleteComment: (state, action) => {
      const { blogId, commentId } = action.payload;
      const blog = state.posts.find((blog) => blog.id === blogId);
      if (blog && blog.comments) {
        blog.comments = blog.comments.filter((comment) => comment.id !== commentId);
        localStorage.setItem("blogs", JSON.stringify(state.posts));
      }
    },
  },
});

export const { addBlog, editBlog, deleteBlog, toggleLikeBlog, addComment, deleteComment } =
  blogSlice.actions;
export default blogSlice.reducer;
