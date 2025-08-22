import React, {useEffect } from "react";
import { FaUtensils, FaCalendarAlt, FaChair } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function UserDashboard({ username = "Guest" }) {
  

  useEffect(() => {
    document.title = `Welcome ${username} | Restaurant Booking`;
  }, [username]);

  return (
    <div className="min-h-screen  bg-white p-8">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl  font-bold text-orange-700">
          Welcome, {username}!
        </h1>
        <p className="text-lg  text-gray-600 mt-2">
          Experience our easy and fast table booking system.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl  mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaUtensils className="text-orange-500" /> About Our Booking System
        </h2>
        <p className="text-gray-600 mb-6">
          Our restaurant table booking system allows you to reserve your seat
          in advance to avoid waiting. Simply choose your preferred date, time,
          and table size, and enjoy a smooth dining experience.
        </p>

        {/* Availability Info */}
        <div className="flex justify-center text-center">
          <div className="bg-green-100 p-4 w-60 rounded-lg shadow">
            <FaChair className="text-green-600 text-3xl mx-auto mb-2" />
            <p className="text-xl font-bold">8</p>
            <p className="text-gray-700">Tables Available</p>
          </div>
          
        </div>
      </div>
       <div className="flex justify-center  ">
        <NavLink to="/table" className="mt-5  bg-black text-white px-3 py-2 rounded-2xl mr-2 hover:bg-amber-600">
          Book Table
        </NavLink>
        </div>
    </div>
  );
}
