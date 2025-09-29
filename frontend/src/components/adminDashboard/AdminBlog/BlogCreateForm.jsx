import React from "react";
import { useForm } from "react-hook-form";
import { createBlog } from "../../../api/blogApi";

const BlogCreateForm = ({ onSuccess }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("author", data.author);
      if (data.image[0]) formData.append("image", data.image[0]);

      await createBlog(formData);
      reset();
      onSuccess(); // refresh blog list
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 flex flex-col bg-gray-100 text-black p-8 rounded-2xl shadow-lg border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        ✍️ Create a New Blog
      </h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Enter Blog Title"
        {...register("title", { required: true })}
        className="w-full p-3 rounded-lg border border-gray-300 bg-white placeholder-gray-400 text-gray-800 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition"
      />

      {/* Content */}
      <textarea
        placeholder="Write your content here..."
        {...register("content", { required: true })}
        rows={5}
        className="w-full p-3 rounded-lg border border-gray-300 bg-white placeholder-gray-400 text-gray-800 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition resize-none"
      />

      {/* Author */}
      <input
        type="text"
        placeholder="Author name"
        {...register("author", { required: true })}
        className="w-full p-3 rounded-lg border border-gray-300 bg-white placeholder-gray-400 text-gray-800 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition"
      />

      {/* File Upload */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-600">
          Upload Cover Image
        </label>
        <input
          type="file"
          {...register("image")}
          className="w-full rounded-lg border cursor-pointer border-gray-300 p-2 bg-white text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-2 file:rounded-md file:border-0 file:bg-black file:text-white hover:file:bg-zinc-600 transition"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-[15%] mx-auto py-3 cursor-pointer bg-black text-white font-semibold rounded-md hover:bg-zinc-600 active:scale-95 transition transform"
      >
        Create Blog
      </button>
    </form>
  );
};

export default BlogCreateForm;
