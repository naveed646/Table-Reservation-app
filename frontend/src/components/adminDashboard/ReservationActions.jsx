import { useRef, useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";

export default function ReservationActions({ resId, handleApprove, handleCancel }) {
  const [open, setOpen] = useState(false);
  const showActions= useRef()

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

  return (
    <div className="relative inline-block text-left">

      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <FaEllipsisV />
      </button>

      {/* Popup Menu */}
      {open && (
        <div 
        ref={showActions}
        className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-xl p-4 z-10">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Do you want to approve this table or cancel?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                handleApprove(resId);
                setOpen(false);
              }}
              className="px-3 py-1 bg-green-500 cursor-pointer text-white rounded hover:bg-green-600 text-sm"
            >
              Approve
            </button>
            <button
              onClick={() => {
                handleCancel(resId);
                setOpen(false);
              }}
              className="px-3 py-1 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
