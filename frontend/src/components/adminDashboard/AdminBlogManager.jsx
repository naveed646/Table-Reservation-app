import React from "react";
import BlogCreateForm from "./AdminBlog/BlogCreateForm";
import BlogListmanag from "./AdminBlog/BlogListmanag";

const AdminBlogManager = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h2 className="text-2xl font-bold mb-6">Blog Management</h2>
      <BlogCreateForm onSuccess={() => window.location.reload()} />
      <h2 className="text-2xl font-bold mt-10 mb-4">All Blogs</h2>
      <BlogListmanag />
    </div>
  );
};

export default AdminBlogManager;
