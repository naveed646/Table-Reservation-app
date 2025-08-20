import { useState } from "react";
import { adminTables } from "../../data/index";
import { FaChair } from "react-icons/fa";

export default function AdminTableManagement() {
  const [tables, setTables] = useState(adminTables);

  const toggleStatus = (id) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === id
          ? {
              ...table,
              status: table.status === "Available" ? "Reserved" : "Available",
            }
          : table
      )
    );
  };

  return (
    <div className="bg-white w-[100%] p-6 rounded-xl shadow-md ">
      {/* Heading */}
      <h2 className="text-lg font-bold flex items-center gap-2 text-black mb-4">
        <FaChair className="text-black text-xl" /> Table Management
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Guest</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{table.id}</td>
                <td className="px-4 py-2">{table.Guest}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      table.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {table.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => toggleStatus(table.id)}
                    className="px-3 py-1 text-sm rounded-lg bg-black text-white hover:bg-zinc-600 transition"
                  >
                    {table.status === "Available" ? "Reserve" : "Free Up"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
