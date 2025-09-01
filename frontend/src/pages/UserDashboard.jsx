import React, { useEffect, useMemo } from "react";
import { FaUtensils, FaChair, FaCheckCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyReservations } from "../redux/reservations/reservationSlice"; 

export default function UserDashboard() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const username = user?.name || "Guest";
  const reservations = useSelector((state) => state.reservations.mine || []);

  // get all reservations...

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchMyReservations());
    }
  }, [dispatch, user?._id]);

  // Define tables
  const tables = useMemo(
    () => [
      { id: 1, type: "window", seats: 2 },
      { id: 2, type: "window", seats: 2 },
      { id: 3, type: "center", seats: 4 },
      { id: 4, type: "center", seats: 4 },
      { id: 5, type: "center", seats: 4 },
      { id: 6, type: "center", seats: 4 },
      { id: 7, type: "band", seats: 4 },
      { id: 8, type: "window", seats: 2 },
      { id: 9, type: "window", seats: 2 },
      { id: 10, type: "window", seats: 2 },
    ],
    []
  );

  // Count available tables
  const availableTables = tables.filter((t) => {
    const reserved = reservations.find(
      (r) =>
        r.tableId === t.id &&
        (r.status === "pending" || r.status === "approved")
    );
    return !reserved;
  }).length;

  // Approved (Active) reservations
  const approvedReservations = reservations.filter(
    (r) => r.status === "approved"
  );

  useEffect(() => {
    document.title = `Welcome ${username} | Restaurant Booking`;
  }, [username]);

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-700">
          Welcome, {username}!
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Experience our easy and fast table booking system.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaUtensils className="text-orange-500" /> About Our Booking System
        </h2>
        <p className="text-gray-600 mb-6">
          Our restaurant table booking system allows you to reserve your seat
          in advance to avoid waiting. Simply choose your preferred date, time,
          and table size, and enjoy a smooth dining experience.
        </p>

        {/* Availability Info */}
        <div className="grid grid-cols-2 gap-6 text-center">
          {/* Available Tables */}
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <FaChair className="text-green-600 text-3xl mx-auto mb-2" />
            <p className="text-xl font-bold">{availableTables}</p>
            <p className="text-gray-700">Tables Available</p>
          </div>

          {/* Active Reservations */}
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <FaCheckCircle className="text-blue-600 text-3xl mx-auto mb-2" />
            <p className="text-xl font-bold">{approvedReservations.length}</p>
            <p className="text-gray-700">Active Reservations</p>
          </div>
        </div>

        {/* List of Active Reservations */}
        {approvedReservations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Your Active Reservations
            </h3>
            <ul className="space-y-2">
              {approvedReservations.map((res) => {
                const table = tables.find((t) => t.id === res.tableId);
                return (
                  <li
                    key={res._id}
                    className="p-3 bg-white border rounded-lg shadow-sm flex justify-between"
                  >
                    <span>
                      Table {table?.id} ({table?.type}, {table?.seats} seats)
                    </span>
                    <span className="text-blue-600 font-medium">Approved</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <NavLink
          to="/table"
          className="mt-5 bg-black text-white px-3 py-2 rounded-2xl mr-2 hover:bg-amber-600"
        >
          Book Table
        </NavLink>
      </div>
    </div>
  );
}
