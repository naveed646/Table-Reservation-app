import React, { useState, useEffect } from "react";
import { updateMenu } from "../../../api/menu";
import Swal from "sweetalert2";

function EditMenuItem({ item, onClose, onUpdate }) {
  const [form, setForm] = useState({ title: "", description: "", price: "", imageUrl: null });

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title,
        description: item.description,
        price: item.price,
        imageUrl: null,
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (form.imageUrl) formData.append("image", form.imageUrl);

    try {
      await updateMenu(item._id, formData);
         Swal.fire({
              title: "Item saved successfully.",
              icon: "success",
              draggable: false,
            });
      onUpdate(); // refresh menu list
      onClose();
    } catch (err) {
         Swal.fire({
              title: "Failed to update:",
              icon: "error",
              draggable: false,
            });
      console.error("Failed to update:", err);
    }
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-[400px]">
        <h2 className="text-xl font-bold mb-4">✏️ Edit Menu Item</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded h-20"
            required
          />
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, imageUrl: e.target.files[0] })}
            className="border p-2 rounded"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 cursor-pointer bg-gray-400 text-white rounded hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMenuItem;
