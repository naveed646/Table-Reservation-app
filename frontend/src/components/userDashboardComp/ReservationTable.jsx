import React from "react";
import { user } from "../../data/index";
import { FaHistory } from "react-icons/fa";

function ReservationTable() {
  return (
    <div
      className="bg-gray-50 text-black 
                    w-[90%] md:w-4/5  p-4 sm:p-6 mt-6 sm:mt-10 
                    rounded-xl shadow-md mx-auto overflow-x-auto"
    >
      <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 mb-4 text-black">
        <FaHistory /> Upcoming Reservation
      </h2>

      <div className="">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-zinc-800 text-white text-left text-sm sm:text-base">
              <th className="p-2">Table</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Day</th>
              <th className="p-2">Duration</th>
              <th className="p-2 text-center">Guests</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.recentTable.map((order) => (
              <tr key={order.id} className="border-b text-sm sm:text-base">
                <td className="p-2">{order.table}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">{order.time}</td>
                <td className="p-2">{order.day}</td>
                <td className="p-2">{order.duration}</td>
                <td className="p-2 text-center">{order.people}</td>
                <td className="p-2 text-center">
                  <button
                    className="bg-zinc-800
                                     hover:bg-zinc-700 
                                     text-white px-3 py-1 rounded text-xs sm:text-sm"
                  >
                    Cancel
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

export default ReservationTable;
