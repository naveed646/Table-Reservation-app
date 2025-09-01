import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function Ratings() {
  const [rating, setRating] = useState(4.5); // avg rating
  const [totalReviews] = useState(120);

  useEffect(() => {

    const interval = setInterval(() => {
      setRating((prev) => (prev >= 5 ? 4.5 : prev + 0.1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 px-6 text-center bg-gradient-to-tr from-orange-50 via-white to-orange-100 mt-12">
      <h2 className="text-3xl font-bold mb-6 text-orange-800">Customer Ratings</h2>
      <div className="flex items-center justify-center space-x-2 mb-3">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < Math.round(rating) ? "text-yellow-400 text-2xl" : "text-gray-300 text-2xl"}
          />
        ))}
      </div>
      <p className="text-gray-700 font-semibold">
        {rating.toFixed(1)} / 5.0 ({totalReviews}+ reviews)
      </p>
    </div>
  );
}