import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
function Herocom() {
  return (
     <>
      {/* heroo sec..... */}
      <section className="bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')] bg-cover bg-center  h-[90vh] flex items-center justify-center">
        <div className="bg-gradient-to-tr from-zinc-800 to-red-400 bg-opacity-60 p-10 rounded-xl text-center text-white max-w-xl">
          <h1 className="text-5xl font-bold mb-4">קเєςє ๏ภ קlคtє</h1>
          <p className="text-lg mb-6">
            Where every piece tells a story of flavor, freshness, and love.
          </p>
          <NavLink to="/explore" className="bg-orange-500 cursor-pointer hover:bg-orange-600 transition px-6 py-3 rounded-full font-semibold flex items-center justify-center ">
            Explore Menu <FaArrowRight className="ml-2" />
          </NavLink>
        </div>
      </section>
     </>
  )
}

export default Herocom