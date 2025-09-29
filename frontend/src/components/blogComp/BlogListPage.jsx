import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { getBlog } from "../../api/blogApi";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchBlogs = async (currentPage) => {
    try {
      setLoading(true);
      const data = await getBlog(currentPage, 3); 
      if (currentPage === 1) {
        setBlogs(data.blogs);
      } else {
        setBlogs((prev) => [...prev, ...data.blogs]);
      }
      setHasMore(currentPage < data.pages);
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1); 
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBlogs(nextPage);
  };

  return (
    <main className="min-h-screen bg-white text-black py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl text-center font-extrabold tracking-tight">Our Blogs</h1>
          <p className="mt-2 text-zinc-800  text-center">
            News, stories from the whole world updated here regularly.
          </p>
        </header>

        {loading && blogs.length === 0 ? (
          <div className="grid place-items-center h-56">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-zinc-600" aria-hidden />
            <span className="sr-only">Loading blogs…</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-zinc-400">No posts yet.</div>
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((b) => (
              <BlogCard key={b._id} blog={b} />
            ))}
          </section>
        )}

        {/* Pagination / Load more */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-4 py-2 rounded border cursor-pointer border-zinc-600 text-white bg-black hover:bg-zinc-700 transition ease-in-out duration-300 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

