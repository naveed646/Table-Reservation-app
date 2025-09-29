import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  if (!blog || !blog._id) {
    return null; // prevent rendering until blog exists
  }

  return (
    <article
      className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-[1.02] hover:shadow-2xl"
      aria-labelledby={`blog-${blog._id}-title`}
    >
      {/* Image */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={blog.imageUrl || "/placeholder.jpg"}
          alt={blog.title || "Blog image"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc- via-transparent to-transparent opacity-0 transition-opacity duration-400 ease-in-out group-hover:opacity-100" />

      {/* Content */}
      <div className="p-5">
        <h3
          id={`blog-${blog._id}-title`}
          className="text-xl font-semibold text-black transition-transform duration-400 ease-in-out translate-y-0 group-hover:-translate-y-1"
        >
          {blog.title}
        </h3>

        <p className="mt-2 text-sm text-black line-clamp-2 transition-opacity duration-300 ease-in-out group-hover:opacity-90">
          {blog.content}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-black">{blog.author}</span>
            <span className="text-xs text-black">
              {blog.createdAt
                ? new Date(blog.createdAt).toLocaleDateString()
                : "—"}
            </span>
          </div>

          <Link
            to={`/blog/${blog._id}`}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-600 bg-black/70 px-3 py-1 text-sm font-medium text-white transition-transform duration-300 ease-in-out hover:bg-zinc-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          >
            Read
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
