import { useState, useMemo, useEffect } from "react";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchAllReservations,
  changeReservationStatus,
} from "../../redux/reservations/reservationSlice";

export default function AdminReservationTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dispatch = useDispatch();
  const { all: reservations, loading, error } = useSelector(
    (state) => state.reservations
  );

  // ✅ Fetch reservations from Redux
  useEffect(() => {
    dispatch(fetchAllReservations());
  }, [dispatch]);

  // ✅ Free Up action (mark as completed)
  const handleFreeUp = async (id) => {
    try {
      await dispatch(
        changeReservationStatus({ id, status: "completed" })
      ).unwrap();
      toast.success("Reservation marked as completed (table freed)");
    } catch (err) {
      toast.error(err.message || "Failed to free up");
      console.error("Error freeing table:", err);
    }
  };

  // Sorting
  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  // Filtering + searching + sorting
  const filteredReservations = useMemo(() => {
    let data = [...reservations];

    if (searchTerm) {
      data = data.filter(
        (res) =>
          res.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "All") {
      data = data.filter(
        (res) => res.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }

    if (sortConfig) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return data;
  }, [reservations, searchTerm, filterStatus, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p className="text-center p-4">Loading reservations...</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

  return (
    <div className="bg-white w-full p-4 rounded-xl shadow-md ">
      <h2 className="text-lg font-bold flex items-center gap-2 text-gray-700 mb-4">
        <FaListAlt className="text-gray-700 text-xl" /> Reservations List
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded w-full md:w-1/5"
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {[
                "name",
                "email",
                "tableId",
                "date",
                "time",
                "guests",
                "duration",
                "status",
              ].map((key) => (
                <th
                  key={key}
                  className="px-2 cursor-pointer hover:bg-gray-300"
                  onClick={() => handleSort(key)}
                >
                  {key.toUpperCase()}{" "}
                  {sortConfig.key === key &&
                    (sortConfig.direction === "asc" ? "▲" : "▼")}
                </th>
              ))}
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReservations.map((res) => (
              <tr key={res._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-center">{res.name}</td>
                <td className="px-4 py-2">{res.user?.email}</td>
                <td className="px-4 py-2">{res.tableId}</td>
                <td className="px-4 py-2">{res.date}</td>
                <td className="px-4 py-2">{res.time}</td>
                <td className="px-4 py-2">{res.guests}</td>
                <td className="px-4 py-2">{res.duration}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      res.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : res.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : res.status === "completed"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {res.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  {res.status === "approved" && (
                    <button
                      onClick={() => handleFreeUp(res._id)}
                      className="bg-black cursor-pointer hover:bg-zinc-600 text-white px-2 py-1 w-18 rounded"
                    >
                      Free Up
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 cursor-pointer bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 cursor-pointer py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
