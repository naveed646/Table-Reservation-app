import React from "react";
import { FaCalendarAlt, FaTag } from "react-icons/fa";

export default function AdvanceBookingOffer() {
  return (
    <div className="min-h-[100vh] w-[100%] relative  bg-white text-black p-6 md:p-10 rounded-2xl shadow-xl">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Advance Booking Offers</h1>
            <p className="text-black mt-2 max-w-2xl">
              Book your table in advance and unlock exclusive discounts. The earlier you book, the more you save!
            </p>
          </div>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl px-4 py-2 shadow-lg">
            <FaTag className="text-xl" />
            <span className="text-sm uppercase tracking-wider">Up to 25% OFF</span>
          </div>
        </div>

        {/* Offer Rules */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-pink-300 bg-gradient-to-br from-pink-800 to-pink-600 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-2xl" />
              <div className="text-lg font-semibold">Book 7 Days Ahead</div>
            </div>
            <div className="mt-2 text-pink-100">Get <span className="font-bold text-white">25%</span> off your dine-in bill.</div>
          </div>

          <div className="rounded-2xl border border-pink-300 bg-gradient-to-br from-pink-700 to-red-500 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-2xl" />
              <div className="text-lg font-semibold">Book 6 Days Ahead</div>
            </div>
            <div className="mt-2 text-pink-100">Get <span className="font-bold text-white">20%</span> off your dine-in bill.</div>
          </div>

          <div className="rounded-2xl border border-pink-300 bg-gradient-to-br from-red-600 to-orange-500 p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-2xl" />
              <div className="text-lg font-semibold">Book 5 Days Ahead</div>
            </div>
            <div className="mt-2 text-pink-100">Get <span className="font-bold text-white">10%</span> off your dine-in bill.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
