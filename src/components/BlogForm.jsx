import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function BlogForm({ initialData, onSubmit, buttonText, hideAuthorField = false }) {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        content: initialData.content || "",
        author: initialData.author || "",
        category: initialData.category || "",
        image: initialData.image || "",
      });
      setImagePreview(initialData.image || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setFormData((prev) => ({ ...prev, image: imageData }));
        setImagePreview(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setImagePreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }
    if (!hideAuthorField && !formData.author) {
      alert("Please fill in the author field");
      return;
    }
    onSubmit(formData);
  };

  const inputClass = `w-full px-4 py-3 rounded-lg border ${
    darkMode
      ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          className={inputClass}
          required

        />
      </div>
      {!hideAuthorField && (
        <div>
          <label className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
            Author *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className={inputClass}
          />
        </div>
      )}
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={inputClass}
          required
        >
          <option value="">Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
          Image
        </label>
        <div className="space-y-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-gray-900"} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium ${darkMode ? "file:bg-slate-600 file:text-white" : "file:bg-blue-50 file:text-blue-700"} hover:file:bg-blue-100`}
          />
          {imagePreview && (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs max-h-48 object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <label className={`block mb-2 font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
          Content *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your blog content here..."
          rows={8}
          className={inputClass}
          required

        />
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition"
      >
        {buttonText}
      </button>
    </form>
  );
}
