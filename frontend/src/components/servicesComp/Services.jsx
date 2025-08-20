import React from "react";
import {servicesData}  from "../../data/index";

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-orange-50 py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Our <span className="text-orange-500">Services</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At{" "}
          <span className="font-semibold text-orange-500">Piece on Plate</span>,
          we blend taste, comfort, and elegance to serve you beyond
          expectations. Here’s what makes dining with us special.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all 
            duration-300 p-6 flex flex-col items-center text-center border
             border-gray-100 hover:-translate-y-2"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
