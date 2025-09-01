import React, { useState } from "react";
import { addMenu } from "../../../api/menu";

function AddMenuItem() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: null,
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      if (form.imageUrl) formData.append("image", form.imageUrl);

      await addMenu(formData);
      setMessage("Menu item added successfully!");
      setForm({ title: "", description: "", price: "", imageUrl: null });
      
    } catch (err) {
      setMessage("Failed to add menu item.");
      console.error(err);
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded shadow">
      {message && <p className="mb-2 text-green-600">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-4"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          ➕ Add New Menu Item
        </h2>

        {/* Title */}
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2 transition"
            required
          />
          <label className="absolute left-2 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-0.6rem] peer-focus:text-blue-500 peer-focus:text-sm transition-all">
            Title
          </label>
        </div>

        {/* Description */}
        <div className="relative">
          <textarea
            placeholder=" "
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2 transition resize-none h-24"
            required
          />
          <label className="absolute left-2 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-0.6rem] peer-focus:text-blue-500 peer-focus:text-sm transition-all">
            Description
          </label>
        </div>

        {/* Price */}
        <div className="relative">
          <input
            type="text"
            placeholder=" "
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2 transition"
            required
          />
          <label className="absolute left-2 top-2 text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-0.6rem] peer-focus:text-blue-500 peer-focus:text-sm transition-all">
            Price
          </label>
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-2">
          <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition">
            Select Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, imageUrl: e.target.files[0] })
              }
              className="hidden"
            />
          </label>
          {form.imageUrl && (
            <span className="text-gray-600 truncate max-w-xs">
              {form.imageUrl.name}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          message="Item Added Succefully"
          className="w-full bg-black hover:bg-zinc-600 cursor-pointer text-white font-semibold py-2 rounded-lg shadow-md transition transform hover:-translate-y-0.5 hover:shadow-lg"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddMenuItem;
