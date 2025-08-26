import React, { useState, useEffect } from "react";
import { getMenu, deleteMenu } from "../../../api/menu";
import EditMenuItem from "./EditMenuItem";

function MenuList() {
  const [menu, setMenu] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Pagination + Search
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchMenuItems = async () => {
    try {
      const data = await getMenu(page, limit, search); // API should handle page, limit, search
      setMenu(data.items || data); // adjust based on API
      setTotalPages(data.pages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [page, search]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteMenu(id);
      fetchMenuItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">📋 Menu Items</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset to first page on search
        }}
        className="border p-2 w-[50%] mb-4 rounded"
      />

      {/* Menu List */}
      {menu.map((item) => (
        <div key={item._id} className="flex items-center justify-between border-b py-3">
          <div className="flex items-center gap-4">
            {item.imageUrl && (
              <img
                src={`http://localhost:8000${item.imageUrl}`}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-600 font-semibold">${item.price}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setEditingItem(item)} className="text-blue-500 hover:underline">
              ✏️ Edit
            </button>
            <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">
              ❌ Delete
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span className="px-3 py-1">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>

      {editingItem && (
        <EditMenuItem
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdate={fetchMenuItems}
        />
      )}
    </div>
  );
}

export default MenuList;
