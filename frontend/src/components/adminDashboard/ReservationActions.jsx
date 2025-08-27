import { useRef, useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";

export default function ReservationActions({ resId, status, onStatusChange }) {
  const [open, setOpen] = useState(false);
  const showActions = useRef();
  const token = localStorage.getItem("token");

  useEffect(() => {
    function handleClickOutside(event) {
      if (showActions.current && !showActions.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const updateStatus = async (newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/reservations/${resId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onStatusChange) onStatusChange(res.data); // notify parent
      setOpen(false);
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
    }
  };

  if (status !== "pending") {
    return (
      <span
        className={`px-3 py-1 rounded text-sm font-medium ${
          status === "approved"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  }

  return (
    <div className="">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <FaEllipsisV />
      </button>

      {open && (
        <div
          ref={showActions}
          className="absolute right-4 mt-2 w-44 bg-white shadow-lg rounded-xl p-3 z-10"
        >
          <div className="flex justify-end gap-2">
            <button
              onClick={() => updateStatus("approved")}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
            >
              Approve
            </button>
            <button
              onClick={() => updateStatus("rejected")}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
