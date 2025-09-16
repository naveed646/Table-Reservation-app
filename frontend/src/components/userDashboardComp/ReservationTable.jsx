import React, { useEffect, useState } from "react";
import {
  getMyReservations,
  cancelReservation,
  updateReservation,
} from "../../api/reservation";
import { FaEdit, FaTrash } from "react-icons/fa";
function ReservationTable() {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState({ id: null, field: null, value: "" });

  const itemsPerPage = 5;
  const loadReservations = async () => {
    const data = await getMyReservations();
    setReservations(data);
  };

  useEffect(() => {
    loadReservations();
  }, []);

  // handle inline edit save
  const handleSave = async () => {
    if (editing.value !== "") {
      await updateReservation(editing.id, { [editing.field]: editing.value });
      loadReservations();
    }
    setEditing({ id: null, field: null, value: "" });
  };

  const handleCancel = async (id) => {
    await cancelReservation(id);
    loadReservations();
  };

  // filter reservations
  const filteredReservations =
    filter === "all"
      ? reservations
      : reservations.filter((res) => res.status === filter);

  // pagination
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mt-10 w-[90%] mx-auto">
      <h2 className="text-xl text-center font-bold mb-4">My Reservations</h2>

      {/* Filter */}
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 h-10">
            <th className="p-2">Date</th>
            <th className="p-2">Time</th>
            <th className="p-2">Guests</th>
            <th className="p-2">Duration</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedReservations.map((res) => (
            <tr key={res._id} className="border-b hover:bg-gray-50">
              <td className="text-center py-3">{res.date}</td>
              <td className="text-center">{res.time}</td>

              {/* Guests */}
              <td className="text-center">
                {editing.id === res._id && editing.field === "guests" ? (
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={editing.value}
                      onChange={(e) =>
                        setEditing({ ...editing, value: e.target.value })
                      }
                      className="w-16 border rounded px-1"
                    />
                    <button
                      onClick={handleSave}
                      className="px-2 py-1 bg-black cursor-pointer hover:bg-zinc-600 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {res.guests}
                    <FaEdit
                      className="text-black  cursor-pointer"
                      onClick={() =>
                        setEditing({
                          id: res._id,
                          field: "guests",
                          value: res.guests,
                        })
                      }
                    />
                  </div>
                )}
              </td>

              {/* Duration */}
              <td className="text-center">
                {editing.id === res._id && editing.field === "duration" ? (
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="150"
                      value={editing.value}
                      onChange={(e) =>
                        setEditing({ ...editing, value: e.target.value })
                      }
                      className="w-20 border rounded px-1"
                    />
                    <button
                      onClick={handleSave}
                      className="px-2 py-1 bg-black hover:bg-zinc-600 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    {res.duration}
                    <FaEdit
                      className="text-black cursor-pointer"
                      onClick={() =>
                        setEditing({
                          id: res._id,
                          field: "duration",
                          value: res.duration,
                        })
                      }
                    />
                  </div>
                )}
              </td>

              <td className="text-center">{res.status}</td>
              <td className="text-center">
                {res.status === "pending" && (
                  <FaTrash
                    onClick={() => handleCancel(res._id)}
                    className="text-red-500 cursor-pointer"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ReservationTable;
