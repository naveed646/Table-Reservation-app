import React, { useEffect, useState } from "react";
import { getAllBlogs, updateBlog, deleteBlog } from "../../../api/blogApi";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";

const BlogListmanag = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs({ search, page });
      const arr = Array.isArray(data) ? data : data?.blogs || [];
      setBlogs(arr);
    } catch (err) {
      console.error("fetchBlogs error:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, page]);

  const onSubmit = async (formDataRaw) => {
    if (!editingBlog) return;
    try {
      const fd = new FormData();
      fd.append("title", formDataRaw.title);
      fd.append("content", formDataRaw.content);
      fd.append("author", formDataRaw.author);
      if (formDataRaw.image && formDataRaw.image[0]) fd.append("image", formDataRaw.image[0]);

      await updateBlog(editingBlog._id, fd);
      setEditingBlog(null);
      reset();
      fetchBlogs();
    } catch (err) {
      console.error("update error:", err);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setValue("title", blog.title);
    setValue("content", blog.content);
    setValue("author", blog.author);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      // optionally: if last item on page removed, adjust page
      fetchBlogs();
    } catch (err) {
      console.error("delete error:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <input
        type="text"
        placeholder="🔍 Search blogs..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); 
        }}
        className="w-full p-3 mb-6 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
      />

      {/* Loading */}
      {loading && blogs.length === 0 ? (
        <div className="grid place-items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-zinc-600" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-600 py-12">No blogs found.</div>
      ) : (
        <>
          {/* Blog List */}
          {blogs.map((blog) => (
            <div
              key={blog._id || blog.id}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-md flex justify-between items-start mb-4 hover:shadow-lg transition"
            >
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-gray-900">{blog.title}</h3>
                <p className="text-sm text-gray-500">By {blog.author}</p>
                <p className="mt-2 text-gray-700 line-clamp-2">{blog.content}</p>
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="mt-3 w-36 h-24 object-cover rounded-md border"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col items-center space-y-3 ml-4">
                <button
                  onClick={() => handleEdit(blog)}
                  title="Edit Blog"
                  className="p-2 rounded-full cursor-pointer bg-black text-white hover:bg-zinc-600 transition"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(blog._id || blog.id)}
                  title="Delete Blog"
                  className="p-2 rounded-full cursor-pointer bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex space-x-3 mt-6 justify-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 bg-black cursor-pointer text-white rounded-lg hover:bg-zinc-600 transition"
              disabled={page <= 1}
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-black cursor-pointer text-white rounded-lg hover:bg-zinc-600 transition"
            >
              Next →
            </button>
          </div>
        </>
      )}

      {/* Edit Form */}
      {editingBlog && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 bg-white p-6 mt-8 rounded-xl shadow-lg border border-gray-200"
        >
          <h2 className="text-xl font-semibold text-gray-800">✏️ Edit Blog</h2>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:border-black focus:ring-1 focus:ring-black"
          />
          <textarea
            placeholder="Content"
            {...register("content")}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:border-black focus:ring-1 focus:ring-black"
          />
          <input
            type="text"
            placeholder="Author"
            {...register("author")}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:border-black focus:ring-1 focus:ring-black"
          />
          <input
            type="file"
            {...register("image")}
            className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700"
          />
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3 bg-black text-white font-semibold rounded-lg hover:bg-zinc-600 transition"
            >
              ✅ Update Blog
            </button>
            <button
              type="button"
              onClick={() => {
                reset();
                setEditingBlog(null);
              }}
              className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogListmanag;
