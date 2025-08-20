import React from "react";
import { FaStar } from "react-icons/fa";
import { reviews } from "../../data";



export default function Ratings() {
  return (
    <div className="bg-gradient-to-tr from-orange-50 via-white to-orange-100 py-12 px-6 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-800">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {review.name}
            </h3>

            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-600 italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
