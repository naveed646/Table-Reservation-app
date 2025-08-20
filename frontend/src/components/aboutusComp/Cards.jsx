import React from 'react'
import { FaUtensils, FaLeaf, FaSmile } from "react-icons/fa";

export default function Cards() {
  return (
    <>
     {/* cards of it..... */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="  bg-gradient-to-tr from-zinc-800 to-orange-200 bg-opacity-10 p-6 rounded-lg text-center hover:bg-opacity-20 transition duration-300">
            <FaUtensils className="mx-auto text-4xl text-orange-400 mb-4" />
            <h3 className="text-xl text-black font-semibold mb-2">
              Delicious Cuisine
            </h3>
            <p className="text-sm text-black font-light">
              Experience handcrafted meals with unforgettable taste.
            </p>
          </div>

          <div className=" bg-gradient-to-tr from-zinc-800 to-red-400 bg-opacity-10 p-6 rounded-lg text-center hover:bg-opacity-20 transition duration-300">
            <FaLeaf className="mx-auto text-4xl text-green-400 mb-4" />
            <h3 className="text-xlblack text-black font-semibold mb-2">
              Fresh Ingredients
            </h3>
            <p className="text-sm text-black font-light">
              Locally sourced and seasonally inspired produce.
            </p>
          </div>

          <div className=" bg-gradient-to-tr from-zinc-800 to-pink-400 bg-opacity-10 p-6 rounded-lg text-center hover:bg-opacity-20 transition duration-300">
            <FaSmile className="mx-auto text-4xl text-yellow-300 mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              Warm Hospitality
            </h3>
            <p className="text-sm text-black font-light">
              Our guests are family. We serve with joy and gratitude.
            </p>
          </div>
        </div>
    </>
  )
}
