import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogById } from "../../api/blogApi";

export default function BlogDetailPage() {
  const { id } = useParams(); // get blog id from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchBlog = async () => {
    try {
      console.log("Fetching blog with ID:", id); // 👈 check the id
      const data = await getBlogById(id);
      console.log("Fetched blog:", data); // 👈 see what backend returns
      setBlog(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchBlog();
}, [id]);


  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (!blog) return <p className="text-center text-red-500">Blog not found</p>;

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link
          to="/blogs"
          className="inline-block mb-6 px-2 py-2 rounded bg-zinc-800 text-white hover:bg-zinc-700 transition"
        >
          ← Back to Blogs
        </Link>

        {/* Blog Image */}
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-80 object-cover rounded-xl mb-6"
          />
        )}

        {/* Blog Content */}
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-sm text-black mb-6">
          By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <p className="text-lg leading-relaxed text-black whitespace-pre-line">
          {blog.content}
        </p>
      </div>
    </div>
  );
}
